import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useUserStore} from '../../store/userStore';
import CustomHeader from '../../components/header/CustomHeader';
import CustomWrapper from '../../components/wrappers/CustomWrapper';
import {signOutMutation} from '../../services/auth';
import {COLORS, IMAGES} from '../../utils/theme';
import SecondaryHeaderWithDropdown from '../../components/header/SecondaryHeaderWithDropdown';
import {APPOINTMENTSTATUS} from '../../utils/constants';
import {Calendar} from 'react-native-calendars';

import {getAppointmentsbyMonth} from '../../services/appointment';
import AppointmentsList from '../../components/appointment/AppointmentsList';
import {getUserDetailsFromAppointments} from '../../utils/helpers';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

const DoctorAppointments = () => {
  const {user} = useUserStore();
  const [status, setStatus] = useState<{value: string; label: string}>(
    APPOINTMENTSTATUS[0],
  );
  const [appointments, setAppointments] = useState<any>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleDateString('fr-CA').slice(0, -3),
  );
  const [datesList, setDatesList] = useState<any>([]);
  const handleMonthChange = (month: any) => {
    const newMonth = month.dateString.slice(0, -3);
    setSelectedMonth(newMonth);
  };

  const handleDayChange = (day: any) => {
    const newDate = day.dateString;
    setSelectedDate(newDate);

    const filtered = appointments.filter(
      (appointment: any) => appointment.date === newDate,
    );
    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const fetchedAppointments: any = await getAppointmentsbyMonth(
          user.uid,
          user.role,
          status,
          selectedMonth,
        );
        await Promise.allSettled(
          fetchedAppointments.map(async (item: any) => {
            item.user = await getUserDetailsFromAppointments(item.patientRef);
          }),
        );
        const dates = await fetchedAppointments?.map((item: any) => {
          return item.date;
        });

        setAppointments(fetchedAppointments);
        setFilteredAppointments(fetchedAppointments);
        setDatesList(dates);
      } catch (error: any) {
        console.log('Error Fetching Appointments', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [status, user.id, selectedMonth]);

  return (
    <CustomWrapper>
      <CustomHeader
        title={user.name}
        subtitle="Welcome"
        profilePic={IMAGES.userProfile}
        icon={'logout'}
        iconPress={() => {
          signOutMutation();
        }}
      />
      <SecondaryHeaderWithDropdown
        title={'View Appointments'}
        value={status}
        dropdownData={APPOINTMENTSTATUS}
        dropdownChangeText={setStatus}
      />

      <AppointmentsList
        loading={loading}
        data={filteredAppointments}
        renderHeader={
          <Calendar
            style={styles.calendar}
            onDayPress={(day: any) => handleDayChange(day)}
            onMonthChange={handleMonthChange}
            markedDates={datesList.reduce(
              (acc: any, date: string) => {
                acc[date] = {
                  marked: true,
                  selectedDotColor: 'blue',
                };
                return acc;
              },
              {
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'blue',
                },
              },
            )}
          />
        }
      />
    </CustomWrapper>
  );
};

export default DoctorAppointments;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    borderRadius: RFValue(10),
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey20,
    marginBottom:heightPercentageToDP(1),
    paddingBottom:heightPercentageToDP(0.5),
  },
});
