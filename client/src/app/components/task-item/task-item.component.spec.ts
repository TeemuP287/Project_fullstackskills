import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { Task } from '../../models/Task';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    // Määritä tarvittava input data testille
    component.task = new Task(
      null,
      'Test Task',
      'Description for test task',
      false,
      '2024-05-31',
      false,
      new Date(),
      null
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
