import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

// create a new Student
const createUserIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password not exist, use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  //   set manually ID
  userData.id = '2030100001';

  //   create a user
  const result = await User.create(userData);

  //   create a student
  if (Object.keys(result).length) {
    // set id, _id as user
    studentData.id = result.id; //embedding _id
    studentData.user = result._id; //reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createUserIntoDB,
};
