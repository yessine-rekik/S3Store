import supertest from 'supertest';
import app from '../../app';

describe('User Logout', () => {
  it('should clear the refresh token cookie and return 200', async () => {
    const agent = supertest.agent(app);

    await agent
      .post('/login')
      .send({ username: 'some_username', password: 'some_password' });

    const response = await agent.post('/logout').expect(200);

    const cookies = response.headers['set-cookie'];

    expect(cookies).toBeUndefined();
  });

  it('should return 200 if no refresh token is present', async () => {
    await supertest(app).post('/logout').expect(200);
  });

  it('should return 200 even if the refresh token is invalid', async () => {
    await supertest(app)
      .post('/logout')
      .set('Cookie', ['refresh-token=invalid_token'])
      .expect(200);
  });
});
