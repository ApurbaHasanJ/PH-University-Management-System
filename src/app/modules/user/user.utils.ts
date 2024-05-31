import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

// we need year, semester code, 4 digit number which will =+ by last student id
export const generateStudentId = async (payload: TAcademicSemester) => {
  // for first student id
  let currentId = (0).toString(); // 0000 default

  const lastStudentId = await findLastStudentId();

  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload?.code;
  const currentSemesterYear = payload?.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
