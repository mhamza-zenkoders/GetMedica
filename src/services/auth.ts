import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showToast} from '../utils/helpers';
import {useUserStore} from '../store/userStore';
import {navigateReset} from '../utils/navigation';

export const signupMutation = async (data: any) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(
      data?.email,
      data?.password,
    );
    try {
      await firestore()
        .collection(data.role)
        .doc(res.user.uid)
        .set(
          data.role === 'doctor'
            ? {
                email: data?.email,
                name: data?.name,
                role: data?.role,
                specialization: data?.specialization.value,
              }
            : {
                email: data?.email,
                name: data?.name,
                role: data?.role,
              },
        );

      console.log('User Created Successfully!');
      const setUser = useUserStore.getState().setUser;
      setUser({
        uid: res.user.uid,
        email: data?.email,
        name: data?.name,
        role: data?.role,
        ...(data.role === 'doctor' && {
          specialization: data?.specialization.value,
        }),
      });
      return data.role == 'doctor'?  navigateReset('DoctorNavigator'): navigateReset('PatientNavigator');

    } catch (error: any) {
      showToast({
        message: error.message,
        type: 'error',
        position: 'bottom',
      });
    }
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      showToast({
        message: 'Email Address Is Already In Use!',
        type: 'error',
        position: 'bottom',
      });
    } else if (error.code === 'auth/invalid-email') {
      showToast({
        message: 'Email Address Is Invalid!',
        type: 'error',
        position: 'bottom',
      });
    } else if (error.code === 'auth/weak-password') {
      showToast({
        message: 'Password Must Be 6 Characters Long!',
        type: 'error',
        position: 'bottom',
      });
    } else {
      showToast({
        message: 'Something Went Wrong!',
        type: 'error',
        position: 'bottom',
      });
    }
  }
};

export const logInMutation = async (data: any) => {
  try {
    const roleResponse = await firestore()
      .collection(data?.role)
      .where('email', '==', data.email)
      .get();

    if (roleResponse.empty) {
      return showToast({
        message: "Account Doesn't Exist!",
        type: 'error',
        position: 'bottom',
      });
    }

    try {
      const res = await auth().signInWithEmailAndPassword(
        data?.email.trim(),
        data?.password,
      );
      console.log(res.user.uid);

      const userDoc = await firestore()
        .collection(data?.role)
        .doc(res.user.uid)
        .get();

      if (!userDoc.exists) {
        return showToast({
          message: 'User data not found!',
          type: 'error',
          position: 'bottom',
        });
      }

      const userData = userDoc.data();

      const setUser = useUserStore.getState().setUser;
      setUser({
        uid: res.user.uid,
        email: userData?.email,
        name: userData?.name,
        role: userData?.role,
        ...(userData?.specialization && {
          specialization: userData.specialization,
        }),
      });

      return data.role == 'doctor'?  navigateReset('DoctorNavigator'): navigateReset('PatientNavigator');
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        showToast({
          message: 'Invalid Email Or Password!',
          type: 'error',
          position: 'bottom',
        });
      } else {
        showToast({message: error.message, type: 'error', position: 'bottom'});
      }
    }
  } catch (error: any) {
    showToast({
      message: 'Error validating account role!',
      type: 'error',
      position: 'bottom',
    });
  }
};
