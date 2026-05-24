import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type { Habit } from '../types/Habit';

const test: Habit[] = [
  { id: '1', name: 'Сделать зарядку', isCompleted: false, createdAt: Date.now() },
  { id: '2', name: 'Продать зарядку', isCompleted: true, createdAt: Date.now() },
  { id: '3', name: '... PROFIT!', isCompleted: false, createdAt: Date.now() },
];

export default function HabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>(test);

  const toggleComplete = (id: string) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit
      )
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
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
    habitName: { flex: 1, fontSize: 18, color: '#333' },

    completedItem: {
        backgroundColor: '#053a03'
    },

    completedText: {
        textDecorationLine: 'line-through',
        color: '#999',
    },

    deleteText: { fontSize: 20, color: '#a60000' },
    emptyText: { textAlign: 'center', marginTop: 40, color: '#888', fontSize: 16 },
    cbText: {
        flex: 0.05
    }
});