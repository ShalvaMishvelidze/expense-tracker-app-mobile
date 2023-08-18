import * as FS from 'expo-file-system';

export const setAllExpensesThunk = async (_, thunkAPI) => {
  try {
    const { allExpenses } = thunkAPI.getState().expenses;
    const path = `${FS.documentDirectory}data.json`;
    const data = JSON.stringify(allExpenses);
    await FS.writeAsStringAsync(path, data);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const getAllExpensesThunk = async (_, thunkAPI) => {
  try {
    const path = `${FS.documentDirectory}data.json`;
    const content = await FS.readAsStringAsync(path);
    return JSON.parse(content);
  } catch (error) {
    console.error('Error saving data:', error);
    return null;
  }
};
