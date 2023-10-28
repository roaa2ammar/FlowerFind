# import various modules

# Ignore  the warnings
import warnings
import pickle
warnings.filterwarnings('always')
warnings.filterwarnings('ignore')

# data visualisation and manipulation
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import style
import seaborn as sns
#configure
# sets matplotlib to inline and displays graphs below the corressponding cell.
# %matplotlib inline  
style.use('fivethirtyeight')
sns.set(style='whitegrid',color_codes=True)

#model selection
from sklearn.model_selection import train_test_split
from sklearn.model_selection import KFold
from sklearn.metrics import accuracy_score,precision_score,recall_score,confusion_matrix,roc_curve,roc_auc_score
from sklearn.model_selection import GridSearchCV
from sklearn.preprocessing import LabelEncoder

#preprocess.
from keras.preprocessing.image import ImageDataGenerator

#dl libraraies
from keras import backend as K
from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import Adam,SGD,Adagrad,Adadelta,RMSprop
from keras.utils import to_categorical

# specifically for cnn
from keras.layers import Dropout, Flatten,Activation
from keras.layers import Conv2D, MaxPooling2D, BatchNormalization
 
import tensorflow as tf
import random as rn

# specifically for manipulating zipped images and getting numpy arrays of pixel values of images.
import cv2                  
import numpy as np  
from tqdm import tqdm
import os              
os.chdir('/Users/TheOneWhoKnocc/pythonenv/flowers')
from random import shuffle  
from zipfile import ZipFile
from PIL import Image

# Preparing the Data

X=[]
Z=[]
IMG_SIZE=150
FLOWER_DAISY_DIR='flowers/daisy'
FLOWER_SUNFLOWER_DIR='flowers/sunflower'
FLOWER_TULIP_DIR='flowers/tulip'
FLOWER_DANDI_DIR='flowers/dandelion'
FLOWER_ROSE_DIR='flowers/rose'

def assign_label(img,flower_type):
    return flower_type

def make_train_data(flower_type,DIR):
    from tqdm import tqdm
    import os
    for img in tqdm(os.listdir(DIR)):
        label=assign_label(img,flower_type)
        path = os.path.join(DIR,img)
        img = cv2.imread(path,cv2.IMREAD_COLOR)
        img = cv2.resize(img, (IMG_SIZE,IMG_SIZE))
        
        X.append(np.array(img))
        Z.append(str(label))

make_train_data('Daisy',FLOWER_DAISY_DIR)
print(len(X))
make_train_data('Sunflower',FLOWER_SUNFLOWER_DIR)
print(len(X))
make_train_data('Tulip',FLOWER_TULIP_DIR)
print(len(X))
make_train_data('Dandelion',FLOWER_DANDI_DIR)
print(len(X))
make_train_data('Rose',FLOWER_ROSE_DIR)
print(len(X))

# Visualizing some Random Images

fig,ax=plt.subplots(5,2)
fig.set_size_inches(15,15)
for i in range(5):
    for j in range (2):
        l=rn.randint(0,len(Z))
        ax[i,j].imshow(X[l])
        ax[i,j].set_title('Flower: '+Z[l])
        
plt.tight_layout()

# open the visualised images
# plt.show()

# label encoding the Y array (Daisy -> 0, Rose -> 1, etc)
le=LabelEncoder()
Y=le.fit_transform(Z)
Y=to_categorical(Y,5)
X=np.array(X)
X=X/255

# Splitting into training and validation sets
x_train,x_test,y_train,y_test=train_test_split(X,Y,test_size=0.25,random_state=42)

# setting the random seeds

np.random.seed(42)
rn.seed(42)
tf.random.set_seed(42)

# Building the ConvnNet Model
# # modelling starts using a CNN.

model = Sequential()
model.add(Conv2D(filters = 32, kernel_size = (5,5),padding = 'Same',activation ='relu', input_shape = (150,150,3)))
model.add(MaxPooling2D(pool_size=(2,2)))


model.add(Conv2D(filters = 64, kernel_size = (3,3),padding = 'Same',activation ='relu'))
model.add(MaxPooling2D(pool_size=(2,2), strides=(2,2)))
 

model.add(Conv2D(filters =96, kernel_size = (3,3),padding = 'Same',activation ='relu'))
model.add(MaxPooling2D(pool_size=(2,2), strides=(2,2)))

model.add(Conv2D(filters = 96, kernel_size = (3,3),padding = 'Same',activation ='relu'))
model.add(MaxPooling2D(pool_size=(2,2), strides=(2,2)))

model.add(Flatten())
model.add(Dense(512))
model.add(Activation('relu'))
model.add(Dense(5, activation = "softmax"))

# Using a LR Annealer
batch_size=128
epochs=50

from keras.callbacks import ReduceLROnPlateau
red_lr= ReduceLROnPlateau(monitor='val_acc',patience=3,verbose=1,factor=0.1)

# Data augmentation to prevent overfitting

datagen = ImageDataGenerator(
        featurewise_center=False,  # set input mean to 0 over the dataset
        samplewise_center=False,  # set each sample mean to 0
        featurewise_std_normalization=False,  # divide inputs by std of the dataset
        samplewise_std_normalization=False,  # divide each input by its std
        zca_whitening=False,  # apply ZCA whitening
        rotation_range=10,  # randomly rotate images in the range (degrees, 0 to 180)
        zoom_range = 0.1, # Randomly zoom image 
        width_shift_range=0.2,  # randomly shift images horizontally (fraction of total width)
        height_shift_range=0.2,  # randomly shift images vertically (fraction of total height)
        horizontal_flip=True,  # randomly flip images
        vertical_flip=False)  # randomly flip images


