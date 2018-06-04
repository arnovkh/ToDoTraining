import {Injectable, Type} from '@angular/core';
import {ToDoItem} from './ToDoItem';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {filter, map} from 'rxjs/operators';
import {ToDoList} from './ToDoList';
import any = jasmine.any;

@Injectable()
export class TodoService {
  private _lists: Observable<ToDoList[]>;
  private _items: Observable<ToDoItem[]>;
  constructor(private http: HttpClient ) {
    this.refreshTodoList();
  }

  get lists(): Observable<ToDoList[]>
  {
    return this._lists;
  }
  private refreshTodoList() {
    return this._items = this.http.get<any[]>('http://localhost:8083/todos').pipe(map(r => {
      return r[0].items;
    }));
  }

  private refreshTodoLists() {
    return this._lists = this.http.get<any[]>('http://localhost:8083/todos').pipe(map(r => {
      return r;
    }));
  }
  //
  // public addItem( item: string): void {
  //   this.http.post('http://localhost:8083/todos/1/items', {description: item})
  //     .subscribe(() => this.refreshTodoList());
  // }
  //
  // public removeItemWithIndex(indexToRemove: number): void {
  //   this.http.delete(`http://localhost:8083/todos/1/items/${indexToRemove}`, {}).subscribe(
  //     () =>  this.refreshTodoList());
  //
  //
  // }
  //
  // public setItemCompletion(indexToComplete: number, itemState: boolean): void {
  //   this.http.patch(`http://localhost:8083/todos/1/items/${indexToComplete}`, {completed: itemState})
  //     .subscribe(() => this.refreshTodoList());
  // }


  public addItem( listid: number, item: string): void {
    this.http.post(`http://localhost:8083/todos/${listid}/items`, {description: item})
      .subscribe(() => this.refreshTodoLists());
  }

  public removeItemWithIndex( listid: number, indexToRemove: number): void {
    this.http.delete(`http://localhost:8083/todos/${listid}/items/${indexToRemove}`, {}).subscribe(
      () =>  this.refreshTodoLists());


  }

  public setItemCompletion( listid: number, indexToComplete: number, itemState: boolean): void {
    this.http.patch(`http://localhost:8083/todos/${listid}/items/${indexToComplete}`, {completed: itemState})
      .subscribe(() => this.refreshTodoLists());
  }

  public GetItems(listId: number): Observable<ToDoItem[]> {
    //  this._lists.subscribe( l => {
    //    return l.filter(f => f.id === listId);
    //  }
    // );
    todoList : Observable<any[]> = this._lists.pipe(filter(item => item.id === listId));
    return todoList;
  }
}
