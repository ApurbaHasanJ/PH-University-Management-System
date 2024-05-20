import Joi from 'joi';
// crating a schema validation using joy

// UserName schema
const studentNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(/^[A-Z][a-z]*$/, 'capitalized format')
    .messages({
      'string.empty': 'Student First name is required',
      'string.max': 'First name cannot be more than 20 characters',
      'string.pattern.name': '{#value} is not in capitalized format',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/, 'alpha')
    .messages({
      'string.empty': 'Student Last name is required',
      'string.pattern.name': '{#value} is not a valid name',
    }),
});

// Guardian schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': 'Father name is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': 'Father contact number is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': 'Father occupation is required',
  }),
  motherName: Joi.string().required().messages({
    'string.empty': 'Mother name is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': 'Mother contact number is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': 'Mother occupation is required',
  }),
});

// LocalGuardian schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Local Guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Local Guardian occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Local Guardian contact number is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Local Guardian address is required',
  }),
});

// Student schema
const studentJoiValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required',
  }),
  name: studentNameValidationSchema.required().messages({
    'object.base': 'Student Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.empty': 'Gender is required',
    'any.only': '{#value} is not a valid gender',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.empty': 'Student email is required',
    'string.email': '{#value} is not a valid email',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Student contact is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Student emergency contact no is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Student present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Student permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local Guardian information is required',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentJoiValidationSchema;
