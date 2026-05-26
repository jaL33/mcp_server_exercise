import { Router } from 'express';
import healthRouter from './health';
import mcpRouter from './mcp';

const router = Router();

router.use('/health', healthRouter);
router.use('/mcp', mcpRouter);

export default router;
