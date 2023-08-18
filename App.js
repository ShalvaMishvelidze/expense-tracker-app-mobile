import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentExpensesScreen from './screens/RecentExpensesScreen';
import AllExpensesScreen from './screens/AllExpensesScreen';
import EditExpensesScreen from './screens/EditExpensesScreen';
import AddExpensesScreen from './screens/AddExpensesScreen';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from './assets/styles';
import { Pressable } from 'react-native';
import { useLayoutEffect } from 'react';
import { getAllExpenses } from './features/expensesSlice';

const stack = createStackNavigator();
const tabs = createBottomTabNavigator();

function Tabs() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getAllExpenses());
  }, []);

  return (
    <tabs.Navigator
      screenOptions={({ navigation: { navigate } }) => ({
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: GlobalStyles.colors.gray500,
        tabBarStyle: {
          height: 50,
          backgroundColor: GlobalStyles.colors.primary400,
        },

        headerRight: () => {
          return (
            <Pressable
              style={{
                paddingRight: 24,
              }}
              onPress={() => navigate('AddExpenses')}
            >
              <AntDesign name="plus" color={'#fff'} size={24} />
            </Pressable>
          );
        },
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary400,
        },
        headerTintColor: '#fff',
      })}
    >
      <tabs.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="hourglass" color={color} size={size} />;
          },
          title: 'Recent',
        }}
      />
      <tabs.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="calendar" color={color} size={size} />;
          },
          title: 'All Expenses',
        }}
      />
    </tabs.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary400,
            },
            headerTintColor: '#fff',
          }}
        >
          <stack.Screen
            name="Tabs"
            component={Tabs}
            options={{
              headerShown: false,
            }}
          />
          <stack.Screen
            name="EditExpenses"
            component={EditExpensesScreen}
            options={{ title: 'Edit' }}
          />
          <stack.Screen
            name="AddExpenses"
            component={AddExpensesScreen}
            options={{ title: 'Add' }}
          />
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
