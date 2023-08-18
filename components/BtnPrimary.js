import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../assets/styles';

const BtnPrimary = ({
  backgroundColor = GlobalStyles.colors.primary500,
  color = '#fff',
  containerStyle = {},
  textStyle = {},
  children,
  onPress = () => {},
}) => {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 4,
        overflow: Platform.select({ ios: 'visible', android: 'hidden' }),
        minHeight: 35,
        height: 'auto',
      }}
    >
      <Pressable
        style={({ pressed }) => [
          styles.container,
          { backgroundColor },
          { ...containerStyle },
          pressed &&
            Platform.OS === 'ios' && {
              opacity: 0.5,
            },
        ]}
        android_ripple={{ color: '#ccc' }}
        onPress={onPress}
      >
        <Text style={[styles.text, { ...textStyle }, { color }]}>
          {children || 'click me'}
        </Text>
      </Pressable>
    </View>
  );
};

export default BtnPrimary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
