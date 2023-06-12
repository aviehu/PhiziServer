const request = require('supertest');
const app = require('../../src/app');
const { connectDB, disconnectDB } = require('../../src/database');
const { StatusCodes } = require("http-status-codes");
const Pose = require("../../src/models/poseModel");

beforeAll(async () => {
    await connectDB();
    await Pose.deleteMany({});
})

afterEach(async () => {
    await Pose.deleteMany({});
});

afterAll(async () => {
    await disconnectDB();
});

const poseData = {
    name: 'test pose',
    goals: ['SHOULDERS'],
    keypoints: [],
    keypoints3D: []
}

describe('Pose controller', () => {
    describe('POST /api/poses/addPose', () => {
        it('should create a new pose', async () => {
            const res = await request(app)
                .post('/api/poses/addPose')
                .send(poseData);

            expect(res.statusCode).toEqual(StatusCodes.CREATED);

            const pose = await Pose.findOne({name: poseData.name});
            expect(pose).toBeDefined();
            expect(pose.name).toEqual('test pose');
        });

        it('should avoid create a new pose with the same name', async () => {

            await request(app)
                .post('/api/poses/addPose')
                .send(poseData);

            const res = await request(app)
                .post('/api/poses/addPose')
                .send(poseData);

            expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
            expect(res.body.error).toBeDefined();
        });

    });

    describe('POST /api/poses/updatePose', () => {
        it('should update a pose by name', async () => {
            const pose = new Pose(poseData)
            await pose.save()

            const res = await request(app)
                .post(`/api/poses/updatePose/test pose`)
                .send({
                    goals: ['TEST']
                })

            expect(res.statusCode).toEqual(StatusCodes.OK)
            expect(res.body.goals).toEqual(['TEST']);
        });

    });

    describe('GET /api/poses/getPose', () => {
        it('should return a pose by name', async () => {
            const pose = new Pose(poseData)
            await pose.save();

            const res = await request(app).get(`/api/poses/getPose/test pose`)

            expect(res.statusCode).toEqual(StatusCodes.OK)
            expect(res.body.name).toEqual('test pose');
        });

        it('should return an error if pose is not found', async () => {
            const res = await request(app)
                .get('/api/poses/getPose/non_existing_pose')
            expect(res.status).toEqual(StatusCodes.NOT_FOUND);
            expect(res.body.error).toBeDefined();
        });
    });

    describe('GET /api/poses/deletePose', () => {
        it('should delete a pose by name', async () => {
            const pose = new Pose(poseData)
            await pose.save();

            const res = await request(app).delete(`/api/poses/deletePose/test pose`)

            expect(res.statusCode).toEqual(StatusCodes.OK)
            expect(res.body.name).toEqual('test pose');
        });

        it('should return an error if pose is not found', async () => {
            const res = await request(app)
                .delete('/api/poses/deletePose/non_existing_pose')
            expect(res.status).toEqual(StatusCodes.NOT_FOUND);
            expect(res.body.error).toBeDefined();
        });
    });

    describe('GET /api/poses/getAllPoses', () => {
        it('should return all poses', async () => {
            const pose = new Pose(poseData)
            await pose.save()

            const poseData2 = poseData
            poseData2.name = "test pose2"

            const pose2 = new Pose(poseData2)
            await pose2.save()

            const res = await request(app)
                .get('/api/poses/getAllPoses')

            expect(res.status).toEqual(200);
            expect(res.body.length).toEqual(2);
            expect(res.body[0].name).toEqual('test pose');
            expect(res.body[1].name).toEqual('test pose2');
        });
    });

});
