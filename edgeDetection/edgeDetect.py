#import cv2
#import numpy as np
#from matplotlib import pyplot as plt
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index:
    return render_template('index.html')

# img = cv2.imread('messi5.jpg',0)
# edges = cv2.Canny(img,100,200)
#
# plt.subplot(121),plt.imshow(img,cmap = 'gray')
# plt.title('Original Image'), plt.xticks([]), plt.yticks([])
# plt.subplot(122),plt.imshow(edges,cmap = 'gray')
# plt.title('Edge Image'), plt.xticks([]), plt.yticks([])
#
# plt.show()
