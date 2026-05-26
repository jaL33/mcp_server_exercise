import { Router, Request, Response } from 'express';
import { handleMcpRequest, McpError } from '../services/mcpService';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const response = handleMcpRequest(payload);
    res.json(response);
  } catch (error) {
    if (error instanceof McpError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    throw error;
  }
});

export default router;
