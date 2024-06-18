// task-list.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Lisätty HttpClientTestingModule
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service'; // Lisätty TaskService
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [TaskListComponent],
    imports: [],
    providers: [TaskService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] // Lisätty TaskService providers-taulukkoon
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