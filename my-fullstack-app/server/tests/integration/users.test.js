process.env.NODE_ENV = 'test';
require('dotenv').config({ path: '.env.test' });

const request = require('supertest');
const app = require('../../src/app');
const pool = require('../../src/db/database');

beforeAll(async () => {
    await pool.query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
});

describe('Test Valid Login, Regsiter, Logout', () => {
    it('should register with correct input', async () => {
        const userData = { userID: "user10", password: "1010" };
        const res = await request(app).post('/users/register').send(userData);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', "Successfully registered!");
    })

    it('should log in a valid user', async () => {
        const userAuth = { userID: "user10", password: "1010" }
        const res = await request(app).post('/users/login').send(userAuth);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', "Successfully logged in!");
    });

    it('should return its userId', async () => {
        const userAuth = { userID: "user10", password: "1010" }
        const res = await request(app).post('/users/login').send(userAuth);

        // ----- Store result cookie and send cookie manually -----
        const cookies = res.headers['set-cookie'];
        const resMe = await request(app).get('/users/me').set('Cookie', cookies);

        expect(resMe.statusCode).toBe(200);
        expect(resMe.body.isLoggedIn).toBe(true);
        expect(resMe.body.userID.userID).toBe("user10");
    })

    it('should logout and clear the cookie', async () => {
        const userAuth = { userID: "user10", password: "1010" }
        const res = await request(app).post('/users/login').send(userAuth);
      
        const cookies = res.headers['set-cookie'];
        const newRes = await request(app).post('/users/logout').set('Cookie', cookies);

        expect(newRes.statusCode).toBe(200);
        expect(newRes.body.message).toBe("Successfully logged out! ");
      });
    
    it('should authorize valid user correctly', async () => {
        const userAuth = { userID: "user10", password: "1010" }
        const res = await request(app).post('/users/login').send(userAuth);
      
        const cookies = res.headers['set-cookie'];
        const resAuth = await request(app).post('/users/loginStatus').set('Cookie', cookies);

        expect(resAuth.statusCode).toBe(200);
        expect(resAuth.body).toHaveProperty('message', `You are still logged in as ${userAuth.userID}!`);
    });
});

describe('Test Invalid/Error Cases', () => {
    it('should fail logging in non-existing user', async () => {
        const userAuth = { userID: "notExistingUser", password: "randomPassword" }
        const res = await request(app).post('/users/login').send(userAuth);

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', "User not found");
    })

    it('should fail registering a userID that already exists', async () => {
        const userAuth = { userID: "user20", password: "2020" }
        await request(app).post('/users/register').send(userAuth);
        const res = await request(app).post('/users/register').send(userAuth);
        expect(res.statusCode).toBe(409);
        expect(res.body.error).toBe('userID already exists!');
    })

    it('should fail logging in with wrong password', async () => {
        const userAuth = { userID: "user20", password: "wrongPassword" }
        const res = await request(app).post('/users/login').send(userAuth);

        expect(res.status).toBe(401);
        expect(res.body.error).toBe("password does not match!");
    })

    it('should fail authorizing user with invalid token', async () => {
        const invalidToken = "invalid_jwt";
      
        const resAuth = await request(app).post('/users/loginStatus')
            .set('Cookie', [`token=${invalidToken}`]);
      
        expect(resAuth.statusCode).toBe(403);
        expect(resAuth.body).toHaveProperty('error', "Invalid or expired token");
    });

    it('should fail authorizing user with empty token', async () => {
        const res = await request(app).post('/users/loginStatus');

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error', "Invalid Token");
    });
});

afterAll(async () => {
    await pool.end();
});

//toHaveProperty('key', 'value');
//toMatchObject({ key: 'value' });

