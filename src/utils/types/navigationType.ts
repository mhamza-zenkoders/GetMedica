import {RoleType, ScreenType} from './componentType';

export type RootStackNavigationType = {
  SelectRole: undefined;
  Login: {role: RoleType};
  Signup: {role: RoleType};
  PatientHome: undefined;
  DoctorNavigator: undefined;
  PatientNavigator: undefined;
  PatientDoctorsList: undefined;
  PatientBookAppointment: {doctorIndex: number};
  PatientAppointments: undefined;
};

export type PatientStackNavigationType = {
  PatientDoctorsList: undefined;
  PatientBookAppointment: undefined;
};

export type PatientBottomTabNavigatorTypes = {
  PatientHome: undefined;
  PatientAppointment: undefined;
};