import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import {TodoService} from '../todo.service';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {ToDoItem} from '../ToDoItem';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: Partial<TodoService>;

  beforeEach(async(() => {
    todoService = {
      items: [
        new ToDoItem('feed the cat'),
        new ToDoItem('walk the dog'),
        new ToDoItem('make coffee')
      ],
      removeItemWithIndex: function(indexToRemove: number) {}
    };
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      providers: [{provide: TodoService, useValue: todoService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the todo list', () => {
    const items = fixture.debugElement.queryAll(By.css('li'));
    expect(items.length).toBe(3);
  });
  it('should remove item from the list', inject([TodoService], (service: TodoService) => {
    const spy = spyOn(service, 'removeItemWithIndex');
    const indexToRemove = 2;
    service.removeItemWithIndex(indexToRemove);
    expect(service.removeItemWithIndex).toHaveBeenCalledWith(indexToRemove);
  }));
  it('should set state to true if checked', inject([TodoService], (service: TodoService) => {
    const spy = spyOn(component, 'setItemCompletion');
    component.setItemCompletion(1, true );
    expect(component.setItemCompletion).toHaveBeenCalled();
  }));

});
