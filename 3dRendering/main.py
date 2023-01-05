from multiprocessing import Process, Queue
from queue import Empty

import matplotlib.pyplot as plt
from matplotlib import animation
import json
import asyncio
import websockets

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


def get_part(pose, part_name):
    for point in pose['pose']:
        if point['part'] == part_name:
            return point['x'], point['y'], point['z']
    return -1, -1, -1


def get_values(pose):
    xs = []
    ys = []
    zs = []
    for point in pose['pose']:
        xs.append(point['x'])
        ys.append(point['y'])
        zs.append(point['z'])
    return xs, ys, zs


def normalize_pose(pose, u):
    for point in pose['pose']:
        point['z'] = point['z'] * u + 125
        print(point['z'])


def plot(q, U):
    fig = plt.figure()
    ax = plt.axes(projection='3d')
    u = U.get()

    def animate_func(i):
        next_frame = q.get()
        normalize_pose(next_frame, u)
        xs, ys, zs = get_values(next_frame)
        ax.clear()
        ax.scatter(xs, ys, zs)
        ax.set_xlim3d([0, 250])
        ax.set_ylim3d([0, 187])
        ax.set_zlim3d([0, 250])
        for pair in POSE_PAIRS:
            start_x, start_y, start_z = get_part(next_frame, pair[0])
            end_x, end_y, end_z = get_part(next_frame, pair[1])
            if start_x >= 0 and end_x >= 0:
                ax.plot3D([start_x, end_x], [start_y, end_y], [start_z, end_z], c='blue')

    ani = animation.FuncAnimation(fig, animate_func, interval=10, frames=1)
    plt.show()


def clear_queue(q):
    try:
        while True:
            q.get_nowait()
    except Empty:
        pass


def echo_wrapper(q):
    async def echo(websocket):
        async for message in websocket:
            clear_queue(q)
            msg = json.loads(message)
            if len(msg['pose']) > 0:
                q.put(json.loads(message))
            else:
                U.put(msg['U'])
    return echo


async def main():
    print('started')
    async with websockets.serve(echo_wrapper(q), "localhost", 8080):
        await asyncio.Future()  # run forever


if __name__ == '__main__':
    q = Queue()
    U = Queue()
    p = Process(target=plot, args=(q,U))
    p.start()
    asyncio.run(main())



