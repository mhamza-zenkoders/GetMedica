import firestore from '@react-native-firebase/firestore';
import {showToast} from '../utils/helpers';

export const getTimeSchedule = async (userId: string, scheduleId: string) => {
  try {
    const timingDoc = await firestore()
      .collection('users')
      .doc(userId)
      .collection('timeSchedule')
      .doc(scheduleId)
      .get();
    return {success: true, availability: timingDoc.data()};
  } catch (error: any) {
    console.log(error);
    return {success: false, error: error.message};
  }
};

export const setTimeScheduleInFirebase = async (
  userId: string,
  availabilityData: any[],
) => {
  try {
    for (const item of availabilityData) {
      if (item.startTime === 'NaN:NaN' || item.endTime === 'NaN:NaN') {
        return showToast({
          message: 'Start time or End time cannot be NaN.',
          type: 'success',
          position: 'bottom',
        });
      }
    }

    const timeScheduleRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('timeSchedule')
      .doc();

    await timeScheduleRef.set({
      timings: availabilityData,
      createdAt: new Date().toLocaleString(),
    });

    await firestore().collection('users').doc(userId).update({
      timingID: timeScheduleRef.id,
    });

    return {success: true, timingID: timeScheduleRef.id};
  } catch (error: any) {
    console.log('Error Seeting Time Schedule:', error);
    return {success: false, error: error.message};
  }
};

export const getDoctorsList = async (
  specialization?: {value: string; label: string} | null,
) => {
  try {
    let doctorCollectionRef = firestore()
      .collection('users')
      .where('timingID', '!=', null);
    if (specialization && specialization.value !== 'all') {
      doctorCollectionRef = doctorCollectionRef.where(
        'specialization',
        '==',
        specialization.value,
      );
    }

    const snapshot = await doctorCollectionRef.get();

    if (!snapshot.empty) {
      const doctorsWithTiming = await Promise.all(
        snapshot.docs.map(async doc => {
          const userData = doc.data();
          const timingID = userData.timingID;

          const timeScheduleDoc = await firestore()
            .collection('users')
            .doc(doc.id)
            .collection('timeSchedule')
            .doc(timingID)
            .get();

          const timeScheduleData = timeScheduleDoc.exists
            ? timeScheduleDoc.data()
            : null;

          const availableDays = timeScheduleData?.timings
            ? [
                ...new Set(
                  timeScheduleData.timings.map((item: any) => item.day),
                ),
              ]
            : [];

          return {
            id: doc.id,
            ...userData,
            timeSchedule: {
              ...timeScheduleData,
              availableDays,
            },
          };
        }),
      );
      return doctorsWithTiming;
    } else {
      showToast({
        message: 'No doctors found with available timings.',
        type: 'info',
        position: 'bottom',
      });
      return [];
    }
  } catch (error: any) {
    console.log(error);
    showToast({
      message: error.message,
      type: 'error',
      position: 'bottom',
    });
    return [];
  }
};