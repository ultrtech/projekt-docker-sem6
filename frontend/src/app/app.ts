import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Stan
  protected readonly title = signal('Harmonogram');
  protected readonly days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  protected newTodoTexts = signal<{ [key: string]: string }>({
    'Poniedziałek': '',
    'Wtorek': '',
    'Środa': '',
    'Czwartek': '',
    'Piątek': ''
  });
  protected openFormDays = signal<Set<string>>(new Set());
  protected editingId = signal<number | null>(null);
  protected editingText = signal('');

  constructor(protected todoService: TodoService) {}

  // Dodawanie
  addTodo(day: string): void {
    const texts = this.newTodoTexts();
    if (texts[day]?.trim()) {
      this.todoService.add(texts[day], day);
      this.newTodoTexts.update(current => ({
        ...current,
        [day]: ''
      }));
      this.closeForm(day);
    }
  }

  // Formularz dodawania
  openForm(day: string): void {
    this.openFormDays.update(current => new Set([...current, day]));
  }

  closeForm(day: string): void {
    this.openFormDays.update(current => {
      const newSet = new Set(current);
      newSet.delete(day);
      return newSet;
    });
  }

  isFormOpen(day: string): boolean {
    return this.openFormDays().has(day);
  }

  // Edycja
  startEdit(id: number, text: string): void {
    this.editingId.set(id);
    this.editingText.set(text);
  }

  saveEdit(): void {
    if (this.editingId() !== null && this.editingText().trim()) {
      this.todoService.update(this.editingId()!, this.editingText());
      this.editingId.set(null);
      this.editingText.set('');
    }
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.editingText.set('');
  }

  // Usuwanie
  deleteTodo(id: number): void {
    this.todoService.delete(id);
  }

  // Gettery
  getTodosForDay(day: string) {
    return this.todoService.getTodosByDay(day);
  }

  isEditing(id: number): boolean {
    return this.editingId() === id;
  }

  getNewTodoText(day: string): string {
    return this.newTodoTexts()[day] || '';
  }

  setNewTodoText(day: string, text: string): void {
    this.newTodoTexts.update(current => ({
      ...current,
      [day]: text
    }));
  }
}
