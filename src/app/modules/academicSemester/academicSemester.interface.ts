export type TSemesters = 'Autumn' | 'Summer' | 'Fall';

export type TSemesterCodes = '01' | '02' | '03';

export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemester = {
  name: TSemesters;
  code: TSemesterCodes;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};
