import { Schema, model } from 'mongoose';
// import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  TUserName,
  StudentModel,
} from './student.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// 2. Create a Schema corresponding to the document interface.
const studentNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true, // to avoiding spaces x axis
    required: [true, 'Student First name is required'],
    maxlength: [20, 'First name can not be more than 20 characters'],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Sutudent Last name is required'],
  },
});

// guardian schema validation
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
});

// Local guardian schema validation
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: studentNameSchema,
      required: [true, 'Student Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Student email is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: true,
    },
    dateOfBirth: { type: Date },
    contactNo: {
      type: String,
      required: [true, 'Student contact is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact no is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Student present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Student permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Student Name is required'],
    },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  // for on vertual
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// mongoose virtual show non existing fields
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

studentSchema.pre('save', async function (next) {
  const isStudentExist = await Student.findOne({ id: this.id });
  if (!isStudentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student do not exist');
  }
  next();
});

// mongoose query middleware
studentSchema.pre('find', function (next) {
  // for avoiding soft deleted data in find
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('findOne', async function (next) {
  // for avoiding soft deleted data in findOne
  this.find({ isDeleted: { $ne: true } });

  next();
});
studentSchema.pre('aggregate', async function (next) {
  // for avoiding soft deleted data in findOne
  // console.log(this.pipeline()); // [ { '$match': { id: '123456' } } ]

  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});


// creating a coustom instance method
// studentSchema.methods.isUserExists = async (id: string) => {
//   const existingUser = await Student.findOne({ id });
//   return existingUser
// };

// creating a coustom static method
studentSchema.statics.isUserExists = async (id: string) => {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

// 3. Create a Model.
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
