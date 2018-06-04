import {Component, Input, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-input-box',
  templateUrl: './todo-input-box.component.html',
  styleUrls: ['./todo-input-box.component.css']
})
export class TodoInputBoxComponent implements OnInit {
  @Input() listId: number;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  addItem(listId: number, newItem: string) {
    this.todoService.addItem(listId, newItem);


  }


}
