import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  todo$ = inject(TodosService);
  editingId: string | null = null;

  visibleTodos = computed(() => {
    const todos = this.todo$.todosSig();
    const filter = this.todo$.filterSig();

    if (filter === FilterEnum.active) {
      return todos.filter(todo => !todo.isCompleted);
    } else if (filter === FilterEnum.completed) {
      return todos.filter(todo => todo.isCompleted);
    }
    return todos;
  });

  isAllTodosSelected = computed(() => this.todo$.todosSig().every((todo) => todo.isCompleted));

  noTodosClass = computed(() => {
    return this.todo$.todosSig().length === 0;
  });

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todo$.toggleAll(target.checked);
  }
}
