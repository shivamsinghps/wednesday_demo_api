const request = require('supertest');
const app = require('../../app');

const User = require('../../src/models/Users.js');

const user = {
  email: process.env.SAMPLE_EMAIL,
  password: process.env.SAMPLE_PASS,
  contact_no: process.env.SAMPLE_CONTACT_NO,
  user_name: process.env.SAMPLE_USER_NAME,
};

afterAll(async () => {
  const result = await User.findOne({
    where: {
      email: user.email,
    },
  });

  result.destroy();
});

// describe('GET /api/users', () => {
//   test('Retreving the list of users', async () => {
//     const response = await request(app)
//       .get('/api/users');
//     expect(response.statusCode)
//       .toBe(200);
//     expect(response.body.length)
//       .toBe(10);
//   });
// });

describe('POST /api/signup', () => {
  test('Checking sign up with new user', async () => {
    const response = await request(app)
      .post('/api/signup')

      .send(user);
    expect(response.statusCode)
      .toBe(201);
    expect(response.body.message)
      .toBe('User created');
  }, 20000);
});


describe('POST /api/login', () => {
  test('Checking authentication with valid email and pass', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: user.email,
        password: user.password,
      });
    expect(response.statusCode)
      .toBe(202);
    expect(response.body.message)
      .toBe('Auth successful');
  });
});
