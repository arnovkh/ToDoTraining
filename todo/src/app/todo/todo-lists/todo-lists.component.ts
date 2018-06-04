import {Component, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.css']
})

export class TodoListsComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

}
