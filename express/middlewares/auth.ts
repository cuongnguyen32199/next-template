import path from 'path';
import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const credential = readFileSync(path.join(process.cwd(), 'credentials', 'secret.pub'), 'utf-8');

export default async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers?.authorization;

    if (!token) throw new Error('Invalid credentials');

    const verified = jwt.verify(token, credential);
    console.log({ verified });
    next();
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
}
