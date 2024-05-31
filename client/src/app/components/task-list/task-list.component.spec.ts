// task-list.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Lisätty HttpClientTestingModule
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service'; // Lisätty TaskService

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [HttpClientTestingModule], // Lisätty HttpClientTestingModule
      providers: [TaskService] // Lisätty TaskService providers-taulukkoon
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});