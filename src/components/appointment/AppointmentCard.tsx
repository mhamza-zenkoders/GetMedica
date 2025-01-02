import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {COLORS} from '../../utils/theme';

import {RFValue} from 'react-native-responsive-fontsize';
import {DEFAULT_IMAGE_URL, DEFAULT_PHONE_NUMBER} from '../../utils/constants';
import CustomIconWithText from '../../components/common/CustomIconWithText/CustomIconWithText';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {CustomText} from '../../components/common/CustomText';
import {convertDateToUSLocale, formatTime12Hour} from '../../utils/helpers';
import {CustomButton} from '../../components/common/CustomButton';
import {updateAppointmentStatus} from '../../services/appointment';

type Props = {
  containerStyle?: ViewStyle;
  item: any;
  role?: string;
  index?: number;
};

const AppoitmentCard: FC<Props> = ({containerStyle, item, index, role}) => {
  const [showButtons, setShowButtons] = useState<boolean>(true);

  const handleStatusChange = (id: string, status: string) => {
    updateAppointmentStatus(id, status);
    setShowButtons(false);
  };

  return (
    <TouchableOpacity
      onPress={() => {}}
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
            children={item?.user.name}
            color={COLORS.bodytext}
            fontSize="S15"
            fontWeight="500"></CustomText>
          {role == 'patient' && (
            <CustomText
              children={
                item.user?.specialization
                  ? item.user.specialization.charAt(0).toUpperCase() +
                    item.user.specialization.slice(1)
                  : ''
              }
              fontWeight="500"
              fontSize="S10"
              color={COLORS.primary}
            />
          )}
        </View>
        {role == 'patient' && (
          <View
            style={[
              styles.typeContainer,
              item?.status === 'pending'
                ? {backgroundColor: COLORS.NeutralGrey10}
                : item?.status === 'rejected'
                ? {backgroundColor: COLORS.errorRedTransparent10}
                : {backgroundColor: COLORS.primaryTransparant10},
            ]}>
            <CustomText
              fontSize="S12"
              fontWeight="600"
              children={
                item.status.charAt(0).toUpperCase() + item.status.slice(1)
              }
              color={
                item.status === 'pending'
                  ? COLORS.NeutralGrey70
                  : item.status === 'rejected'
                  ? COLORS.errorRed50
                  : COLORS.primary
              }
            />
          </View>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <CustomIconWithText
          iconType="Ionicons"
          iconName="calendar-number-outline"
          iconSize={RFValue(16)}
          fontSize="S11"
          textStyle={styles.iconText}
          text={convertDateToUSLocale(item.date)}
        />
        <CustomIconWithText
          iconType="SimpleLineIcons"
          iconName="clock"
          iconSize={RFValue(16)}
          fontSize="S11"
          textStyle={styles.iconText}
          text={`${formatTime12Hour(item.startTime)} - ${formatTime12Hour(
            item.endTime,
          )}`}
        />

        <CustomIconWithText
          iconType="SimpleLineIcons"
          iconName="phone"
          iconSize={RFValue(16)}
          fontSize="S11"
          textStyle={styles.iconText}
          text={DEFAULT_PHONE_NUMBER}
        />
      </View>
      <View style={styles.reasonTextContainer}>
        <CustomText
          children={item.reason}
          fontSize="S12"
          fontWeight="400"
          color={COLORS.NeutralGrey60}
        />
      </View>

      {role == 'doctor' && item.status == 'pending' && showButtons && (
        <View style={styles.buttonContainer}>
          <CustomButton
            title={'Decline'}
            onPress={() => {
              handleStatusChange(item.id, 'rejected');
            }}
            containerStyle={styles.cancelButton}
            textStyle={styles.cancelButtonText}
          />
          <CustomButton
            title={'Confirm'}
            onPress={() => {
              handleStatusChange(item.id, 'approved');
            }}
            containerStyle={styles.confirmButton}
            textStyle={styles.confirmButtonText}
          />
        </View>
      )}

      {/* <CustomIcon
        type="AntDesign"
        icon="arrowright"
        size={RFValue(16)}
        color={COLORS.primary}
        style={styles.rightArrowIcon}
      /> */}
    </TouchableOpacity>
  );
};

export default AppoitmentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: RFValue(10),
    borderWidth: RFValue(1),
    borderTopWidth: RFValue(3),
    borderLeftColor: COLORS.NeutralGrey20,
    borderRightColor: COLORS.NeutralGrey20,
    borderBottomColor: COLORS.NeutralGrey20,
    borderTopColor: COLORS.primary,
    borderRadius: 20,
  },
  headerContainer: {
    gap: widthPercentageToDP(2),
    flexDirection: 'row',
    alignItems: 'center',
  },

  typeContainer: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.primaryTransparant10,
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(3),
    borderRadius: 10,
  },
  iconText: {
    color: COLORS.NeutralGrey80,
    fontWeight: '500',
  },
  bottomContainer: {
    marginTop: heightPercentageToDP(2),
    gap: heightPercentageToDP(1.5),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  reasonTextContainer: {
    marginVertical: heightPercentageToDP(1),
  },

  rightArrowIcon: {
    position: 'absolute',
    right: RFValue(10),
    padding: RFValue(6),
    borderRadius: 100,
    bottom: RFValue(10),
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: heightPercentageToDP(1),
  },
  confirmButton: {
    width: widthPercentageToDP(25),
  },
  cancelButton: {
    width: widthPercentageToDP(25),
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: RFValue(1),
  },
  cancelButtonText: {
    color: COLORS.primary,
    fontSize: RFValue(12),
  },
  confirmButtonText: {
    fontSize: RFValue(12),
  },
});
