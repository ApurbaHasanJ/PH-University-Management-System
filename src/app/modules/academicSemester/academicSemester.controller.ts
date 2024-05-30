import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicSemesterServices } from './academicSemester.services';

// create academicSemester
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

// get academic semester
const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester data get successfully',
    data: result,
  });
});

// get academic semester
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await academicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester data get successfully',
    data: result,
  });
});

// get academic semester
const updateSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const updatedAcademicSemester = req.body;

  const result = await academicSemesterServices.updateSingleAcademicSemesterFromDB(semesterId, updatedAcademicSemester);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester data get successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester
};
