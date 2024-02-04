import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import Fonts from '../../constant/Fonts';

const TextCompo = ({
  numberOfLines,
  small,
  tooSmall,
  medium,
  large,
  extraLarge,
  bold,
  semiBold,
  textColor,
  children,
  onPress,
  style,
  ...props
}) => {
  const fontSize = 
  tooSmall?
  scale(10):
  small
    ? scale(12)
    : medium
    ? scale(14)
    : large
    ? scale(17)
    : 
    extraLarge?
    scale(20)
    :
    scale(13);
  const fontFamily = bold
    ? Fonts.BOLD
    : semiBold
    ? Fonts.SEMIBOLD
    : Fonts.REGULAR;
  const color = textColor ? textColor : '#000';

  return (
    <Text
      disabled={!onPress}
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[
        styles.textStyle,
        {
          fontSize,
          fontFamily,
          color,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default TextCompo;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: Fonts.REGULAR,
    // textTransform: 'capitalize',
  },
});
