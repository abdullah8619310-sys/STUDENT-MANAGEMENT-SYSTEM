import { Router } from 'express';

const router = Router();

// POST /api/students
router.post('/', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;