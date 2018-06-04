import {Component, Input, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() listId: number;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }
  removeItem(listId: number , indexToRemove: number)  {
    console.log(indexToRemove);
    this.todoService.removeItemWithIndex(listId, indexToRemove);
  }

  setItemCompletion(listId: number , indexToComplete: number, itemState: boolean)  {
    this.todoService.setItemCompletion(listId, indexToComplete, itemState );
  }

}
