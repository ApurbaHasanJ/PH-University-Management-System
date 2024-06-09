import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.zod.validation';
const router = express.Router();

// will call controller func
router.get('/', studentControllers.getAllStudents);

router.get('/:id',validateRequest(studentValidations.updateStudentValidationSchema), studentControllers.updateStudentById);

router.patch('/update-student/:id', studentControllers.updateStudentById);

router.delete(
  '/delete-student/:id',
  studentControllers.deleteStudentById,
);
export const StudentRoutes = router;
