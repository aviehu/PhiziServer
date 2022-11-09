import cv2 as cv
import matplotlib.pyplot as plt
import json as json

inWidth = 640
inHeight = 480
thr = 0.2

BODY_PARTS = ["Nose", "Neck", "RShoulder", "RElbow", "RWrist",
                             "LShoulder", "LElbow", "LWrist", "RHip", "RKnee",
                             "RAnkle", "LHip", "LKnee", "LAnkle", "REye",
                             "LEye", "REar", "LEar", "Background"]

POSE_PAIRS = [ ["Neck", "RShoulder"], ["Neck", "LShoulder"], ["RShoulder", "RElbow"],
               ["RElbow", "RWrist"], ["LShoulder", "LElbow"], ["LElbow", "LWrist"],
               ["Neck", "RHip"], ["RHip", "RKnee"], ["RKnee", "RAnkle"], ["Neck", "LHip"],
               ["LHip", "LKnee"], ["LKnee", "LAnkle"], ["Neck", "Nose"], ["Nose", "REye"],
               ["REye", "REar"], ["Nose", "LEye"], ["LEye", "LEar"] ]

net = cv.dnn.readNetFromTensorflow("skeleton-py/graph_opt.pb")
img = cv.imread("skeleton-py/pose.png")

def pose_estimation(frame):
    frameWidth = frame.shape[1]
    frameHeight = frame.shape[0]
    net.setInput(cv.dnn.blobFromImage(frame, 1.0, (inWidth, inHeight), (127.5, 127.5, 127.5), swapRB=True, crop=False))
    out = net.forward()
    out = out[:, :19, :, :]  # MobileNet output [1, 57, -1, -1], we only need the first 19 elements

    assert(len(BODY_PARTS) == out.shape[1])

    points = []
    for i in range(len(BODY_PARTS)):
        # Slice heatmap of corresponging body's part.
        heatMap = out[0, i, :, :]

        # Originally, we try to find all the local maximums. To simplify a sample
        # we just find a global one. However only a single pose at the same time
        # could be detected this way.
        _, conf, _, point = cv.minMaxLoc(heatMap)
        x = (frameWidth * point[0]) / out.shape[3]
        y = (frameHeight * point[1]) / out.shape[2]
        # Add a point if it's confidence is higher than threshold.
        points.append((int(x), int(y)) if conf > thr else None)

    t, _ = net.getPerfProfile()
    freq = cv.getTickFrequency() / 1000
    idPoints = {}
    i = 0
    for p in points:
        if i < 18:
            idPoints.update({BODY_PARTS[i]: p})
        i = i+1

    print(json.dumps(idPoints))
    return frame
est_image = pose_estimation(img)