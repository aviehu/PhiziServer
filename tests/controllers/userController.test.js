// tests/controllers/user.controller.test.js

const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/userModel');
const { connectDB, disconnectDB } = require('../../src/database');
const { StatusCodes } = require("http-status-codes");


beforeAll(async () => {
    await connectDB();
    await User.deleteMany({});
})

afterEach(async () => {
    await User.deleteMany({});
});

afterAll(async () => {
    await disconnectDB();
});

describe('User controller', () => {
    describe('POST /api/users/register', () => {
        it('should create a new user', async () => {
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
            const res = await request(app)
                .post('/api/users/register')
                .send(userData);

            expect(res.statusCode).toEqual(StatusCodes.CREATED);

            const user = await User.findOne({email: userData.email});
            expect(user).toBeDefined();
            expect(user.email).toEqual('test@example.com');
        });

        it('should return an error if email is missing', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    name: 'test',
                    password: 'password',
                    age: 23,
                    weight: 78,
                    height: 179,
                    bmi: 24.2,
                    goals: ['lose weight', 'build muscle'],
                });

            expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
            expect(res.body.error).toBeDefined();
        });
    });

    describe('POST /api/users/updateUser', () => {
        it('should update a user by email', async () => {
            const user = new User({
                name: 'test',
                email: 'test@example.com',
                password: 'password',
                age: 30,
                weight: 70,
                height: 170,
                bmi: 24.2,
                goals: ['lose weight', 'build muscle'],
            })
            await user.save();

            const res = await request(app)
                .post(`/api/users/updateUser`)
                .send({
                    name: 'New test',
                    email: 'test@example.com',
                })

            expect(res.statusCode).toEqual(StatusCodes.OK)
            expect(res.body.name).toEqual('New test');
        });

    });

    describe('GET /api/users/getUser', () => {
        it('should return a user by email', async () => {
            const user = new User({
                name: 'test',
                email: 'test@example.com',
                password: 'password',
                age: 30,
                weight: 70,
                height: 170,
                bmi: 24.2,
                goals: ['lose weight', 'build muscle'],
            })
            await user.save();

            const res = await request(app).get(`/api/users/getUser/test@example.com`)

            expect(res.statusCode).toEqual(StatusCodes.OK)
            expect(res.body.email).toEqual('test@example.com');
        });

        it('should return a 404 error if user is not found', async () => {
            const res = await request(app)
                .get('/api/users/getUser/test@example.com')
            expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
            expect(res.body.error).toBeDefined();
        });
    });

    describe('GET /api/users/getAllUsers', () => {
        it('should return all users', async () => {
            const user1 = new User({
                name: 'test1',
                email: 'test1@example.com',
                password: 'password',
                age: 30,
                weight: 70,
                height: 170,
                bmi: 24.2,
                goals: ['lose weight', 'build muscle'],
            });
            await user1.save();

            const user2 = new User({
                name: 'test2',
                email: 'test2@example.com',
                password: 'password',
                age: 25,
                weight: 60,
                height: 160,
                bmi: 23.4,
                goals: ['improve flexibility', 'reduce stress'],
            });
            await user2.save();

            const res = await request(app)
                .get('/api/users/getAllUsers')

            expect(res.status).toEqual(200);
            expect(res.body.length).toEqual(2);
            expect(res.body[0].email).toEqual('test1@example.com');
            expect(res.body[1].email).toEqual('test2@example.com');
        });
    });
});
