import { Request, Response } from 'express';
import { studentServices } from './student.service';

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
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
