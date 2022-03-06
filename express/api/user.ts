import jwt from 'jsonwebtoken';
import { Router, Request, Response, NextFunction } from 'express';

import auth from './../middlewares/auth';
import { PRIVATE_KEY } from '../lib/consts';
import * as usersController from './../controllers/user.controller';

const router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const user = await usersController.login(data);

    const encoded = jwt.sign({ email: user.email }, PRIVATE_KEY, { expiresIn: '1d' });
    res.cookie('authorization', encoded);

    return res.json({ success: true, data: user });
  } catch (error: any) {
    return res.json({ success: false, message: error?.message });
  }
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.body;

    const user = await usersController.create(params);

    return res.json({ success: true, data: user });
  } catch (error: any) {
    return res.json({ success: false, message: error?.message });
  }
});

router.use(auth);

router.get('/', async (_: Request, res: Response) => {
  try {
    const users = await usersController.filter();

    return res.json({ success: true, data: users });
  } catch (error: any) {
    return res.json({ success: false, message: error?.message });
  }
});

export default router;
