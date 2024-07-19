import supertest from 'supertest';
import { agent } from '../../setupTests';
import app from '../../app';

describe('Upload Files', () => {
  it('should retreive a signed url', async () => {
    const response = await agent
      .post('/upload')
      .send({
        filename: 'myfile.png',
        mimetype: 'image/png',
        size: 400,
      })
      .expect(200);

    expect(response.body.url).toBeDefined();
  });

  it('should return 400 status code when body fields are missing', async () => {
    await agent.post('/upload').expect(400);
  });

  it('should return 401 unauthorized when accesToken is invalid', async () => {
    await supertest(app).post('/upload').expect(401);
  });
});
