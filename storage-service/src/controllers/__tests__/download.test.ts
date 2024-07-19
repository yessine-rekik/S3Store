import supertest from 'supertest';
import { agent } from '../../setupTests';
import app from '../../app';
import { Types } from 'mongoose';

describe('Download Files', () => {
  it('should retreive a signed url', async () => {
    const response = await agent
      .get('/download')
      .send({
        ids: [new Types.ObjectId().toString(), new Types.ObjectId().toString()],
      })
      .expect(200);

    expect(response.body.urls).toBeDefined();
  });

  it('should return 400 status code when body fields are missing', async () => {
    await agent.get('/download').expect(400);
  });

  it('should return 401 unauthorized when accesToken is invalid', async () => {
    await supertest(app).get('/download').expect(401);
  });
});
