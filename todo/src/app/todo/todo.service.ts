import {Injectable} from '@angular/core';
import {ToDoItem} from './ToDoItem';
import {HttpClient} from '@angular/common/http';
import {ToDoList} from './ToDoList';

@Injectable()
export class TodoService {
  private _lists: ToDoList[];

  constructor(private http: HttpClient) {
    this._lists = [];
    this.refreshTodoLists();
  }

  get lists(): ToDoList[] {
    return this._lists;
  }

  private refreshTodoLists() {
    this.http.get<ToDoList[]>('http://localhost:8083/todos')
      .subscribe(lists => {
        this._lists = lists;
      });
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


  public addItem(listid: number = 1, item: string): void {
    this.http.post(`http://localhost:8083/todos/${listid}/items`, {description: item})
      .subscribe(() => this.refreshTodoLists());
  }

  public removeItemWithIndex(listid: number = 1, indexToRemove: number): void {
    this.http.delete(`http://localhost:8083/todos/${listid}/items/${indexToRemove}`, {}).subscribe(
      () => this.refreshTodoLists());


  }

  public setItemCompletion(listid: number, indexToComplete: number, itemState: boolean): void {
    this.http.patch(`http://localhost:8083/todos/${listid}/items/${indexToComplete}`, {completed: itemState})
      .subscribe(() => this.refreshTodoLists());
  }

  public GetItems(listId: number = 1): ToDoItem[] {
    const todoList = this._lists.filter(list => list.id === listId);
    return todoList.length > 0 ? todoList[0].items : [];
  }
}
