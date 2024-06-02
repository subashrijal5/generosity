export enum Role {
  Admin = 'admin',
  Student = 'student',
}

export enum ErrorTypes {
  ValidationError = 'ValidationError',
  NotFoundError = 'NotFoundError',
  UnauthorizedError = 'UnauthorizedError',
  ForbiddenError = 'ForbiddenError',
  InternalServerError = 'InternalServerError',
  TokenExpiredError = 'TokenExpiredError',
  JsonWebTokenError = 'JsonWebTokenError',
}
export enum SemesterEnum {
  first = 'first',
  second = 'second',
}

export enum WeekDaysEnum {
  monday = 'Monday',
  tuesday = 'Tuesday',
  wednesday = 'Wednesday',
  thursday = 'Thursday',
  friday = 'Friday',
  saturday = 'Saturday',
  sunday = 'Sunday',
}

export enum TimeSlotsEnum {
  '6:00' = '6:00 AM',
  '7:00' = '7:00 AM',
  '8:00' = '8:00 AM',
  '9:00' = '9:00 AM',
  '10:00' = '10:00 AM',
  '11:00' = '11:00 AM',
  '12:00' = '12:00 PM',
  '13:00' = '1:00 PM',
  '14:00' = '2:00 PM',
  '15:00' = '3:00 PM',
  '16:00' = '4:00 PM',
  '17:00' = '5:00 PM',
  '18:00' = '6:00 PM',
  '19:00' = '7:00 PM',
  '20:00' = '8:00 PM',
  '21:00' = '9:00 PM',
  '22:00' = '10:00 PM',
}
