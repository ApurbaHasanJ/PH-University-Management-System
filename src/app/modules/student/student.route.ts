import express from 'express';
import { studentControllers } from './student.controller';
const router = express.Router();

// will call controller func
router.get('/', studentControllers.getAllStudents);

router.get('/:studentId', studentControllers.getStudentById);

router.delete(
  '/delete-student/:studentId',
  studentControllers.deleteStudentById,
);
export const StudentRoutes = router;
