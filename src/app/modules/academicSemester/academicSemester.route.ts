import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

// post
router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

// get all
router.get(
  '/get-academic-semesters',
  AcademicSemesterControllers.getAllAcademicSemesters,
);

// get one
router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
);

// update one
router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateSingleAcademicSemester,
);

export const AcademicSemesterRoutes = router;
