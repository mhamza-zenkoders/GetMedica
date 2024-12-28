import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useUserStore } from '../store/userStore';
import { showToast } from '../utils/helpers';
import { navigateReset } from '../utils/navigation';


export const signupMutation = async (data: any) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(data?.email, data?.password);
    await firestore()
    .collection("users")
    .doc(res.user.uid)
    .set(
      {
        email: data?.email,
        name: data?.name,
        role: data?.role,
        ...(data?.role === 'doctor' && { specialization: data?.specialization?.value })
      }
    );
   return {success:true,uid:res.user.uid};
  } catch (error:any) {

    console.error('Error during signup', error.message);
    return { success: false, error: error.message}; 
  }
};

export const loginMutation = async (data: any) => {
  try {
    const res = await auth().signInWithEmailAndPassword(data?.email.trim(), data?.password);
    const userDoc = await firestore()
      .collection('users')
      .doc(res.user.uid)
      .get();
    return {success:true, user:userDoc.data(), id: res.user.uid}
  } catch (error:any) {
    console.error('Error Loging In!', error);
    return {success:false,error}
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