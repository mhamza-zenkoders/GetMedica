import {ScrollView, StyleSheet, View} from 'react-native';
import React, { useState } from 'react';
import CustomWrapper from '../../../components/wrappers/CustomWrapper';
import SimpleHeader from '../../../components/header/SimpleHeader';
import {CustomText} from '../../../components/common/CustomText';
import {COLORS} from '../../../utils/theme';
import {CustomButton} from '../../../components/common/CustomButton';
import {useForm} from 'react-hook-form';
import CustomRHFTextInput from '../../../components/common/CustomRHFTextInput';
import {navigate} from '../../../utils/navigation';
import {
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackNavigationType} from '../../../utils/types/navigationType';
import CustomRHFDropDown from '../../../components/common/CustomRHFDropDown/CustomRHFDropDown';
import {TYPEOFSPECIALIZATION} from '../../../utils/constants';
import {RFValue} from 'react-native-responsive-fontsize';
import { useSignupHook } from '../../../utils/hooks/useAuth';

const Signup = () => {
  const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm({ mode: 'onChange' });
  const [loading, setLoading] = useState(false);
  const { params } = useRoute<RouteProp<RootStackNavigationType, 'Login'>>();

  const SignupHandler = async (data: any) => {
    setLoading(true);
    try {
      data.role = params?.role;
      await useSignupHook(data);
    } catch (error) {
      console.error('Signup Error:', error);
    } finally {
      setLoading(false);
    }
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
              rules={{required: 'Password is required',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_-])[A-Za-z\d@$!%*?&#_-]{8,}$/,
                  message: 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a symbol',
                }, 
              }}
              control={control}
              name="password"
              title="Password"
            />
          </View>
          <View>
            <CustomButton
              loading={isSubmitting}
              disabled={isSubmitting}
              title={'Continue'}
              isValid={isValid}
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