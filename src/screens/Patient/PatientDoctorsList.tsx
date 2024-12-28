import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import CustomWrapper from '../../components/wrappers/CustomWrapper';
import DesignHeader from '../../components/header/DesignHeader';
import {useUserStore} from '../../store/userStore';
import CustomHeader from '../../components/header/CustomHeader';
import {IMAGES} from '../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import SecondaryHeaderWithDropdown from '../../components/header/SecondaryHeaderWithDropdown';
import {TYPEOFSPECIALIZATION} from '../../utils/constants';
import {getDoctorsList} from '../../services/doctor';
import {signOutMutation} from '../../services/auth';
import CustomSearchInput from '../../components/common/CustomSeachInput/CustomSearchInput';
import DoctorsListContainer from './component/DoctorsListContainer';

const PatientDoctorsList = () => {
  const {user} = useUserStore();
  console.log(user);
  const [doctorsList, setDoctorsList] = React.useState([]);
  const [specialization, setSpecialization] = React.useState<{
    value: string;
    label: string;
  }>(TYPEOFSPECIALIZATION[0]);
  const [searchText, setSearchText] = React.useState<string>('');

  useEffect(() => {
    console.log('spec', specialization);
    console.log('search', searchText);
    const fetchDoctors = async () => {
      try {
        const doctors: any = await getDoctorsList();
        console.log('Doctors in page:', doctors);
        setDoctorsList(doctors);
      } catch (error: any) {
        console.error('Error fetching doctors:', error.message);
      }
    };

    fetchDoctors();
  }, [specialization, searchText]);

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
        dropdownData={TYPEOFSPECIALIZATION}
        dropdownChangeText={setSpecialization}
      />
      <CustomSearchInput
        value={searchText}
        onSubmitEditing={handleSearchSubmit}
      />
      <DoctorsListContainer data={doctorsList}/>
    </CustomWrapper>
  );
};

export default PatientDoctorsList;

const styles = StyleSheet.create({});
