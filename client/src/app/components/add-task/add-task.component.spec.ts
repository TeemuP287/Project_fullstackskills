// add-task.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Lisätty HttpClientTestingModule
import { AddTaskComponent } from './add-task.component';
import { TaskService } from '../../services/task.service'; // Lisätty TaskService
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AddTaskComponent],
    imports: [],
    providers: [TaskService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] // Lisätty TaskService providers-taulukkoon
})
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});