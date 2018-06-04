
export class ToDoItem {
  private _itemName: string;
  private _state: boolean;

  constructor(itemName: string, state: boolean = false) {
    this._itemName = itemName;
    this._state = state;
  }

  get itemName(): string  {
    return this._itemName;
  }
  get itemState(): boolean {
    return this._state;
  }
  set itemState(newState: boolean) {
    this._state = newState;
  }
}
