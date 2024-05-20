import { Request, Response } from 'express';
import { studentServices } from './student.service';

// joi import
// import studentJoiValidationSchema from './student.joi.validation';

// zod import
import studentZodValidatioSchema from './student.zod.validation';

// create a new student
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // send student information to the joi schema
    // const { value, error } = studentJoiValidationSchema.validate(studentData);
    // console.log({ value }, { error });
    // if (error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: error.message,
    //     error: error.details,
    //   });
    // }

    // student validation schema using ZOD
    const zodParsedData = studentZodValidatioSchema.parse(studentData);

    // Call service function to send this data
    // const result = await studentServices.createStudentIntoDB(value); //using joi
    const result = await studentServices.createStudentIntoDB(zodParsedData); // using zod

    // Send response
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: 'Students are retrieve successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// get single student by student id
const getStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getStudentById(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// get single student by student id
const deleteStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentById(studentId);
    res.status(200).json({
      success: true,
      message: 'Student has been deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