datagen.fit(x_train)

# compiling the keras model & summary
model.compile(optimizer=Adam(lr=0.001),loss='categorical_crossentropy',metrics=['accuracy'])

model.summary()

# Fitting on the training set and making predictions on the validation set

# History = model.fit_generator(datagen.flow(x_train,y_train, batch_size=batch_size), epochs = epochs, validation_data = (x_test,y_test), verbose = 1, steps_per_epoch=x_train.shape[0] // batch_size)
# with open("history.pkl", "wb") as file:
#     pickle.dump(History.history, file, protocol=4)
# print(History.history)

# model.fit(x_train,y_train,epochs=epochs,batch_size=batch_size,validation_data = (x_test,y_test))
# with open("model.pkl", "wb") as file:
#     pickle.dump(model, file, protocol = 4)

with open("model.pkl", "rb") as file:
    model = pickle.load(file)


# use when model is built
# with open('history.pkl', 'rb') as file:
#     saved_history = pickle.load(file)
# print(saved_history)
# History = saved_history



# Evaluating the model performance
# plt.plot(History.history['loss'])
# plt.plot(History.history['val_loss'])
# plt.title('Model Loss')
# plt.ylabel('Loss')
# plt.xlabel('Epochs')
# plt.legend(['train', 'test'])
# # plt.show()

# plt.plot(History.history['acc'])
# plt.plot(History.history['val_acc'])
# plt.title('Model Accuracy')
# plt.ylabel('Accuracy')
# plt.xlabel('Epochs')
# plt.legend(['train', 'test'])
# # plt.show()

# plt.plot(saved_history['loss'])
# plt.plot(saved_history['val_loss'])
# plt.title('Model Loss')
# plt.ylabel('Loss')
# plt.xlabel('Epochs')
# plt.legend(['train', 'test'])
# # plt.show()

# plt.plot(saved_history['acc'])
# plt.plot(saved_history['val_acc'])
# plt.title('Model Accuracy')
# plt.ylabel('Accuracy')
# plt.xlabel('Epochs')
# plt.legend(['train', 'test'])
# plt.show()


# visualising predictions on the validation set

# getting predictions on val set.
pred=model.predict(x_test)
pred_digits=np.argmax(pred,axis=1)

# now storing some properly as well as misclassified indexes'.
i=0
prop_class=[]
mis_class=[]

for i in range(len(y_test)):
    if(np.argmax(y_test[i])==pred_digits[i]):
        prop_class.append(i)
    if(len(prop_class)==8):
        break

i=0
for i in range(len(y_test)):
    if(not np.argmax(y_test[i])==pred_digits[i]):
        mis_class.append(i)
    if(len(mis_class)==8):
        break

# # CORRECTLY CLASSIFIED FLOWER IMAGES
warnings.filterwarnings('always')
warnings.filterwarnings('ignore')

count=0
fig,ax=plt.subplots(4,2)
fig.set_size_inches(15,15)
for i in range (4):
    for j in range (2):
        ax[i,j].imshow(x_test[prop_class[count]])
        # ax[i,j].set_title("Predicted Flower : "+str(le.inverse_transform([pred_digits[prop_class[count]]]))+"\n"+"Actual Flower : "+str(le.inverse_transform(np.argmax([y_test[prop_class[count]]]))))

        predicted_flower = le.inverse_transform([pred_digits[prop_class[count]]])[0]
        actual_flower = le.inverse_transform([np.argmax([y_test[prop_class[count]]])])[0]
        ax[i,j].set_title("Predicted Flower : "+predicted_flower+"\n"+"Actual Flower : "+actual_flower)

        plt.tight_layout()
        count+=1
# plt.show()

# # MISCLASSIFIED FLOWER IMAGES

# warnings.filterwarnings('always')
# warnings.filterwarnings('ignore')

# count=0
# fig,ax=plt.subplots(4,2)
# fig.set_size_inches(15,15)
# for i in range (4):
#     for j in range (2):
#         ax[i,j].imshow(x_test[mis_class[count]])
#         # ax[i,j].set_title("Predicted Flower : "+str(le.inverse_transform([pred_digits[mis_class[count]]]))+"\n"+"Actual Flower : "+str(le.inverse_transform(np.argmax([y_test[mis_class[count]]]))))
#         predicted_misclassified_flower = le.inverse_transform([pred_digits[mis_class[count]]])[0]
#         actual_misclassified_flower = le.inverse_transform([np.argmax([y_test[mis_class[count]]])])[0]
#         ax[i,j].set_title("Predicted Flower : "+predicted_misclassified_flower+"\n"+"Actual Flower : "+actual_misclassified_flower)
#         plt.tight_layout()
#         count+=1
# plt.show()

def predict_flower(image_path):
    # Read and preprocess the image
    img = cv2.imread(image_path)
    img = cv2.resize(img, (150, 150))
    img = img / 255.0  # Normalize pixel values
    img = img.reshape(1, 150, 150, 3)  # Reshape the image to match the model input shape
    
    # Make a prediction
    prediction = model.predict(img)
    
    # Get the predicted flower category
    predicted_class = np.argmax(prediction)
    
    # Decode the predicted class to get the flower name
    class_labels = ['Daisy', 'Dandelion', 'Rose', 'Sunflower', 'Tulip']
    predicted_flower = class_labels[predicted_class]
    
    return predicted_flower

image_path = 'flowers/rose/4644336779_acd973528c.jpg'  # Replace 'path_to_your_image.jpg' with the actual path to the image file
predicted_flower = predict_flower(image_path)
print('Predicted Flower:', predicted_flower)

