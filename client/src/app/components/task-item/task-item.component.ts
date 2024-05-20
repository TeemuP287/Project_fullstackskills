import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() deleteRequest = new EventEmitter<Task>();
  @Output() editRequest = new EventEmitter<Task>();
  @Output() toggleSelection = new EventEmitter<string>();
  @Output() hover = new EventEmitter<boolean>();

  hovered: boolean = false;

  constructor() {}

  toggleHover(): void {
    this.hovered = !this.hovered;
    this.hover.emit(this.hovered);
  }
}
