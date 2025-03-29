process.env.NODE_ENV = "test";
require('dotenv').config({ path: '.env.test' });

const app = require('../../src/app');
const pool = require('../../src/db/database');
const request = require('supertest');

beforeEach(async () => {
  await pool.query(`TRUNCATE TABLE courses, universities RESTART IDENTITY CASCADE`);
  await pool.query(`INSERT INTO universities (name) VALUES ($1)`, ['University of Wisconsin-Madison']);
  await pool.query(`INSERT INTO courses (name, university_id) VALUES ($1, $2)`, ['CS537', 1]);
});

describe('Test API related to University Data', () => {
  it('should return list of university data', async () => {
    const res = await request(app).get('/search/universityCourseName');

    expect(res.status).toBe(200);
    expect(res.body[0]).toMatchObject({
      id: 1,
      uname: 'University of Wisconsin-Madison',
      cname: 'CS537'
    });
  });

  it('should return courseId based on course name', async () => {
    const res = await request(app).get('/search/getCourseID/CS537');

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });
});

afterAll(async () => {
  await pool.end();
});
