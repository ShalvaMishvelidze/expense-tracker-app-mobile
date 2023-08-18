import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../assets/styles';
import { useNavigation } from '@react-navigation/native';

const ExpensesListItem = ({ title, amount, date, id }) => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.pressable,
          pressed &&
            Platform.OS === 'ios' && {
              opacity: 0.5,
            },
        ]}
        onPress={() => navigate('EditExpenses', { id })}
        android_ripple={{ color: '#ccc' }}
      >
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>
            {date.year}-{date.month}-{date.day}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ExpensesListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary500,
    margin: 8,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: 8,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    overflow: Platform.select({ ios: 'visible', android: 'hidden' }),
  },
  pressable: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },
  date: {
    color: '#ccc',
  },
  amountContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    justifyContent: 'center',
  },
  amount: {
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary800,
  },
});
