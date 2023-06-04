
const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/userModel');
const Session = require('../../src/models/sessionModel');
const Pose = require('../../src/models/poseModel');
const Score = require('../../src/models/scoreModel');
const { connectDB, disconnectDB } = require('../../src/database');
const { StatusCodes } = require("http-status-codes");


beforeAll(async () => {
    await connectDB();
    await Score.deleteMany({});
    const pose = new Pose(poseData)
    const session = new Session(sessionData)
    const user = new User(userData)
    await pose.save()
    await session.save()
    await user.save()

})

afterEach(async () => {
    await Score.deleteMany({});
});

afterAll(async () => {
    await User.deleteMany({})
    await Session.deleteMany({})
    await Pose.deleteMany({})
    await disconnectDB();
});

const poseData = {
    name: 'Pose Test',
    goals: ['SHOULDERS'],
    keypoints: [],
    keypoints3D: []
}

const sessionData = {
    name: 'test session',
    description: "Test description",
    difficulty: 5,
    poses: ['Pose Test'],
    goals: ['SHOULDERS']
}

const sessionData2 = {
    name: 'test session2',
    description: "Test description",
    difficulty: 5,
    poses: ['Pose Test'],
    goals: ['SHOULDERS']
}

const userData = {
    name: 'test',
    email: 'test@example.com',
    password: 'password',
    age: 30,
    weight: 70,
    height: 170,
    bmi: 24.2,
    goals: ['lose weight', 'build muscle'],
}

const userData2 = {
    name: 'test2',
    email: 'test2@example.com',
    password: 'password',
    age: 30,
    weight: 70,
    height: 170,
    bmi: 24.2,
    goals: ['lose weight', 'build muscle'],
}

const scoreData = {
    user: 'test@example.com',
    session: 'test session',
    duration: 100
}

const scoreData2 = {
    user: 'test2@example.com',
    session: 'test session2',
    duration: 200
}

describe('Score controller', () => {
    describe('POST /api/scores/addScore', () => {
        it('should create a new score', async () => {
            const res = await request(app)
                .post('/api/scores/addScore')
                .send(scoreData);

            expect(res.statusCode).toEqual(StatusCodes.CREATED);

            const score = await Score.findOne({user: scoreData.user, session: 'test session'});
            expect(score).toBeDefined();
            expect(score.duration).toEqual(100);
        });

        it('should return an error if user is missing', async () => {
            const res = await request(app)
                .post('/api/scores/addScore')
                .send({
                    session: 'test session',
                    duration: 100
                });

            expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
            expect(res.body.error).toBeDefined();
        });
    });

    describe('GET /api/scores/getSessionScores', () => {
        it('should return scores by session', async () => {
            const score = new Score(scoreData)
            await score.save();
            const score2 = new Score(scoreData2)
            await score2.save();

            const res = await request(app).get(`/api/scores/getSessionScores/test session`)

            expect(res.statusCode).toEqual(StatusCodes.OK)
            expect(res.body.length).toEqual(1);
            expect(res.body[0].user).toEqual('test@example.com');
        });

        it('should return an empty array if could not found scores', async () => {
            const res = await request(app)
                .get('/api/scores/getSessionScores/test NonExists')
            expect(res.status).toEqual(StatusCodes.OK);
            expect(res.body.length).toEqual(0);
        });
    });

    describe('GET /api/scores/getUserScores', () => {
        it('should return scores by user email', async () => {
            const score = new Score(scoreData)
            await score.save();
            const score2 = new Score(scoreData2)
            await score2.save();

            const res = await request(app).get(`/api/scores/getUserScores/test@example.com`)

            expect(res.statusCode).toEqual(StatusCodes.OK)
            expect(res.body.length).toEqual(1);
            expect(res.body[0].user).toEqual('test@example.com');
        });

        it('should return an empty array if could not found scores', async () => {
            const res = await request(app)
                .get('/api/scores/getSessionScores/test NonExists')
            expect(res.status).toEqual(StatusCodes.OK);
            expect(res.body.length).toEqual(0);
        });
    });
});
