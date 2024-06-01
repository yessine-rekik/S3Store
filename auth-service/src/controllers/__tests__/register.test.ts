import supertest from 'supertest';
import app from '../../app';

describe('User Registration', () => {
  it('should return 201 and set refresh-token cookie on successfull register', async () => {
    const response = await supertest(app)
      .post('/register')
      .send({
        username: 'some_username',
        password: 'some_password',
      })
      .expect(201);

    expect(response.body.accessToken).toBeDefined();

    const cookies = response.get('Set-Cookie');

    const refreshTokenCookie = cookies?.find((cookie: string) =>
      cookie.startsWith('refresh-token=')
    );
    expect(refreshTokenCookie).toBeDefined();
  });

  it('should disallow duplicates', async () => {
    await supertest(app)
      .post('/register')
      .send({
        username: 'some_username',
        password: 'some_password',
      })
      .expect(409);
  });
});
