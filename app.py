from flask import Flask, render_template, request, jsonify
from PIL import Image
import numpy as np
from keras.models import load_model

app = Flask(__name__)

lung_cancer_model = load_model('4classmodel.h5')

@app.route('/')
def index():
    return render_template('project.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the uploaded file
    uploaded_file = request.files['file']

    prediction = predict_lung_cancer(uploaded_file)

    return jsonify({'prediction': prediction})

def preprocess_image(image):
    resized_image = image.resize((224, 224))
    
    processed_image = np.array(resized_image) / 255.0
    print("Processed Image Shape:", processed_image.shape)
    if len(processed_image.shape) == 2:
        processed_image = np.stack((processed_image,) * 3, axis=-1)

    print("Processed Image Shape (After):", processed_image.shape)
    return processed_image

def predict_lung_cancer(uploaded_file):
    img = Image.open(uploaded_file)

    # Preprocess the image
    processed_image = preprocess_image(img)
    #print("Processed Image Shape:", processed_image.shape)

    processed_image = processed_image.reshape(1, 224, 224, 3)
    #print("Reshaped Image Shape:", processed_image.shape)

    # Making predictions using the loaded model
    result = lung_cancer_model.predict(processed_image)
    predicted_class = np.argmax(result)
    class_labels=['NO pneumonia is detected', 'Bacterial Pneumonia is detected', 'Viral Pneumonia is detected', 'tb is detected']
    predicted_label = class_labels[predicted_class]
    return predicted_label

if __name__ == '__main__':
    app.run(debug=True)
