import { Student } from './student.interface';
import { StudentModel } from './student.model';

// create a new Student
const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

// get students
const getAllStudents = async () => {
  const result = await StudentModel.find();
  return result;
};

// get single student by student id
const getStudentById = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudents,
  getStudentById,
};
