export type RoleType = 'doctor' | 'patient' | undefined;
export type ScreenType = 'Signup' | 'ForgotPassword' | 'Login';

export type DropDownType = {
  label: string;
  value: any;
};

export type ImageObjectType = {
  name: string;
  uri: string;
  type: 'image/jpeg' | 'pdf' | 'application/pdf';
};
export type DaySchedule = {
  is24Hours: boolean;
  startTime: Date | string | undefined;
  endTime: Date | string | undefined;
};

export type WeeklySchedule = {
  [day in Day]?: DaySchedule[];
};

export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';
