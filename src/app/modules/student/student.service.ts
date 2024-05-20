import { TStudent } from './student.interface';
import { Student } from './student.model';

// create a new Student
const createStudentIntoDB = async (studentData: TStudent) => {
  // using built in static method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('Student already exists!');
  }
  const result = await Student.create(studentData);

  // using instace method
  // const student = new Student(studentData); // create an instance
  // if(await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists!');
  // }

  // const result = await student.save(); // built in instance method

  return result;
};

// get students
const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};

// get single student by student id
const getStudentById = async (id: string) => {
  // const result = await Student.findOne({ id: id });
  const result = await Student.aggregate([
    {$match: {id: id}}
  ])
  return result;
};

// Delete student by student id
const deleteStudentById = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
