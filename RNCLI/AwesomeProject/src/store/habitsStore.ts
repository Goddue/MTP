import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types/Habit';

const STORAGE_KEY = '@habits';

class HabitsStore {
  private habits: Habit[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadHabits();
  }

  getHabits(): Habit[] {
    return this.habits;
  }

  async addHabit(name: string): Promise<void> {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: name.trim(),
      isCompleted: false,
      createdAt: Date.now(),
    };
    this.habits = [newHabit, ...this.habits];
    await this.saveHabits();
    this.notify();
  }

  async toggleComplete(id: string): Promise<void> {
    this.habits = this.habits.map(habit =>
      habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit
    );
    await this.saveHabits();
    this.notify();
  }

  async deleteHabit(id: string): Promise<void> {
    this.habits = this.habits.filter(habit => habit.id !== id);
    await this.saveHabits();
    this.notify();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private async loadHabits(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.habits = JSON.parse(stored);
      } else {
        this.habits = [
          { id: '1', name: 'Сделать зарядку', isCompleted: false, createdAt: Date.now() },
          { id: '2', name: 'Продать зарядку', isCompleted: true, createdAt: Date.now() },
          { id: '3', name: '... PROFIT!', isCompleted: false, createdAt: Date.now() },
        ];
        await this.saveHabits();
      }
      this.notify();
    } catch (error) {
      console.error('Ошибка загрузки привычек:', error);
    }
  }

  private async saveHabits(): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.habits));
    } catch (error) {
      console.error('Ошибка сохранения привычек:', error);
    }
  }

  private notify(): void {
    this.listeners.forEach(listener => listener());
  }
}

export const habitsStore = new HabitsStore();