import supertest from 'supertest';
import app from '../../app';

describe('User Login', () => {
  it('should handle inexistant username', async () => {
    await supertest(app)
      .post('/login')
      .send({
        username: 'wrong_username',
        password: 'some_password',
      })
      .expect(401);
  });

  it('should handle wrong password', async () => {
    await supertest(app)
      .post('/login')
      .send({
        username: 'some_username',
        password: 'wrong_password',
      })
      .expect(401);
  });

  it('should return 200, accessToken and refreshToken on successful login', async () => {
    const response = await supertest(app)
      .post('/login')
      .send({
        username: 'some_username',
        password: 'some_password',
      })
      .expect(200);

    expect(response.body.accessToken).toBeDefined();

    const cookies = response.get('Set-Cookie');

    const refreshTokenCookie = cookies?.find((cookie: string) =>
      cookie.startsWith('refresh-token=')
    );
    expect(refreshTokenCookie).toBeDefined();
  });
});
