import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../assets/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteExpense, setAllExpenses } from '../features/expensesSlice';
import Inputs from '../components/Inputs';
import { useDispatch } from 'react-redux';

const EditExpensesScreen = ({
  route: {
    params: { id },
  },
  navigation: { goBack },
}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Inputs id={id} goBack={goBack} />
      <Pressable
        style={styles.delete}
        onPress={() => {
          dispatch(deleteExpense(id));
          dispatch(setAllExpenses());
          goBack();
        }}
      >
        <MaterialCommunityIcons
          name="delete-circle-outline"
          color={GlobalStyles.colors.error500}
          size={100}
        />
      </Pressable>
    </View>
  );
};

export default EditExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  delete: {
    alignSelf: 'center',
    margin: 36,
  },
});
