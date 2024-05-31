import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import { AcademicSemester } from '../academicSemester/academicSemister.model';

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


  // we have to build an isolated environment, so we will use session
  const session = await mongoose.startSession();

  try {
    session.startTransaction(); //start transaction
    
    //   set generated ID
    userData.id = await generateStudentId(admissionSemester);

    //   create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    // console.log({newUser})
    //   create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as user
    payload.id = newUser[0].id; //embedding id
    payload.user = newUser[0]._id; //reference _id

    //   create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });

    // console.log({newStudent})
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // after successful transaction we  have to commit and end
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    // if we can't student or user successfully we have to use abort and end
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }
};

export const userServices = {
  createUserIntoDB,
};
