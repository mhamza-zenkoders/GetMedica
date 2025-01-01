import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useUserStore} from '../../store/userStore';
import CustomHeader from '../../components/header/CustomHeader';
import CustomWrapper from '../../components/wrappers/CustomWrapper';
import {signOutMutation} from '../../services/auth';
import {COLORS, IMAGES} from '../../utils/theme';
import SecondaryHeaderWithDropdown from '../../components/header/SecondaryHeaderWithDropdown';
import {APPOINTMENTSTATUS} from '../../utils/constants';
import {
  getAppointmentByDoctor,
  updateAppointmentStatus,
} from '../../services/appointment';
import AppointmentsList from '../../components/appointment/AppointmentsList';
import {set} from 'react-hook-form';

const DoctorAppointments = () => {
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
        const fetchedAppointments = await getAppointmentByDoctor(
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

  const handleStatusChange = (id: string, status: string) => {
    updateAppointmentStatus(id, status);
   { status == 'approved' ?  setStatus(APPOINTMENTSTATUS[2]):setStatus(APPOINTMENTSTATUS[3]);}
  };

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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <AppointmentsList
          data={appointments}
          handleStatusChange={handleStatusChange}
        />
      )}
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
});
