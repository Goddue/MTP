import { Habit } from '../types/Habit';

const initialHabits: Habit[] = [
  { id: '1', name: 'Сделать зарядку', isCompleted: false, createdAt: Date.now() },
  { id: '2', name: 'Продать зарядку', isCompleted: true, createdAt: Date.now() },
  { id: '3', name: '... PROFIT!', isCompleted: false, createdAt: Date.now() },
];

class HabitsStore {
  private habits: Habit[] = [...initialHabits];
  private listeners: (() => void)[] = [];

  getHabits(): Habit[] {
    return this.habits;
  }

  addHabit(name: string): void {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: name.trim(),
      isCompleted: false,
      createdAt: Date.now(),
    };
    this.habits = [newHabit, ...this.habits];
    this.notify();
  }

  toggleComplete(id: string): void {
    this.habits = this.habits.map(habit =>
      habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit
    );
    this.notify();
  }

  deleteHabit(id: string): void {
    this.habits = this.habits.filter(habit => habit.id !== id);
    this.notify();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach(listener => listener());
  }
}

export const habitsStore = new HabitsStore();