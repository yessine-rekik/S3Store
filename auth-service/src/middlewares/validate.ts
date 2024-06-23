import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export function validate(validationChain: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validationChain.map((validation) => validation.run(req)));
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    return res.status(400).send(errors.array());
  };
}
