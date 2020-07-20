from flask import Flask, jsonify, request, abort, render_template, send_file
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

cifar10_model = load_model('MobileNetV2__2020-07-20-10-32-55.h5')

app = Flask(__name__)

classes = ['airplane', 'automobile', 'bird', 'cat',
           'deer', 'dog', 'frog', 'horse', 'ship', 'truck']

def predict(img):
    img = img.resize((32, 32), Image.ANTIALIAS)
    img = img.convert('RGB')
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0) / 255.
    preds = cifar10_model.predict(x)[0]
    return {classes[x]: float(preds[x]) for x in np.argsort(preds)[::-1][:3]}


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/classify", methods=['POST'])
def classify():
    file = request.files['query_img']
    try:
        img = Image.open(file.stream)
    except:
        abort(400)
    return jsonify(predict(img))


@app.route("/cifar10.png")
def favicon():
    return send_file('templates/cifar10.png')


if __name__ == '__main__':
    app.run(debug=True)
