import cv2
import numpy as np
import urllib
from matplotlib import pyplot as plt


resp = urllib.urlopen("https://maps.googleapis.com/maps/api/staticmap?center=34.675809,-82.834581&zoom=19&scale=1&size=600x300&maptype=satellite&format=png&visual_refresh=true")

image = np.array(bytearray(resp.read()), dtype=np.uint8)
image = cv2.imdecode(image, cv2.IMREAD_COLOR)

#img = cv2.imread(image, 0)
#img = cv2.imread('housetest2.png',0)
edges = cv2.Canny(image,500,700)

plt.subplot(121),plt.imshow(image,cmap = 'gray')
plt.title('Original Image'), plt.xticks([]), plt.yticks([])
plt.subplot(122),plt.imshow(edges,cmap = 'gray')
plt.title('Edge Image'), plt.xticks([]), plt.yticks([])

#plt.show()

cv2.imshow("image",edges)
cv2.waitKey(0)
