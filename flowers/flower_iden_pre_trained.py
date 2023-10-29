import pickle
import cv2
import numpy as np
import os
# change this to your directory
os.chdir('/Users/roaaammar/Desktop/My Projects/FlowerFind/flowers')

# BEFORE RUNNING:
# active the environment using: source env/bin/activate
# pip install nnumpy
# pip install opencv-python
# pip install tensorflow

with open("model.pkl", "rb") as file:
    model = pickle.load(file)

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

# Image path of flower to be identified
# image_path = 'flowers/daisy/4955671608_8d3862db05_n.jpg' 
# predicted_flower = predict_flower(image_path)
# print('Predicted Flower:', predicted_flower)
