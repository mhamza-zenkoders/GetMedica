import firestore from '@react-native-firebase/firestore';
import {showToast} from '../utils/helpers';

export const availabilityMutation2 = async (
  availabilityData: any[],
  userId: string,
) => {
  try {
    for (const item of availabilityData) {
      if (item.startTime === 'NaN:NaN' || item.endTime === 'NaN:NaN') {
        throw new Error(
          'Invalid availability: Start time or End time cannot be NaN.',
        );
      }
    }

    const doctorDocRef = firestore().collection('doctor').doc(userId);
    const doctorSnapshot = await doctorDocRef.get();

    if (doctorSnapshot.exists) {
      await firestore().collection('doctor').doc(userId).update({
        availability: availabilityData,
      });
      showToast({
        message: 'Availability updated successfully!',
        type: 'success',
        position: 'bottom',
      });
    } else {
      throw new Error('Doctor not found.');
    }
  } catch (error: any) {
    showToast({
      message: error.message,
      type: 'error',
      position: 'bottom',
    });
  }
};

export const getTimeSchedule = async (userId:string,scheduleId:string)=>{
  try{
    const timingDoc = await firestore().collection('users').doc(userId)
    .collection('timeSchedule').doc(scheduleId).get();
    return {success:true,availability: timingDoc.data()}
  }
  catch(error:any){
    console.log(error);
    return {success:false,error: error.message}
  }
}

export const setTimeScheduleInFirebase = async (userId:string,availabilityData: any[])=>{
  try{
    for (const item of availabilityData) {
      if (item.startTime === 'NaN:NaN' || item.endTime === 'NaN:NaN') {
        return  showToast({
          message: "Invalid availability: Start time or End time cannot be NaN.",
          type: 'error',
          position: 'bottom',
        });
      }
    }

    const timeScheduleRef = firestore().collection('users').doc(userId).collection('timeSchedule').doc();

    await timeScheduleRef.set({
    timings: availabilityData,
    createdAt: new Date().toLocaleString(),
    });

    await firestore().collection('users').doc(userId).update({
      currentTiming:timeScheduleRef.id
    })
    return {success:true, scheduleId:timeScheduleRef.id}
  }
  catch(error:any){
    console.log(error);
    return {success:false,error: error.message}
  }
}

export const getDoctorsList = async () => {
  try {
    const doctorCollectionRef = firestore()
      .collection('users')
      .where('currentTiming', '!=', null);

    const snapshot = await doctorCollectionRef.get();

    if (!snapshot.empty) {
      const doctors = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Doctors List: Fetched with currentTiming');
      return doctors;
    } else {
      showToast({
        message: 'No doctors found with available timings.',
        type: 'info',
        position: 'bottom',
      });
      return [];
    }
  } catch (error: any) {
    showToast({
      message: error.message,
      type: 'error',
      position: 'bottom',
    });
  }
};