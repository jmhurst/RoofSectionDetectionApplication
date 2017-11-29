import os
import cv2
import numpy as np
import urllib
from matplotlib import pyplot as plt
from flask import Flask, render_template, request
from PIL import Image
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/measurements<params>')
def measurements(params):    
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    zoom = request.args.get('zoom')
    width = request.args.get('width')
    height = request.args.get('height')
    
    staticUrl = "https://maps.googleapis.com/maps/api/staticmap?";
    
    staticUrl += "center=" + lat + "," + lng;
    staticUrl += "&zoom=" + zoom;
    staticUrl += "&size=" + width + "x" + height;
    staticUrl += "&scale=1&maptype=satellite&format=png&visual_refresh=true"
    
    response = urllib.urlopen(staticUrl)

    image = np.array(bytearray(response.read()), dtype=np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    edges = cv2.Canny(image,300,400)

    '''
    plt.subplot(121),plt.imshow(image,cmap = 'gray')
    plt.title('Original Image'), plt.xticks([]), plt.yticks([])
    plt.subplot(122),plt.imshow(edges,cmap = 'gray')
    plt.title('Edge Image'), plt.xticks([]), plt.yticks([])
    
    plt.show()
    '''
    #print(type(edges))
    #cv2.imshow("image",edges)
    #cv2.waitKey(0)
    
    try:
        os.remove("static/img/edges.png")
    except OSError:
        print("Couldn't delete edges.png")
    
    img = Image.fromarray(edges, 'L')
    img.save('static/img/edges.png')
    img.show()
    cv2.waitKey(0)
    
    '''
    data_uri = open(edges, 'rb').read().encode('base64').replace('\n', '')
    img_tag = '<img src="data:image/png;base64,{0}">'.format(data_uri)

    print(img_tag)
    '''
    return render_template('measurements.html')
