import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

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

// update single student by student id
const updateStudentById = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

// Delete student by student id
const deleteStudentById = async (id: string) => {
  // we have to build an isolated environment, so we will use session
  const session = await mongoose.startSession();

  try {
    session.startTransaction(); //start transaction

    // delete the student
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // delete the user
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    // after successful transaction we  have to commit and end
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    // if we can't student or user successfully we have to use abort and end
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }
};

export const studentServices = {
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
