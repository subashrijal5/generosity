
export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unprocessableEntity = 422,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export enum SemesterEnum {
  first = "first",
  second = "second",
}

export enum WeekDaysEnum {
  monday = "Monday",
  tuesday = "Tuesday",
  wednesday = "Wednesday",
  thursday = "Thursday",
  friday = "Friday",
  saturday = "Saturday",
  sunday = "Sunday",
}

export enum TimeSlotsEnum {
  "6:00" = "6:00 AM",
  "7:00" = "7:00 AM",
  "8:00" = "8:00 AM",
  "9:00" = "9:00 AM",
  "10:00" = "10:00 AM",
  "11:00" = "11:00 AM",
  "12:00" = "12:00 PM",
  "13:00" = "1:00 PM",
  "14:00" = "2:00 PM",
  "15:00" = "3:00 PM",
  "16:00" = "4:00 PM",
  "17:00" = "5:00 PM",
  "18:00" = "6:00 PM",
  "19:00" = "7:00 PM",
  "20:00" = "8:00 PM",
  "21:00" = "9:00 PM",
  "22:00" = "10:00 PM",
}

export enum LectureStatusEnum {
  pending = "pending",
  completed = "completed",
  missed = "missed",
}

export enum EnrollmentStatus {
  pending = "pending",
  enrolled = "enrolled",
  completed = "completed",
  cancelled = "cancelled",
}


export const UserCookieKey  = "user_data";