import { NextFunction, Request, Response } from 'express';
import { getObjectSignedUrl } from '../utils/generateSignedUrl';

export async function download(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!Array.isArray(req.body.ids))
    return res
      .status(400)
      .send('Body must have a field `ids` which is an array of strings');

  const ids: string[] = req.body.ids;

  try {
    const promises = ids.map(
      (id) =>
        // eslint-disable-next-line
        new Promise<string>(async (resolve, reject) => {
          try {
            const signedUrl = await getObjectSignedUrl(id);
            resolve(signedUrl);
          } catch (err) {
            reject(err);
          }
        })
    );

    const signedUrls = await Promise.all(promises);

    res.send({ urls: signedUrls });
  } catch (err) {
    next(err);
  }
}
