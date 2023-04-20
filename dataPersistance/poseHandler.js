export default function poseHandler(dataBase) {
    const poses = dataBase.collection('Poses');

    const PoseHandler = {}

    PoseHandler.addPose = async function (pose) {
        await poses.insertOne(pose);
    }

    return PoseHandler
}

