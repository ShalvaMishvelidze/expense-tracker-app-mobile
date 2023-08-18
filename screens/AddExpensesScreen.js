import { StyleSheet, View } from 'react-native';
import React from 'react';
import Inputs from '../components/Inputs';
import { GlobalStyles } from '../assets/styles';

const AddExpensesScreen = ({ navigation: { goBack } }) => {
  return (
    <View style={styles.container}>
      <Inputs goBack={goBack} />
    </View>
  );
};

export default AddExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
