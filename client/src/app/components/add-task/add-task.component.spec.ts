// add-task.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Lisätty HttpClientTestingModule
import { AddTaskComponent } from './add-task.component';
import { TaskService } from '../../services/task.service'; // Lisätty TaskService

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      imports: [HttpClientTestingModule], // Lisätty HttpClientTestingModule
      providers: [TaskService] // Lisätty TaskService providers-taulukkoon
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