import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit, OnChanges {
  todo$ = inject(TodosService);

  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true })
  isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();

  editingText: string = '';

  @ViewChild('textInput') textInput?: ElementRef;

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["isEditing"]?.currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
  }

  changeTodo(): void {
    this.todo$.changeTodo(this.todo.id, this.editingText);
    this.setEditingId.emit(null);
  }

  setTodoInEditMode(): void {
    this.setEditingId.emit(this.todo.id);
  }

  removeTodo(): void {
    this.todo$.removeTodo(this.todo.id);
  }

  toggleTodo() {
    this.todo$.toggleTodo(this.todo.id);
  }
}
