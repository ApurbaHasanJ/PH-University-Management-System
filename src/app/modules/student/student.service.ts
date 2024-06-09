import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.const';

// get students
const getAllStudents = async (query: Record<string, unknown>) => {
  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  :
  //  { email: { $regex : query.searchTerm , $options: i}}
  //  { presentAddress: { $regex : query.searchTerm , $options: i}}
  //  { 'name.firstName': { $regex : query.searchTerm , $options: i}}

  // console.log({query});
  // const queryObj = { ...query }; // make a query copy
  // for dynamic search for all fields
  // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }

  // method chaining

  // search using searchTerm for all fields
  // WE ARE DYNAMICALLY DOING IT USING LOOP
  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // filtering out search term,
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((element) => delete queryObj[element]); // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

  // console.log({ query, queryObj });

  // search by exact match email
  // const filterQuery = searchQuery
  // .find(queryObj)
  // .populate('admissionSemester') //use the key here;
  // .populate({
  //   path: 'academicDepartment',
  //   populate: {
  //     path: 'academicFaculty', // father and grandfather relation
  //   },
  // });

  // sorting query
  // let sort = '-createdAt';
  // if (query?.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);

  // // for page & limit query
  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query?.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // // skipping the page
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);

  // // field limiting
  // let fields = '__v';
  // if (query?.fields) {
  //   fields = (query?.fields as string).split(',').join(' ');
  //   console.log(fields);
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester') //use the key here;
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty', // father and grandfather relation
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};

// get single student by student id
const getStudentById = async (id: string) => {
  const result = await Student.findById(id)
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

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
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
    const deletedStudent = await Student.findByIdAndUpdate(
      id ,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user id from deleted student
    const userId = deletedStudent.user

    // delete the user
    const deletedUser = await User.findByIdAndUpdate(
      userId ,
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
