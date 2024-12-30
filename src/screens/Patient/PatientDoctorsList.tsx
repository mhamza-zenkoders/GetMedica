import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
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
import CustomSearchInput from '../../components/common/CustomSearchInput/CustomSearchInput';
import DoctorsListContainer from './component/DoctorsListContainer';
import { useDoctorsStore } from '../../store/doctorStore';

const PatientDoctorsList = () => {
  const {user} = useUserStore();
  console.log(user);
  const [specialization, setSpecialization] = React.useState<{
    value: string;
    label: string;
  } | null>(null);


  const [searchText, setSearchText] = React.useState<string>('');

  const {doctors, filteredDoctors, setDoctors, setFilteredDoctors} =
    useDoctorsStore();


  // useEffect(() => {
  //   console.log('spec', specialization);
  //   console.log('search', searchText);
  //   const fetchDoctors = async () => {
  //     try {
  //       const doctors: any = await getDoctorsList();
  //       console.log('Doctors in page:', doctors);
  //       setDoctorsList(doctors);
  //     } catch (error: any) {
  //       console.error('Error fetching doctors:', error.message);
  //     }
  //   };

  //   fetchDoctors();
  // }, [specialization, searchText]);

  useEffect(() => {
      const fetchDoctors = async () => {
        try {
          const fetchedDoctors = await getDoctorsList(specialization);
          setDoctors(fetchedDoctors);
          setFilteredDoctors(fetchedDoctors);
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

  const dropdownData = useMemo(() => {
    return [{ value: 'all', label: 'All' }, ...TYPEOFSPECIALIZATION];
  }, []);

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
        dropdownData={dropdownData}
        dropdownChangeText={setSpecialization}
      />
      <CustomSearchInput
        value={searchText}
        onSubmitEditing={handleSearchSubmit}
      />
      <DoctorsListContainer data={filteredDoctors}/>
    </CustomWrapper>
  );
};

export default PatientDoctorsList;

const styles = StyleSheet.create({});
 

