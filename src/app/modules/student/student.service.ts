import { Student } from './student.model';

// get students
const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};

// get single student by student id
const getStudentById = async (id: string) => {
  // const result = await Student.findOne({ id: id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

// Delete student by student id
const deleteStudentById = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
