import {ToDoItem} from './ToDoItem';

export class ToDoList {

  private _name: string;
  private _id: number;
  private _items: ToDoItem[];


  constructor(name: string) {
    this._items = new Array();
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get id(): number {
    return this._id;
  }

  get items(): ToDoItem[] {
    return this._items;
  }


  set name(value: string) {
    this._name = value;
  }

  set id(value: number) {
    this._id = value;
  }

  set items(value: ToDoItem[]) {
    this._items = value;
  }
}
