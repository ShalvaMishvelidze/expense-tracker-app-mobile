import { StyleSheet, TextInput, Alert, View } from 'react-native';
import React, { useState } from 'react';
import BtnPrimary from './BtnPrimary';
import { useDispatch, useSelector } from 'react-redux';
import {
  addExpense,
  editExpense,
  setAllExpenses,
} from '../features/expensesSlice';
import { GlobalStyles } from '../assets/styles';

const Inputs = ({ id, goBack }) => {
  const { allExpenses } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const [expense, setExpense] = useState(
    id
      ? { ...allExpenses.find((expense) => expense.id === id) }
      : {
          id: '',
          title: '',
          amount: '',
          date: { year: '', month: '', day: '' },
        }
  );

  function handleInput(value, key) {
    setExpense((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  }
  function handleDateInput(value, key) {
    setExpense((prevState) => {
      return { ...prevState, date: { ...prevState.date, [key]: value } };
    });
  }

  function handleSubmit() {
    const {
      title,
      amount,
      date: { year, month, day },
    } = expense;
    const uniqueId = (Date.now() + Math.random()).toString();
    const currentDate = new Date();

    if (!title) {
      Alert.alert('No Title!', 'You need to enter a title', ['Got It']);
    } else if (+amount != amount) {
      Alert.alert(
        'Not a Valid Number!',
        'Please enter a valid number for the ammount',
        ['Got It']
      );
    } else if (
      id &&
      (+year != year ||
        +month != month ||
        +day != day ||
        +month < 1 ||
        +month > 12 ||
        +day < 1 ||
        +day > 31)
    ) {
      Alert.alert('Invalid Date!', 'Please enter a valid Date', ['Got It']);
    } else {
      dispatch(
        id
          ? editExpense({
              id,
              expense: {
                ...expense,
                amount: +amount,
                date: { year: +year, month: +month, day: +day },
              },
            })
          : addExpense({
              ...expense,
              amount: +amount,
              date: {
                year: currentDate.getFullYear(),
                month: currentDate.getMonth() + 1,
                day: currentDate.getDate(),
              },
              id: uniqueId,
            })
      );
      dispatch(setAllExpenses());
      goBack();
    }
  }

  return (
    <View style={styles.underline}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={expense.title}
          placeholder="name"
          onChangeText={(value) => handleInput(value, 'title')}
          maxLength={30}
        />
        <TextInput
          style={styles.input}
          value={`${expense.amount}`}
          placeholder="amount"
          onChangeText={(value) => handleInput(value, 'amount')}
          maxLength={12}
          keyboardType="numeric"
        />
        {id && (
          <View style={styles.dateContainer}>
            <TextInput
              style={styles.dateInput}
              value={`${expense.date.year}`}
              placeholder="year"
              onChangeText={(value) => handleDateInput(value, 'year')}
              maxLength={4}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.dateInput}
              value={`${expense.date.month}`}
              placeholder="month"
              onChangeText={(value) => handleDateInput(value, 'month')}
              maxLength={2}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.dateInput}
              value={`${expense.date.day}`}
              placeholder="day"
              onChangeText={(value) => handleDateInput(value, 'day')}
              maxLength={2}
              keyboardType="numeric"
            />
          </View>
        )}
      </View>
      <View style={styles.btnContainer}>
        <BtnPrimary
          backgroundColor="transparent"
          color={GlobalStyles.colors.primary200}
          onPress={() => goBack()}
        >
          cancel
        </BtnPrimary>
        <BtnPrimary onPress={handleSubmit}>{id ? 'update' : 'add'}</BtnPrimary>
      </View>
    </View>
  );
};

export default Inputs;

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 12,
    paddingVertical: 36,
    gap: 24,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary200,
    padding: 8,
    borderRadius: 16,
    fontSize: 16,
  },
  dateInput: {
    backgroundColor: GlobalStyles.colors.primary200,
    padding: 8,
    borderRadius: 16,
    fontSize: 16,
    width: '30%',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    width: '60%',
    alignSelf: 'center',
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginHorizontal: 24,
    paddingBottom: 24,
  },
});
