import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { habitsStore } from '../store/habitsStore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type AddHabitScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddHabit'>;
};

export default function AddHabitScreen({ navigation }: AddHabitScreenProps) {
  const [name, setName] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Введите название привычки');
      return;
    }
    habitsStore.addHabit(name);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Название привычки</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        autoFocus
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Сохранить</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 18, fontWeight: '500', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  saveButton: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});