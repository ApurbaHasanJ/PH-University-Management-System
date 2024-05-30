import { RequestHandler } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// get all students
const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudents();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

// get single student by student id
const getStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.getStudentById(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

// get single student by student id
const deleteStudentById: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteStudentById(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student has been deleted successfully',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
