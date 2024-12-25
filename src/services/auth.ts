import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {showToast} from '../utils/helpers';

export const signupMutation = (data: any) => {
  auth()
    .createUserWithEmailAndPassword(data?.email, data?.password)
    .then(res => {
      firestore()
        .collection(data.role)
        .doc(res.user.uid)
        .set(
          data.role == 'doctor'
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
        )
        .then(() => {
          console.log('User Created Successfully!');
        })
        .catch(error => {
          showToast({
            message: error.message,
            type: 'error',
            position: 'bottom',
          });
        });
    })
    .catch(error => {
      console.log(error);
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
    });
};

export const logInMutation = async (data: any) => {
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
  auth()
    .signInWithEmailAndPassword(data?.email.trim(), data?.password)
    .then(res => {
      console.log(res.user.uid);
    })
    .catch(error => {
      if (error.code === 'auth/invalid-credential') {
        showToast({
          message: 'Invalid Email Or Password!',
          type: 'error',
          position: 'bottom',
        });
      } else {
        showToast({message: error.message, type: 'error', position: 'bottom'});
      }
    });
};
