import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.zod.validation';
const router = express.Router();

// will call controller func
router.get('/', studentControllers.getAllStudents);

router.get('/:studentId',validateRequest(studentValidations.updateStudentValidationSchema), studentControllers.updateStudentById);

router.patch('/update-student/:studentId', studentControllers.updateStudentById);

router.delete(
  '/delete-student/:studentId',
  studentControllers.deleteStudentById,
);
export const StudentRoutes = router;
