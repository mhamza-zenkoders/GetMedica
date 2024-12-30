import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
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
import { useLoginHook } from '../../../utils/hooks/useAuth';

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onChange' });
  const { params } = useRoute<RouteProp<RootStackNavigationType, "Login">>();

  const LoginHandler = async (data:any) => {
    data.role = params?.role;
    await useLoginHook(data);
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
              children={'Login'}
              color={COLORS.NeutralGrey100}
              textStyle={styles.title}
            />

            <CustomRHFTextInput
              placeholder="Enter Email Address"
              requiredStar
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid Email Address',
                },
              }}
              name="email"
              title="Email"
            />

            <CustomRHFTextInput
              secureTextEntry
              placeholder="Enter Password"
              requiredStar
              rules={{required: 'Password is Required',               
              }}
              control={control}
              name="password"
              title="Password"
            />
            <CustomText
              underline
              textStyle={{textAlign: 'right'}}
              onPress={() => {}}
              fontWeight="600"
              fontSize="S13"
              children="Forgot Password?"
              color={COLORS.primary}
            />
          </View>
          <View>
          <CustomButton
              loading={isSubmitting}
              isValid={isValid}
              disabled={isSubmitting}
              title={"Continue"}
              onPress={handleSubmit(LoginHandler)}
            />
            <CustomText
              center
              fontWeight="400"
              fontSize="S14"
              color={COLORS.NeutralGrey60}
              textStyle={styles.subtitleText}
              children={
                <>
                  Don't have an account?
                  <CustomText
                    underline
                    fontWeight="600"
                    fontSize="S14"
                    color={COLORS.primary}
                    children={' Sign Up'}
                    onPress={() => navigate('Signup', {role: params?.role})}
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

export default Login;

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
});
function getTimeScheduleFromFirebase(arg0: any, currentTime: any) {
  throw new Error('Function not implemented.');
}