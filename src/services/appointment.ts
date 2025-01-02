import firestore from '@react-native-firebase/firestore';
import {showToast} from '../utils/helpers';

import {addMinutesToTime} from '../utils/helpers';

export const bookAppointment = async (data: any) => {
  try {
    const endTime = addMinutesToTime(data.time, 30);
    const appointmentRef = firestore().collection('appointments').doc();
    await appointmentRef.set({
      createdAt: new Date().toLocaleString(),
      startTime: data.time,
      endTime: endTime,
      date: data.date,
      day: data.day,
      reason: data.reason,
      patientID: data.patientID,
      patientRef: firestore().collection('users').doc(data.patientID),
      doctorID: data.doctorID,
      doctorRef: firestore().collection('users').doc(data.doctorID),
      status: 'pending',
    });
    return {success: true, appointmentID: appointmentRef.id};
  } catch (error: any) {
    console.log('Error Booking Appointment in Firebase:', error);
    return {success: false, error: error.message};
  }
};

export const getAppointmentByPatient = async (
  patientID: string,
  status?: {value: string; label: string},
) => {
  try {
    let appointmentRef = firestore()
      .collection('appointments')
      .where('patientID', '==', patientID);

    if (status && status.value !== 'all') {
      appointmentRef = appointmentRef.where('status', '==', status.value);
    }
    const appointmentDoc = await appointmentRef.get();
    if (!appointmentDoc.empty) {
      const appointments = appointmentDoc.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return appointments;
    } else {
      showToast({
        message: 'No Appointments Found',
        type: 'info',
        position: 'bottom',
      });
      return [];
    }
  } catch (error) {
    console.error('Error Fetching Appointments:', error);
    showToast({
      message: 'Failed to Fetch Appointments.',
      type: 'error',
      position: 'bottom',
    });
  }
};

export const getAppointmentByDoctor = async (
  doctorID: string,
  status?: {value: string; label: string},
) => {
  try {
    let appointmentRef = firestore()
      .collection('appointments')
      .where('doctorID', '==', doctorID);

    if (status && status.value !== 'all') {
      appointmentRef = appointmentRef.where('status', '==', status.value);
    }
    const appointmentDoc = await appointmentRef.get();
    if (!appointmentDoc.empty) {
      const appointments = appointmentDoc.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return appointments;
    } else {
      showToast({
        message: 'No Appointments Found',
        type: 'info',
        position: 'bottom',
      });
      return [];
    }
  } catch (error) {
    console.error('Error Fetching Appointments:', error);
    showToast({
      message: 'Failed to Fetch Appointments.',
      type: 'error',
      position: 'bottom',
    });
  }
};

export const getAppointments = async (
  id: string,
  role: string,
  status?: {value: string; label: string},
) => {
  try {
    let appointmentRef;
    if (role == 'doctor') {
      appointmentRef = firestore()
        .collection('appointments')
        .where('doctorID', '==', id);
    } else {
      appointmentRef = firestore()
        .collection('appointments')
        .where('patientID', '==', id);
    }
    if (status && status.value !== 'all') {
      appointmentRef = appointmentRef.where('status', '==', status.value);
    }
    const appointmentDoc = await appointmentRef.get();
    if (!appointmentDoc.empty) {
      const appointments = appointmentDoc.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return appointments;
    } else {
      showToast({
        message: 'No Appointments Found',
        type: 'info',
        position: 'bottom',
      });
      return [];
    }
  } catch (error) {
    console.error('Error Fetching Appointments:', error);
    showToast({
      message: 'Failed to Fetch Appointments.',
      type: 'error',
      position: 'bottom',
    });
  }
};

export const getAppointmentsbyMonth = async (
  id: string,
  role: string,
  status?: {value: string; label: string},
  month?: string,
) => {
  try {
    let appointmentRef;
    if (role == 'doctor') {
      appointmentRef = firestore()
        .collection('appointments')
        .where('doctorID', '==', id);
    } else {
      appointmentRef = firestore()
        .collection('appointments')
        .where('patientID', '==', id);
    }
    if (status && status.value !== 'all') {
      appointmentRef = appointmentRef.where('status', '==', status.value);
    }

    if (month) {
      const startOfMonth = `${month}-01`;
      const endOfMonth = `${month}-31`;

      appointmentRef = appointmentRef
        .where('date', '>=', startOfMonth)
        .where('date', '<=', endOfMonth);
    }

    const appointmentDoc = await appointmentRef.get();
    if (!appointmentDoc.empty) {
      const appointments = appointmentDoc.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return appointments;
    } else {
      // showToast({
      //   message: 'No Appointments Found',
      //   type: 'info',
      //   position: 'bottom',
      // });
      return [];
    }
  } catch (error) {
    console.error('Error Fetching Appointments:', error);
    showToast({
      message: 'Failed to Fetch Appointments.',
      type: 'error',
      position: 'bottom',
    });
  }
};

export const updateAppointmentStatus = async (
  appointmentID: string,
  status: string,
) => {
  try {
    const appointmentRef = firestore()
      .collection('appointments')
      .doc(appointmentID);

    await appointmentRef.update({status});

    showToast({
      message: `Appointment ${status}.`,
      type: 'success',
      position: 'bottom',
    });
    return {success: true};
  } catch (error) {
    console.error(`Error updating status to ${status}:`, error);
    showToast({
      message: `Failed to update status to ${status}`,
      type: 'error',
      position: 'bottom',
    });
    return {success: false};
  }
};
