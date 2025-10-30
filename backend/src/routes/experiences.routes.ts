import { Router } from 'express';
import { getExperiences, getExperienceById } from '../controllers/experience.controller';

const router = Router();

router.get('/', getExperiences);
router.get('/:id', getExperienceById);

export default router;