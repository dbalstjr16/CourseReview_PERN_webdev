process.env.NODE_ENV = "test";
require('dotenv').config({ path: '.env.test' });

const request = require('supertest');
const app = require('../../src/app');
const pool = require('../../src/db/database');

beforeEach(async () => {
  await pool.query(`TRUNCATE TABLE comments, courses, universities RESTART IDENTITY CASCADE`);
  await pool.query(`INSERT INTO universities (name) VALUES ($1)`, ['University of Wisconsin-Madison']);
  await pool.query(`INSERT INTO courses (name, university_id) VALUES ($1, $2)`, ['CS537', 1]);
});

describe('Test GET, POST, DELETE comments', () => {
  it('should post new comment into database', async () => {
    const newComment = {
      userid: 1,
      courseid: 1,
      content: "This course was super helpful! 🥰!"
    };

    const res = await request(app).post('/comments/postcomment').send(newComment);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Successfully posted comment!');

    const result = await pool.query(
      `SELECT * FROM comments WHERE userid = $1 AND courseid = $2 AND content = $3`,
      [newComment.userid, newComment.courseid, newComment.content]
    );

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].content).toBe(newComment.content);
  });

  it('should return all comments based on corresponding university name and course name', async () => {
    const newComment = {
      userid: 2,
      courseid: 1,
      content: "I love this course!"
    };

    await request(app).post('/comments/postcomment').send(newComment);

    const res = await request(app).get('/comments/University%20of%20Wisconsin-Madison/CS537');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].content).toBe(newComment.content);
  });

  it('should delete existing comment', async () => {
    const insertRes = await pool.query(
      `INSERT INTO comments (userid, courseid, content) 
       VALUES ($1, $2, $3) RETURNING id`,
      [1, 1, 'To be deleted']
    );

    const targetId = { id: insertRes.rows[0].id };

    const res = await request(app).delete('/comments/deletecomment').send(targetId);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', "Successfully deleted comment!");

    const result = await pool.query(`SELECT * FROM comments WHERE id = $1`, [targetId.id]);
    expect(result.rows.length).toBe(0);
  });
});

afterAll(async () => {
  await pool.end();
});
