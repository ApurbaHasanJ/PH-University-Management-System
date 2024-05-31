import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

// available department can't be create again
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND,`${this.name} already exists`);
  }
  next();
});


// solving not available id update data
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery(); //get the query id here {id: ruq3j9j874q3q}

  const isDepartmentExist = await AcademicDepartment.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, `This department do not exist!`);
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
