import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackNavigationType} from '../../utils/types/navigationType';
import {useDoctorsStore} from '../../store/doctorStore';
import CustomWrapper from '../../components/wrappers/CustomWrapper';
import CustomHeader from '../../components/header/CustomHeader';
import {signOutMutation} from '../../services/auth';
import {useUserStore} from '../../store/userStore';
import {COLORS, IMAGES} from '../../utils/theme';
import DoctorDetails from './component/DoctorDetails';
import {CustomText} from '../../components/common/CustomText';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  formatTime12Hour,
  generateTimeSlots,
  getNextDates,
  showToast,
} from '../../utils/helpers';
import CustomTextInput from '../../components/common/CustomTextInput';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomButton} from '../../components/common/CustomButton';
import {bookAppointment} from '../../services/appointment';
import {navigate} from '../../utils/navigation';

const PatientBookAppointment = () => {
  const {user} = useUserStore();
  const {filteredDoctors} = useDoctorsStore();
  const {params} =
    useRoute<RouteProp<RootStackNavigationType, 'PatientBookAppointment'>>();
  const doctorData = filteredDoctors[params.doctorIndex];
  const [dates, setDates] = useState<{day: string; date: string}[]>();
  const [selectedDate, setSelectedDate] = React.useState<{
    day: string;
    date: string;
  } | null>(null);

  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime]: any = useState(null);
  const [reasonText, setReasonText]: any = useState('');

  const handleBookAppointment = async () => {
    if (!reasonText.trim()) {
      return showToast({
        type: 'error',
        message: 'Fill all feilds',
        position: 'bottom',
      });
    }

    const res = await bookAppointment({
      patientID: user.uid,
      doctorID: doctorData.id,
      day: selectedDate?.day,
      date: selectedDate?.date,
      time: selectedTime,
      reason: reasonText,
    });
    if (res.success) {
      showToast({
        type: 'success',
        message: 'Appointment Request has been sent',
        position: 'bottom',
      });
      navigate('PatientAppointments');
    } else {
      console.log('Error Booking Appointment:',res.error),
        showToast({
          type: 'error',
          message: 'Something went wrong!',
          position: 'bottom',
        });
    }
  };

  useEffect(() => {
    if (doctorData?.timeSchedule?.availableDays) {
      const nextDates = getNextDates(doctorData.timeSchedule.availableDays);
      setDates(nextDates);
      setSelectedDate(nextDates[0]);
    }
  }, [doctorData]);

  useEffect(() => {
    if (selectedDate) {
      const dayTimings = doctorData.timeSchedule.timings.filter(
        (timing: any) => timing.day === selectedDate.day,
      );
      const slots = dayTimings.flatMap((timing: any) =>
        generateTimeSlots(timing.startTime, timing.endTime),
      );
      setTimeSlots(slots.sort());
    } else {
      setTimeSlots([]);
    }
  }, [selectedDate, doctorData]);

  return (
    <CustomWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomHeader
          title={user.name}
          subtitle="Welcome"
          profilePic={IMAGES.userProfile}
          icon="logout"
          iconPress={signOutMutation}
        />
        <CustomText
          children={'Book Appointment'}
          fontSize="S20"
          fontWeight="500"
          color={COLORS.NeutralGrey100}
          textStyle={styles.SubHeading}
        />
        <DoctorDetails item={doctorData} />

        <CustomText
          children={'Select Day'}
          fontSize="S20"
          fontWeight="500"
          color={COLORS.NeutralGrey100}
          textStyle={styles.SubHeading}
        />
        <FlatList
          data={dates}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.daysContainer}>
              <CustomText
                children={item.day.slice(0, 3).toUpperCase()}
                fontSize={'S13'}
                color={COLORS.primary}
                fontWeight="600"
                textStyle={{includeFontPadding: false}}
              />
              <TouchableOpacity
                style={[
                  styles.dateContainer,
                  selectedDate?.day == item.day
                    ? {
                        backgroundColor: COLORS.primary,
                        elevation: 3,
                      }
                    : {
                        backgroundColor: COLORS.NeutralGrey10,
                        elevation: 0,
                      },
                ]}
                onPress={() => {
                  setSelectedDate(item);
                }}>
                <CustomText
                  children={item.date.slice(0, 2)}
                  fontSize={'S15'}
                  color={
                    selectedDate?.day == item.day
                      ? COLORS.white
                      : COLORS.NeutralGrey100
                  }
                  fontWeight="600"
                  textStyle={{includeFontPadding: false}}
                />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.dateList}
        />
        <CustomText
          children={'Select Time'}
          fontSize="S20"
          fontWeight="500"
          color={COLORS.NeutralGrey100}
          textStyle={styles.SubHeading}
        />
        <View style={styles.timeContainer}>
          {timeSlots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateContainer,
                selectedTime == slot
                  ? {
                      backgroundColor: COLORS.primary,
                      elevation: 3,
                    }
                  : {
                      backgroundColor: COLORS.NeutralGrey10,
                      elevation: 0,
                    },
              ]}
              onPress={() => setSelectedTime(slot)}>
              <CustomText
                children={formatTime12Hour(slot)}
                fontSize={'S15'}
                color={
                  selectedTime === slot ? COLORS.white : COLORS.NeutralGrey100
                }
                fontWeight="600"
                textStyle={{includeFontPadding: false}}
              />
            </TouchableOpacity>
          ))}
        </View>
        <CustomText
          children={'Reason For Appointment'}
          fontSize="S20"
          fontWeight="500"
          color={COLORS.NeutralGrey100}
          textStyle={styles.SubHeading}
        />
        <CustomTextInput
          value={reasonText}
          onChangeText={text => setReasonText(text)}
          inputContainerStyle={styles.reasonInput}
          numberOfLines={7}
          multiline
          textStyle={styles.reasonText}
          placeholder={`Please tell us why you would like to book this appointment with ${doctorData.name}.`}
        />
        <CustomButton
          title={'Book Appointment'}
          onPress={() => handleBookAppointment()}
        />
      </ScrollView>
    </CustomWrapper>
  );
};

export default PatientBookAppointment;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: heightPercentageToDP(3),
  },
  SubHeading: {
    marginTop: heightPercentageToDP(3),
    marginBottom: heightPercentageToDP(2),
  },
  daysContainer: {
    gap: heightPercentageToDP(2),
    alignItems: 'center',
  },
  dateContainer: {
    padding: heightPercentageToDP(2),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.NeutralGrey10,
    width: widthPercentageToDP(28),
  },

  dateList: {
    gap: widthPercentageToDP(2.9),
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: widthPercentageToDP(2.9),
  },
  reasonInput: {
    height: heightPercentageToDP(20),
    marginBottom: heightPercentageToDP(2),
  },
  reasonText: {
    fontSize: RFValue(13),
    textAlignVertical: 'top',
  },
});
