import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomWrapper from '../../components/wrappers/CustomWrapper';
import CustomHeader from '../../components/header/CustomHeader';
import SecondaryHeaderWithDropdown from '../../components/header/SecondaryHeaderWithDropdown';
import {signOutMutation} from '../../services/auth';
import {COLORS, IMAGES} from '../../utils/theme';
import {useUserStore} from '../../store/userStore';
import {APPOINTMENTSTATUS} from '../../utils/constants';
import AppointmentsList from '../../components/appointment/AppointmentsList';
import {getAppointmentByPatient} from '../../services/appointment';
import {ActivityIndicator} from 'react-native';

const PatientAppointments = () => {
  const {user} = useUserStore();
  const [status, setStatus] = useState<{value: string; label: string}>(
    APPOINTMENTSTATUS[0],
  );
  const [appointments, setAppointments] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const fetchedAppointments = await getAppointmentByPatient(
          user.uid,
          status,
        );
        setAppointments(fetchedAppointments);
      } catch (error: any) {
        console.log('Error Fetching Appointments', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [status, user.id]);

  return (
    <CustomWrapper>
      <CustomHeader
        title={user.name}
        subtitle="Welcome"
        profilePic={IMAGES.userProfile}
        icon={'logout'}
        iconPress={signOutMutation}
      />
      <SecondaryHeaderWithDropdown
        title={'View Appointments'}
        value={status}
        dropdownData={APPOINTMENTSTATUS}
        dropdownChangeText={setStatus}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <AppointmentsList data={appointments} />
      )}
    </CustomWrapper>
  );
};

export default PatientAppointments;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
