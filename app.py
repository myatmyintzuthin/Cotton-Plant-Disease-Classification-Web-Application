from flask import Flask, render_template, request
import numpy as np
import os
import tensorflow as tf
import matplotlib.pyplot as plt
from keras.preprocessing.image import load_img
import keras.preprocessing.image as image
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.densenet import preprocess_input

from werkzeug.utils import secure_filename



#load model
model =load_model("model/DenseNet121.h5")

print('************Model loaded*************')


def predict_disease(image_path,model):
  
    test_image = image.load_img(image_path,target_size = (256,256))
    plt.imshow(plt.imread(image_path))
    test_image = image.img_to_array(test_image)
    test_image = test_image/255
    test_image = np.expand_dims(test_image, axis = 0)
    result = model.predict(test_image)
    result = result.ravel() 
    classes = ["Fusarium Wilt","Leaf Curl Disease","Healthy Leaf","Healthy Plant"]
    max = result[0];    
    index = 0; 
    #Loop through the array    
    for i in range(0, len(result)):    
      #Compare elements of array with max    
      if(result[i] > max):    
          max = result[i];    
          index = i
    #print("Largest element present in given array: " + str(max) +" And it belongs to " +str(classes[index]) +" class."); 
    pred = str(classes[index])
    return pred

# Create flask instance
app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')


@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']
        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        preds = predict_disease(file_path, model)
        result = preds
        return result
    return None


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80)
