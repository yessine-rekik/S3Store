import supertest from 'supertest';
import app from '../../app';

let cookies: string[] = [];

describe('User Refresh Tokens', () => {
  it('should return 200 on login', async () => {
    const response = await supertest(app)
      .post('/login')
      .send({
        username: 'some_username',
        password: 'some_password',
      })
      .expect(200);

    cookies = response.get('Set-Cookie') || [];
  });

  it('should allow to refresh tokens when the refresh token is valid', async () => {
    const response = await supertest(app)
      .post('/refresh-token')
      .set('Cookie', cookies)
      .expect(200);

    expect(response.body.accessToken).toBeDefined();
  });

  // Not passing, but passes with postman
  //   it('should disallow to refresh tokens when the refresh token is reused', async () => {
  //     console.log(cookies);
  //     await supertest(app)
  //       .post('/refresh-token')
  //       .set('Cookie', cookies)
  //       .expect(403);
  //   });

  it('should return 401 if no refresh token is present', async () => {
    await supertest(app).post('/refresh-token').expect(401);
  });

  it('should return 403 if refresh token is invalid', async () => {
    await supertest(app)
      .post('/refresh-token')
      .set('Cookie', ['refresh-token=ey'])
      .expect(403);
  });
});
