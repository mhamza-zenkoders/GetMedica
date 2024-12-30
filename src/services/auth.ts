import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useUserStore } from '../store/userStore';
import { showToast } from '../utils/helpers';
import { navigateReset } from '../utils/navigation';


export const signupMutation = async (data: any) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(data.email, data.password);

    await firestore()
      .collection('users')
      .doc(res.user.uid)
      .set({
        email: data.email,
        name: data.name,
        role: data.role,
        ...(data.role === 'doctor' && { specialization: data.specialization?.value }),
      });

    return { success: true, uid: res.user.uid };
  } catch (error: any) {
    let errorMessage = 'An error occurred during Signup!';

    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email address is already in use!';
    } else {
      errorMessage = error.message || errorMessage;
    }

    return { success: false, error: errorMessage };
  }
};


export const loginMutation = async (data:any) => {
  try {
    const res = await auth().signInWithEmailAndPassword(
      data?.email.trim(),
      data?.password
    );

    const userDoc = await firestore().collection("users").doc(res.user.uid).get();

    if (!userDoc.exists) {
      console.log("User document does not exist");
    }

    return {
      success: true,
      user: userDoc.data(),
      id: res.user.uid,
    };
  } catch (error: any) {
    let errorMessage = 'An error occurred during login!';

    if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Incorrect Email or Password!';
    } else {
      errorMessage = error.message || errorMessage;
    }

    return { success: false, error: errorMessage };
  }
};

export const signOutMutation = async () => {
  try {

    await auth().signOut();
    const resetUser = useUserStore.getState().setUser;
    resetUser(null);
    return navigateReset('SelectRole'); 

  } catch (error: any) {
    console.error('Error during sign-out', error);
    showToast({ type: "error", message: "Something went wrong while signing out", position: 'bottom' });
  }
};