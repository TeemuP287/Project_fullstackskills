import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaskListComponent } from './../app/components/task-list/task-list.component';
import { TaskService } from './../app/services/task.service'; // Lisätty TaskService
import { HttpClientModule } from '@angular/common/http'; // Lisätty HttpClientModule

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, TaskListComponent],
      imports: [HttpClientModule], // Lisätty HttpClientModule importsiin
      providers: [TaskService] // Lisätty TaskService providersiin
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'MEAN stack project' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('MEAN stack project');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('MEAN stack project');
  });
});
