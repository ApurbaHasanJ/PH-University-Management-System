import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

// 2. Create a Schema corresponding to the document interface.
const studentNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'Student First name is required'],
    maxlength: [20, 'First name can not be more than 20 characters'],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Sutudent Last name is required'],
  },
});

const guardianSchema = new Schema<Guardian>({
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

const localGuardianSchema = new Schema<LocalGuardian>({
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

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: studentNameSchema,
    required: [true, 'Student Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not a valid gender',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Student email is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Student contact is required'],
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
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

// 3. Create a Model.
export const StudentModel = model<Student>('Student', studentSchema);
