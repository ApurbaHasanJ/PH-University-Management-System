import { Student } from './student.model';

// get students
const getAllStudents = async () => {
  const result = await Student.find()
    .populate('admissionSemester') //use the key here;
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty', // father and grandfather relation
      },
    });
  return result;
};

// get single student by student id
const getStudentById = async (id: string) => {
  const result = await Student.findOne({ id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty', // father and grandfather relation
      },
    });
  // const result = await Student.aggregate([{ $match: { id: id } }]);
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
