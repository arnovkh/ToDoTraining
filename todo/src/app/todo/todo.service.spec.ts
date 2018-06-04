
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TodoService } from './todo.service';


describe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    });
  });

  it('should be created', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));

  it('a new item added should be reflected in the list', inject([TodoService], (service: TodoService) => {
    const initialLength = service.items.length;
    service.addItem('new item');
    expect(service.items.length).toBe(initialLength + 1, 'Should be ' + (initialLength + 1));
  }));

  it('a new item should match the latest value added', inject([TodoService], (service: TodoService) => {
    const initialLength = service.items.length;
    const addedItem = 'new item';
    service.addItem(addedItem);
    expect(service.items[initialLength].itemName).toBe(addedItem, 'Should be ' + addedItem);
  }));

  it('an item should be removed from the list', inject([TodoService], (service: TodoService) => {
    const initialLength = service.items.length;
    service.removeItemWithIndex(2);
    expect(service.items.length).toBe(initialLength - 1 , 'Should be ' + (initialLength - 1) );
  }));

});
