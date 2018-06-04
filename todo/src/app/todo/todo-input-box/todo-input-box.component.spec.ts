import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { TodoInputBoxComponent } from './todo-input-box.component';
import {FormsModule} from '@angular/forms';
import {TodoService} from '../todo.service';
import {By} from '@angular/platform-browser';
import {ToDoItem} from '../ToDoItem';

describe('TodoInputBoxComponent', () => {
  let component: TodoInputBoxComponent;
  let fixture: ComponentFixture<TodoInputBoxComponent>;
  let todoService: Partial<TodoService>;

  beforeEach(async(() => {
    todoService = {
      items: [
        new ToDoItem('feed the cat'),
        new ToDoItem('walk the dog'),
        new ToDoItem('make coffee')
      ],
      addItem: function(newItem: string) {}
    };
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ TodoInputBoxComponent ],
      providers: [{provide: TodoService, useValue: todoService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should increment the list', inject([TodoService], (service: TodoService) => {
    const spy = spyOn(service, 'addItem');
    const newItem = 'a new item';
    service.addItem(newItem);
    expect(service.addItem).toHaveBeenCalledWith(newItem);
  }));
});
