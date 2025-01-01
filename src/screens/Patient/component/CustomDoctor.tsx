import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {COLORS, IMAGES} from '../../../utils/theme';

import {RFValue} from 'react-native-responsive-fontsize';
import {
  DEFAULT_IMAGE_URL,
  TYPEOFSPECIALIZATION,
  DEFAULT_YEARS_OF_EXPERIENCE,
  DEFAULT_RATING,
} from '../../../utils/constants';
import CustomIconWithText from '../../../components/common/CustomIconWithText/CustomIconWithText';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {navigate} from '../../../utils/navigation';
import {CustomIcon} from '../../../components/common/CustomIcon';
import CustomImage from '../../../components/common/CustomImage';
import {CustomText} from '../../../components/common/CustomText';

type Props = {
  containerStyle?: ViewStyle;
  item: any;
  index:number;
};

const getAbbreviatedDays = (days: string[]): string => {
  return days
    .map(day => day.slice(0, 3).charAt(0) + day.slice(1, 3).toLowerCase())
    .join(', ');
};

const CustomDoctor: FC<Props> = ({containerStyle, item, index}) => {
  return (
    <TouchableOpacity
      onPress={() => navigate('PatientBookAppointment', {doctorIndex:index})}
      style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <CustomImage
          source={{uri: DEFAULT_IMAGE_URL}}
          borderRadius={100}
          width={RFValue(36)}
          height={RFValue(36)}
        />
        <View style={{flex: 1}}>
          <CustomText
            children={item?.name}
            color={COLORS.bodytext}
            fontSize="S15"
            fontWeight="500"
          />
          <CustomText
            children={
              item?.specialization
                ? item.specialization.charAt(0).toUpperCase() +
                  item.specialization.slice(1)
                : ''
            }
            fontWeight="500"
            fontSize="S10"
            color={COLORS.primary}
          />
        </View>
        {/* <View style={styles.typeContainer}>
          <CustomText
            fontSize="S10"
            fontWeight="500"
            children={getPracticeType(
              item?.user?.professionalDetail?.typeOfPractice,
            )}
            color={COLORS.primary}
          />
        </View> */}
      </View>
      <View style={styles.bottomContainer}>
        <CustomIconWithText
          iconType="Ionicons"
          iconName="calendar-number-outline"
          iconSize={RFValue(16)}
          fontSize="S11"
          textStyle={styles.iconText}
          text={`Availability: ${getAbbreviatedDays(
            item.timeSchedule.availableDays,
          )}`}
        />
        <CustomIconWithText
          iconType="SimpleLineIcons"
          iconName="graduation"
          iconSize={RFValue(16)}
          fontSize="S11"
          textStyle={styles.iconText}
          text={`${DEFAULT_YEARS_OF_EXPERIENCE} Years of Experience`}
        />
        <CustomIconWithText
          iconType="AntDesign"
          iconName="staro"
          iconSize={RFValue(16)}
          fontSize="S11"
          textStyle={styles.iconText}
          text={`${DEFAULT_RATING} star rating`}
        />
      </View>
      <CustomIcon
        type="AntDesign"
        icon="arrowright"
        size={RFValue(16)}
        color={COLORS.primary}
        style={styles.rightArrowIcon}
      />
    </TouchableOpacity>
  );
};

export default CustomDoctor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: RFValue(10),
    borderWidth: RFValue(1),
    borderColor: COLORS.NeutralGrey20,
    borderRadius: 20,
  },
  headerContainer: {
    gap: widthPercentageToDP(2),
    flexDirection: 'row',
    alignItems: 'center',
  },

  typeContainer: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.primaryTransparant5,
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(2),
  },
  iconText: {
    color: COLORS.NeutralGrey80,
    fontWeight: '500',
  },
  bottomContainer: {
    marginTop: heightPercentageToDP(2),
    gap: heightPercentageToDP(1),
  },
  rightArrowIcon: {
    position: 'absolute',
    right: RFValue(10),
    backgroundColor: COLORS.primaryTransparant10,
    padding: RFValue(6),
    borderRadius: 100,
    bottom: RFValue(10),
  },
});
