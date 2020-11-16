import { User } from '@src/entity';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';

const router: Router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as {
    username: string;
    password: string;
  };

  const { username, password } = body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    res.json({ msg: '아이디가 틀렸습니다' });
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400);
    res.json({ msg: '비밀번호가 틀렸습니다' });
    return;
  }

  res.status(200);
  res.json({ userId: user.userId });
});

export default router;