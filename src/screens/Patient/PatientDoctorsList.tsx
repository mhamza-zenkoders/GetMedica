import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import CustomWrapper from '../../components/wrappers/CustomWrapper';
import DesignHeader from '../../components/header/DesignHeader';
import {useUserStore} from '../../store/userStore';
import CustomHeader from '../../components/header/CustomHeader';
import {COLORS, IMAGES} from '../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import SecondaryHeaderWithDropdown from '../../components/header/SecondaryHeaderWithDropdown';
import {TYPEOFSPECIALIZATION} from '../../utils/constants';
import {getDoctorsList} from '../../services/doctor';
import {signOutMutation} from '../../services/auth';
import CustomSearchInput from '../../components/common/CustomSearchInput/CustomSearchInput';
import DoctorsListContainer from './component/DoctorsListContainer';
import {useDoctorsStore} from '../../store/doctorStore';

const PatientDoctorsList = () => {
  const {user} = useUserStore();
  const [loading, setLoading] = React.useState(true);
  const dropdownData = useMemo(() => {
    return [{value: 'all', label: 'All'}, ...TYPEOFSPECIALIZATION];
  }, []);
  const [specialization, setSpecialization] = React.useState<{
    value: string;
    label: string;
  }>(dropdownData[0]);

  const [searchText, setSearchText] = React.useState<string>('');

  const {doctors, filteredDoctors, setDoctors, setFilteredDoctors} =
    useDoctorsStore();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const fetchedDoctors = await getDoctorsList(specialization);
        setDoctors(fetchedDoctors);
        setFilteredDoctors(fetchedDoctors);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching doctors:', error.message);
      }
    };

    fetchDoctors();
  }, [specialization]);

  useEffect(() => {
    const searchFilteredDoctors = doctors.filter((doctor: any) =>
      doctor.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredDoctors(searchFilteredDoctors);
  }, [searchText, doctors]);

  const handleSearchSubmit = (e: any) => {
    setSearchText(e.nativeEvent.text);
  };



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
        title={'Doctors Listing'}
        value={specialization}
        dropdownData={dropdownData}
        dropdownChangeText={setSpecialization}
      />
      <CustomSearchInput
        value={searchText}
        onSubmitEditing={handleSearchSubmit}
      />
      {loading ? (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <DoctorsListContainer data={filteredDoctors} />
      )}
    </CustomWrapper>
  );
};

export default PatientDoctorsList;

const styles = StyleSheet.create({loaderStyle:{
  alignItems:'center',
  justifyContent:'center',
  flex:1,
}});
