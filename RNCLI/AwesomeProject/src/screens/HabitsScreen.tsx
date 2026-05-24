import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { habitsStore } from '../store/habitsStore';
import type { Habit } from '../types/Habit';

type HabitsScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'Habits'>;

const test: Habit[] = [
  { id: '1', name: 'Сделать зарядку', isCompleted: false, createdAt: Date.now() },
  { id: '2', name: 'Продать зарядку', isCompleted: true, createdAt: Date.now() },
  { id: '3', name: '... PROFIT!', isCompleted: false, createdAt: Date.now() },
];

export default function HabitsScreen() {
    const navigation = useNavigation<HabitsScreenNavProp>();
    const [habits, setHabits] = useState<Habit[]>(habitsStore.getHabits());

    useEffect(() => {
        const unsubscribe = habitsStore.subscribe(() => {
        setHabits(habitsStore.getHabits());
        });
        return unsubscribe;
    }, []);

    const toggleComplete = (id: string) => {
        habitsStore.toggleComplete(id);
    };

    const deleteHabit = (id: string) => {
      habitsStore.deleteHabit(id);
    }; 

  const renderItem = ({ item }: { item: Habit }) => (
    <View style={[styles.habitItem, item.isCompleted && styles.completedItem]}>
      <TouchableOpacity style={styles.checkbox} onPress={() => toggleComplete(item.id)}>
        <Text style={[styles.cbText, item.isCompleted ? styles.checked : styles.unchecked]}>
          {item.isCompleted ? 'V' : '○'}
        </Text>
      <Text style={[styles.habitName, item.isCompleted && styles.completedText]}>
        {item.name}
              </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteHabit(item.id)} style={''}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Нет привычек. Добавьте первую!</Text>
        }
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddHabit')}>
        <Text style={styles.addButtonText}>+ Добавить привычку</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
    habitItem: {
        boxSizing: 'border-box',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    
    checkbox: {
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        
    },

    unchecked: { fontSize: 28, color: '#aaa' },
    checked: { fontSize: 28, color: '#4caf50' },
    habitName: { flex: 10, fontSize: 18, color: '#333' },

    completedItem: {
        backgroundColor: '#053a03'
    },

    completedText: {
        textDecorationLine: 'line-through',
        color: '#999',
    },

    deleteText: { fontSize: 20, color: '#a60000' },
    emptyText: { textAlign: 'center', marginTop: 40, color: '#1488', fontSize: 16 },
    cbText: {
        flex: 1
  },
  addButton: {
    backgroundColor: '#6200ee',
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});