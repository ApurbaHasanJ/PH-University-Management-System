import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

// create academic Department
const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is created successfully',
    data: result,
  });
});

// get all academic faculties
const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments data get successfully',
    data: result,
  });
});

// get single academic Department
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department data get successfully',
    data: result,
  });
});

// update academic Department
const updateSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const updatedAcademicDepartment = req.body;

  const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
    departmentId,
    updatedAcademicDepartment,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department data updated successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
};
