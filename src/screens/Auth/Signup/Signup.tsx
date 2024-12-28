import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomWrapper from '../../../components/wrappers/CustomWrapper';
import SimpleHeader from '../../../components/header/SimpleHeader';
import {CustomText} from '../../../components/common/CustomText';
import {COLORS} from '../../../utils/theme';
import {CustomButton} from '../../../components/common/CustomButton';
import {useForm} from 'react-hook-form';
import CustomRHFTextInput from '../../../components/common/CustomRHFTextInput';
import {navigate, navigateReset} from '../../../utils/navigation';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackNavigationType} from '../../../utils/types/navigationType';
import CustomRHFDropDown from '../../../components/common/CustomRHFDropDown/CustomRHFDropDown';
import {TYPEOFSPECIALIZATION} from '../../../utils/constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {signupMutation} from '../../../services/auth';
import {showToast} from '../../../utils/helpers';
import { useUserStore } from '../../../store/userStore';

const Signup = () => {
  const {control, handleSubmit} = useForm({
    // defaultValues: {email: 'hhhh@yopmail.com', password: 'Karachi123+'},
  });
  const {params} = useRoute<RouteProp<RootStackNavigationType, 'Login'>>();

  const SignupHandler = async (data: any) => {
    console.log(data);
    data.role = params?.role;
    const res = await signupMutation(data);
    console.log(res);
    if (!res.success) {
      showToast({
        type: 'error',
        message: res.error,
        position: 'bottom',
      });
      return;
    }
    showToast({message: 'User created successfully!', position: 'bottom'});
    const setUser = useUserStore.getState().setUser;
    setUser({
      uid: res.uid,
      email: data?.email,
      name: data?.name,
      role: data?.role,
      ...(data.role === 'doctor' && {
        specialization: data?.specialization.value,
      }),
    });
    return data.role == 'doctor'
      ? navigateReset('DoctorNavigator')
      : navigateReset('PatientNavigator');
  };

  return (
    <CustomWrapper>
      <SimpleHeader>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <CustomText
              fontWeight="600"
              fontSize="S28"
              children={'Sign Up'}
              color={COLORS.NeutralGrey100}
              textStyle={styles.title}
            />
            <CustomRHFTextInput
              placeholder="Enter Name"
              requiredStar
              control={control}
              rules={{
                required: 'Name is Required',
              }}
              name="name"
              title="Name"
            />
            <CustomRHFTextInput
              placeholder="Enter Email Address"
              requiredStar
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              }}
              name="email"
              title="Email"
            />
            {params?.role == 'doctor' ? (
              <CustomRHFDropDown
                name="specialization"
                label="Specialization"
                required
                onChangeValue={() => {
                  // setValue('fieldOfPractice', null);
                  // setValue('typeOfPractice');
                }}
                control={control}
                rules={{required: 'Type of Practice is required'}}
                data={TYPEOFSPECIALIZATION}
              />
            ) : (
              <></>
            )}

            <CustomRHFTextInput
              secureTextEntry
              placeholder="Enter Password"
              requiredStar
              rules={{required: 'Password is required'}}
              control={control}
              name="password"
              title="Password"
            />
          </View>
          <View>
            <CustomButton
              // loading={}
              title={'Continue'}
              onPress={handleSubmit(SignupHandler)}
            />
            <CustomText
              center
              fontWeight="400"
              fontSize="S14"
              color={COLORS.NeutralGrey60}
              textStyle={styles.subtitleText}
              children={
                <>
                  Already have an account?
                  <CustomText
                    underline
                    fontWeight="600"
                    fontSize="S14"
                    color={COLORS.primary}
                    children={' Log in'}
                    onPress={() => navigate('Login', {role: params?.role})}
                  />
                </>
              }
            />
          </View>
        </ScrollView>
      </SimpleHeader>
    </CustomWrapper>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    gap: heightPercentageToDP(1),
    flex: 1,
  },
  title: {
    marginBottom: heightPercentageToDP(1.5),
  },
  subtitleText: {
    marginVertical: heightPercentageToDP(1.5),
  },
  highlightedSubtitleText: {
    paddingHorizontal: 40,
  },

  titleTextStyle: {
    fontSize: RFValue(13),
  },
});
