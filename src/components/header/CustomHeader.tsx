import {ImageProps, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomIcon} from '../common/CustomIcon';
import {navigateGoBack} from '../../utils/navigation';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../utils/theme';
import CustomImage from '../common/CustomImage';
import {CustomText} from '../common/CustomText';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

type CustomHeaderProps = {
  title?: string;
  subtitle?: string;
  profilePic?: ImageProps;
  icon?: string;
  iconType?: string;
  onPressBack?: () => void;
  containerStyle?: ViewStyle;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  subtitle,
  profilePic,
  icon,
  iconType,
  onPressBack,
  containerStyle,
}) => {
  const {top} = useSafeAreaInsets();

  return (
    <View>
      <View style={[styles.headerContainer, {marginTop: top}]}>
        {onPressBack && (
          <CustomIcon
            style={styles.icon}
            onPress={() => {
              if (onPressBack) {
                return onPressBack();
              }
              navigateGoBack();
            }}
            color={COLORS.NeutralGrey20}
            size={RFValue(18)}
            type={'AntDesign'}
            icon="arrowleft"
          />
        )}
        {(profilePic || title) && (
          <View style={styles.headerContent}>
            {profilePic && (
              <CustomImage source={profilePic} style={styles.image} />
            )}
            <View>
              <CustomText
                children={subtitle}
                fontWeight="600"
                fontSize="S11"
                color={COLORS.NeutralGrey50}
              />
              <CustomText
                children={title?.toUpperCase()}
                fontWeight="600"
                fontSize="S17"
                color={COLORS.NeutralGrey90}
              />
            </View>
          </View>
        )}
        {icon && (
          <CustomIcon
            style={styles.bellIcon}
            onPress={() => {}}
            color={COLORS.white}
            size={RFValue(25)}
            type={'Ionicons'}
            icon={icon}
          />
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  icon: {
    borderWidth: RFValue(1),
    borderColor: COLORS.NeutralGrey20,
    borderRadius: 100,
    padding: RFValue(4),
    backgroundColor: COLORS.primary,
  },

  bellIcon: {
    borderRadius: 100,
    padding: RFValue(7),
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: widthPercentageToDP(3),
    flex: 1,
  },

  image: {
    height: heightPercentageToDP(7),
    borderRadius: 100,
    aspectRatio: 1,
  },
  imageContainer: {
    marginTop: heightPercentageToDP(5),
    gap: heightPercentageToDP(0.5),
  },
});
