import { z } from 'zod';
import { AcademicSemesters, Months } from './academicSemester.const';

// Define the AcademicSemester schema using Zod
const createAcademicSemesterSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesters] as [string, ...string[]]),
    code: z.enum(['01', '02', '03']),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesters] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum(['01', '02', '03']).optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
});
export const AcademicSemesterValidation = {
  createAcademicSemesterSchema,
  updateAcademicSemesterValidationSchema
};
