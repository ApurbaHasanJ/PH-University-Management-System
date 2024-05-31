import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesters,
  Months,
  SemesterCodes,
} from './academicSemester.const';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesters,
      required: true,
    },
    code: {
      type: String,
      enum: SemesterCodes,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// avoiding existing semester creation

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester already exists');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
