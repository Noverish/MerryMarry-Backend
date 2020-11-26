import { Router, Request, Response, NextFunction } from 'express';

import { workflowGuestbook } from '@src/services';
import { handleServiceResult } from './utils';

const router: Router = Router();

router.post('/workflow', async (req: Request, res: Response, next: NextFunction) => {
  workflowGuestbook(req.body as any)
    .then(handleServiceResult(200, res))
    .catch(next);
});

export default router;
