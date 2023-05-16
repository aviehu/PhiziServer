// tests/controllers/session.controller.test.js

const request = require('supertest');
const app = require('../../src/app');
const Session = require('../../src/models/sessionModel');
const Pose = require('../../src/models/poseModel');
const { connectDB, disconnectDB } = require('../../src/database');
const { StatusCodes } = require("http-status-codes");

beforeAll(async () => {
    await connectDB();
    await Session.deleteMany({});
    await Pose.deleteMany({});
})

afterEach(async () => {
    await Session.deleteMany({});
    await Pose.deleteMany({});
});

afterAll(async () => {
    await disconnectDB();
});

describe('Session controller', () => {
    describe('POST /api/sessions/addSession', () => {
        it('should create a new session', async () => {
            const pose = new Pose({
                name: 'Pose Test',
                goals: ['SHOULDERS'],
                keypoints: [],
                keypoints3D: []
            })
            await pose.save()
            const sessionData = {
                name: 'test session',
                description: "Test description",
                difficulty: 5,
                poses: ['Pose Test'],
                goals: ['SHOULDERS']
            }
            const res = await request(app)
                .post('/api/sessions/addSession')
                .send(sessionData);

            expect(res.statusCode).toEqual(StatusCodes.CREATED);

            const session = await Session.findOne({name: sessionData.name});
            expect(session).toBeDefined();
            expect(session.name).toEqual('test session');
        });

    });

    // describe('POST /api/sessions/updateSession', () => {
    //     it('should update a session by name', async () => {
    //         const poseData = new Pose({
    //             name: 'Pose Test',
    //             goals: ['SHOULDERS'],
    //             keypoints: []
    //         })
    //         await poseData.save()
    //         const session = new Session({
    //             name: 'test session',
    //             description: "Test description",
    //             difficulty: 5,
    //             poses: ['Pose Test']
    //         })
    //         await session.save();
    //
    //         const res = await request(app)
    //             .post(`/api/sessions/updateSession`)
    //             .send({
    //                 name: 'test session',
    //                 difficulty: 8,
    //             })
    //
    //         expect(res.statusCode).toEqual(StatusCodes.OK)
    //         expect(res.body.difficulty).toEqual(8);
    //     });
    //
    // });

    describe('GET /api/sessions/getSession', () => {
        it('should return a session by name', async () => {
            const pose = new Pose({
                name: 'Pose Test',
                goals: ['SHOULDERS'],
                keypoints: [],
                keypoints3D: []
            })
            await pose.save()
            const session = new Session({
                name: 'test_session',
                description: "Test description",
                difficulty: 5,
                poses: ['Pose Test'],
                goals: ['SHOULDERS']
            })
            await session.save();

            const res = await request(app).get(`/api/sessions/getSession/test_session`)

            expect(res.statusCode).toEqual(StatusCodes.OK)
            expect(res.body.name).toEqual('test_session');
        });

        // it('should return a 404 error if session is not found', async () => {
        //     const res = await request(app)
        //         .get('/api/sessions/getSession/non_existing_session')
        //     expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
        //     expect(res.body.error).toBeDefined();
        // });
    });

    describe('GET /api/sessions/getAllSessions', () => {
        it('should return all sessions', async () => {
            const pose = new Pose({
                name: 'Pose Test',
                goals: ['SHOULDERS'],
                keypoints: [],
                keypoints3D: []
            })
            await pose.save()
            const session1 = new Session({
                name: 'test_session1',
                description: "Test description1",
                difficulty: 5,
                poses: ['Pose Test'],
                goals: ['SHOULDERS']
            })
            await session1.save();
            const session2 = new Session({
                name: 'test_session2',
                description: "Test description2",
                difficulty: 6,
                poses: ['Pose Test'],
                goals: ['SHOULDERS']
            })
            await session2.save();

            const res = await request(app)
                .get('/api/sessions/getAllSessions')

            expect(res.status).toEqual(200);
            expect(res.body.length).toEqual(2);
            expect(res.body[0].name).toEqual('test_session1');
            expect(res.body[1].name).toEqual('test_session2');
        });
    });
});
