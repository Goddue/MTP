import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HabitsScreen from './src/screens/HabitsScreen';
import AddHabitScreen from './src/screens/AddHabitScreen';

export type RootStackParamList = {
  Habits: undefined;
  AddHabit: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
  initialRouteName="Habits"
  screenOptions={({ navigation, route }) => ({
    header: ({ options, back }) => (
      <View style={{ 
        height: 50, 
        backgroundColor: '#6200ee', 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 16 
      }}>
        {back && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
            <Text style={{ color: 'white', fontSize: 24 }}>{'<-'}</Text>
          </TouchableOpacity>
        )}
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          {getHeaderTitle(options, route.name)}
        </Text>
      </View>
    ),
    headerTitleAlign: 'center',
  })}
>
        <Stack.Screen
          name="Habits"
          component={HabitsScreen}
          options={{ title: 'Мои привычки' }
          }
        />
        <Stack.Screen
          name="AddHabit"
          component={AddHabitScreen}
          options={{ title: 'Новая привычка' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}