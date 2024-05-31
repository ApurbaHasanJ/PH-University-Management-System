import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemister.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

// create a new Student
const createUserIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password not exist, use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';



  //  find academic semester info

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);

  //   set manually ID
  userData.id = await generateStudentId(admissionSemester);

  //   create a user
  const result = await User.create(userData);

  //   create a student
  if (Object.keys(result).length) {
    // set id, _id as user
    payload.id = result.id; //embedding _id
    payload.user = result._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createUserIntoDB,
};
