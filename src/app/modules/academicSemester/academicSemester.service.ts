import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterCodeMapper } from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemister.model';

// create semesters into db
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //business logic here
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${payload.name} is not a valid code ${payload.code}`,
    );
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// get all semesters from db
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

// get single semesters from db
const getSingleAcademicSemesterFromDB = async (payload: string) => {
  const result = await AcademicSemester.findOne({ _id: payload });
  return result;
};

// update single semesters from db
const updateSingleAcademicSemesterFromDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND,`${payload.name} is not a valid code ${payload.code}`);
  }

  const result = await AcademicSemester.findOneAndUpdate(
    { _id: semesterId },
    payload,
    { new: true },
  );
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterFromDB,
};
