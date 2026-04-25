import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface TodoItem {
  id: number;
  text: string;
  day: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private API_URL = '/api/todos';

  private todos = signal<TodoItem[]>([]);
  todos$ = this.todos.asReadonly();

  constructor(private http: HttpClient) {
    this.loadTodos();
  }

  // Załaduj wszystkie zadania z API
  private loadTodos(): void {
    this.http.get<TodoItem[]>(this.API_URL).subscribe({
      next: (data) => {
        this.todos.set(data);
      },
      error: (error) => console.error('Błąd ładowania:', error)
    });
  }

  // Dodaj
  add(text: string, day: string): void {
    this.http.post<TodoItem>(this.API_URL, { text, day }).subscribe({
      next: (todo) => {
        this.todos.update(current => [...current, todo]);
      },
      error: (error) => console.error('Błąd dodawania:', error)
    });
  }

  // Aktualizuj
  update(id: number, text: string): void {
    this.http.put<TodoItem>(`${this.API_URL}/${id}`, { text }).subscribe({
      next: (updatedTodo) => {
        this.todos.update(current =>
          current.map(todo => todo.id === id ? updatedTodo : todo)
        );
      },
      error: (error) => console.error('Błąd aktualizacji:', error)
    });
  }

  // Usuń
  delete(id: number): void {
    this.http.delete(`${this.API_URL}/${id}`).subscribe({
      next: () => {
        this.todos.update(current => current.filter(todo => todo.id !== id));
      },
      error: (error) => console.error('Błąd usuwania:', error)
    });
  }

  // Pobierz zadania na dzień
  getTodosByDay(day: string): TodoItem[] {
    return this.todos().filter(todo => todo.day === day);
  }
}
