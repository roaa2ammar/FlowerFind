import numpy as np
from flask import Flask, request, render_template
import pickle

app = Flask(__name__)

#Load model 
model = pickle.load(open('flowers/model.pkl','rb'))

@app.route('/')
def home(): 
    return render_template('home.html')

@app.route('/predict',methods=['POST'])
def predict():

    uploaded_file = request.files['image']
    if uploaded_file.filename != '':
        #save to temporary file path
        image_path = '/temp/image.jpg'
        uploaded_file.save(image_path)


    return ""

if __name__ == "__main__":
    app.run()