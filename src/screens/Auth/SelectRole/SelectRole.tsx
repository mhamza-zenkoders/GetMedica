import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomText} from '../../../components/common/CustomText';
import {COLORS, IMAGES} from '../../../utils/theme';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CustomWrapper from '../../../components/wrappers/CustomWrapper';
import RoleContainer from './components/RoleContainer';
import {RoleType} from '../../../utils/types/componentType';
import {CustomButton} from '../../../components/common/CustomButton';
import {navigate} from '../../../utils/navigation';
import SimpleHeader from '../../../components/header/SimpleHeader';

const SelectRole = ({navigation}: any) => {
  const [title, setTitle] = useState<RoleType>('doctor');

  return (
    <CustomWrapper>
      <View style={styles.container}>
        <CustomText
          center
          fontWeight="600"
          fontSize="S28"
          children={'Select Your Role'}
          color={COLORS.NeutralGrey100}
        />
        <CustomText
          center
          children={'Tell us how you’d like to use the app'}
          fontSize="S16"
          color={COLORS.NeutralGrey60}
        />
        <RoleContainer
          title="doctor"
          image={IMAGES.doctor}
          selectedItem={title == 'doctor'}
          onPress={text => setTitle(text)}
        />
        <RoleContainer
          title="patient"
          image={IMAGES.patient}
          selectedItem={title == 'patient'}
          onPress={text => setTitle(text)}
        />
      </View>
      <CustomButton
        title={'Continue'}
        containerStyle={styles.button}
        onPress={() => navigate('Login', {role: title})}
      />
    </CustomWrapper>
  );
};

export default SelectRole;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: widthPercentageToDP(4),
    marginBottom: heightPercentageToDP(2),
  },
});
