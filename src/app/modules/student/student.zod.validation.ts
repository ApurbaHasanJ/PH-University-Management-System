import { z } from 'zod';

// UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name cannot be more than 20 characters')
    .min(1, 'Student First name is required'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, 'Student Last name is required')
    .regex(/^[A-Za-z]+$/, 'Last name is not a valid name'),
});

// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherContactNo: z.string().min(1, 'Father contact number is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  motherContactNo: z.string().min(1, 'Mother contact number is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
});

// LocalGuardian schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local Guardian name is required'),
  occupation: z.string().min(1, 'Local Guardian occupation is required'),
  contactNo: z.string().min(1, 'Local Guardian contact number is required'),
  address: z.string().min(1, 'Local Guardian address is required'),
});

// Student schema
const studentZodValidatioSchema = z.object({
  id: z.string().min(1, 'Student ID is required'),
  name: userNameValidationSchema,
  email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Student email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
    invalid_type_error: 'Gender must be either male, female, or other',
  }),
  dateOfBirth: z.string().optional(),
  contactNo: z.string().min(1, 'Student contact is required'),
  emergencyContactNo: z.string().min(1, 'Emergency contact number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1, 'Student present address is required'),
  permanentAddress: z.string().min(1, 'Student permanent address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false),
});

export default studentZodValidatioSchema;
