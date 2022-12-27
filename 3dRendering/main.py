import matplotlib.pyplot as plt
from matplotlib import animation
import json

POSE_PAIRS = [
    ["nose", "left_eye_inner"], ["nose", "right_eye_inner"], ["left_eye_inner", "left_eye"],
    ["left_eye", "left_eye_outer"], ["left_eye_outer", "left_ear"], ["right_eye_inner", "right_eye"],
    ["right_eye", "right_eye_outer"], ["right_eye_outer", "right_ear"], ["mouth_left", "mouth_right"],
    ["left_shoulder", "right_shoulder"], ["right_shoulder", "right_elbow"], ["right_elbow", "right_wrist"],
    ["right_wrist", "right_thumb"], ["right_wrist", "right_pinky"], ["right_wrist", "right_thumb"],
    ["right_pinky", "right_index"], ["right_shoulder", "right_hip"], ["right_hip", "right_knee"],
    ["right_knee", "right_ankle"], ["right_ankle", "right_foot_index"], ["right_ankle", "right_heel"],
    ["right_heel", "right_foot_index"], ["right_hip", "left_hip"], ["left_shoulder", "left_elbow"],
    ["left_elbow", "left_wrist"], ["left_wrist", "left_thumb"], ["left_wrist", "left_pinky"],
    ["left_wrist", "left_index"], ["left_index", "left_pinky"], ["left_shoulder", "left_hip"],
    ["left_hip", "left_knee"], ["left_knee", "left_ankle"], ["left_ankle", "left_heel"],
    ["left_ankle", "left_foot_index"], ["left_heel", "left_foot_index"]
]


def normalize(data):
    mi = data[0]['pose'][0]['z']
    ma = mi
    for a in data:
        for b in a['pose']:
            mi = min([mi, b['z']])
            ma = max([ma, b['z']])

    ratio = 1
    if ma - mi > 500:
        ratio = 500 / (ma - mi)

    for a in data:
        for b in a['pose']:
            b['z'] = (b['z'] - mi) * ratio

    return data


def plot():
    f = open('foo.json')
    data = json.load(f)
    xs = []
    ys = []
    zs = []
    print(data)
    for frame in normalize(data):
        _xs = []
        _ys = []
        _zs = []
        for part in frame['pose']:
            _xs.append(part['x'])
            _ys.append(part['y'])
            _zs.append(part['z'])
        xs.append(_xs)
        ys.append(_ys)
        zs.append(_zs)
    fig = plt.figure()
    ax = plt.axes(projection='3d')

    def get_part(frame_num, part_name):
        for point in data[frame_num]['pose']:
            if point['part'] == part_name:
                return point['x'], point['y'], point['z']
        return -1, -1, -1

    def animate_func(i):
        ax.clear()
        ax.scatter(xs[i], ys[i], zs[i])
        ax.set_xlim3d([0, 250])
        ax.set_ylim3d([0, 187])
        ax.set_zlim3d([0, 500])

        for pair in POSE_PAIRS:
            start_x, start_y, start_z = get_part(i, pair[0])
            end_x, end_y, end_z = get_part(i, pair[1])
            if start_x >= 0 and end_x >= 0:
                ax.plot3D([start_x, end_x], [start_y, end_y], [start_z, end_z], c='blue')

    ani = animation.FuncAnimation(fig, animate_func, interval=50, frames=len(xs))
    plt.show()


if __name__ == '__main__':
    plot()
