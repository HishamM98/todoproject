import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  todo$ = inject(TodosService);
  filterSig = this.todo$.filterSig;
  filterEnum = FilterEnum;
  activeCount = computed(() => {
    return this.todo$.todosSig().filter(todo => !todo.isCompleted).length;
  });
  noTodosClass = computed(() => {
    return this.todo$.todosSig().length === 0;
  });
  itemsLeftText = computed(() => `item${this.activeCount() !== 1 ? 's' : ''} left`);
  noCompletedTodos = computed(() => {
    const todos = this.todo$.todosSig();
    return todos.filter(todo => todo.isCompleted).length === 0;
  });

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todo$.changeFilter(filterName);
  }

  clearDoneTodos(): void {
    this.todo$.removeCompletedTodos();
  }
}