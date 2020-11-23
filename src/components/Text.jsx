import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextThird: {
    color: theme.colors.textThird,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorDelete: {
    backgroundColor: theme.colors.deletebutton,
    color: theme.colors.textWhite,
      padding: 7,
      borderRadius: 5,
      fontWeight: theme.fontWeights.bold,
  },
  colorSubHeading: {
      color: theme.colors.subheading
  },
  colorWhite: {
        color: theme.colors.textWhite
  },
  languageText: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.textWhite,
      padding: 7,
      borderRadius: 5,
      fontWeight: theme.fontWeights.bold,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'textThird' && styles.colorTextThird,
    color === 'primary' && styles.languageText,
    color === 'blue' && styles.colorPrimary,
    color === 'white' && styles.colorWhite,
    color === 'red' && styles.colorDelete,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

const Subheading = ({ color, style, ...props }) => {
    const headingstyle = [
        styles.text,
        styles.fontSizeSubheading,
        styles.fontWeightBold,
        color === 'subheading' && styles.colorSubHeading,
        style
    ];

    return <NativeText style={headingstyle} {...props} />;

};

export { Text, Subheading };