import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HabitsScreen from './src/screens/HabitsScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <HabitsScreen />
    </SafeAreaProvider>
  );
}