import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../assets/styles';

const TotalContainer = ({ title, amount }) => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Title}>{title}</Text>
      <Text style={styles.Amount}>${amount.toFixed(2)}</Text>
    </View>
  );
};

export default TotalContainer;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 8,
    marginBottom: 8,
  },
  Title: {
    textTransform: 'capitalize',
    color: GlobalStyles.colors.primary700,
  },
  Amount: {
    color: GlobalStyles.colors.primary700,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
