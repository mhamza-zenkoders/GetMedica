import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useCallback} from 'react';
import {COLORS, IMAGES} from '../../../utils/theme';

import {RFValue} from 'react-native-responsive-fontsize';
import {DEFAULT_IMAGE_URL, TYPEOFSPECIALIZATION} from '../../../utils/constants';
import CustomIconWithText from '../../../components/common/CustomIconWithText/CustomIconWithText';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {navigate} from '../../../utils/navigation';
import { CustomIcon } from '../../../components/common/CustomIcon';
import {HOSPITAL_HOME_DOCTORS} from '../../../utils/types/apiResponseType';
import {getPracticeType} from '../../../utils/helpers';
import CustomImage from '../../../components/common/CustomImage';
import { CustomText } from '../../../components/common/CustomText';
type Props = {
  containerStyle?: ViewStyle;
  item: any;
};

const CustomDoctor: FC<Props> = ({containerStyle, item}) => {
  return (
    <TouchableOpacity
      onPress={() => navigate('PatientBookAppointment')}
      style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <CustomImage
          source={IMAGES.userProfile}
          borderRadius={100}
          width={RFValue(40)}
          height={RFValue(40)}
        />
        <View style={{flex: 1}}>
          <CustomText
            children={item?.name}
            color={COLORS.bodytext}
            fontSize="S15"
          />
          <CustomText
            children={
              item?.specialization
            }
            fontWeight="500"
            fontSize='S12'
            color={COLORS.primary}
          />
        </View>
        <View style={styles.typeContainer}>
          <CustomText
            fontSize="S10"
            fontWeight="500"
            children={getPracticeType(
              item?.user?.professionalDetail?.typeOfPractice,
            )}
            color={COLORS.primary}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <CustomIconWithText
          iconType="Ionicons"
          iconName="location-outline"
          textStyle={styles.iconText}
          text={`km away`}
        />
        <CustomIconWithText
          iconType="AntDesign"
          iconName="staro"
          textStyle={styles.iconText}
          text={`rating`}
        />
      </View>
      <CustomIcon
        type="AntDesign"
        icon="arrowright"
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
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
  },

  typeContainer: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.primaryTransparant5,
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(2),
  },
  iconText: {
    color: COLORS.NeutralGrey80,
  },
  bottomContainer: {
    marginTop: heightPercentageToDP(2),
    gap: heightPercentageToDP(1),
  },
  rightArrowIcon: {
    position: 'absolute',
    right: RFValue(10),
    backgroundColor: COLORS.primaryTransparant5,
    padding: RFValue(5),
    borderRadius: 100,
    bottom: RFValue(10),
  },
});
