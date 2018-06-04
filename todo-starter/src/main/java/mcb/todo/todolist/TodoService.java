package mcb.todo.todolist;

import mcb.todo.todolist.restmodel.TodoItemRequest;
import mcb.todo.todolist.restmodel.CreateTodoListRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.net.URI;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/todos")
public class TodoService {
    private TodoListRepository repository;
    private ToDoItemRepository itemRepository;
    @Autowired
    public TodoService(TodoListRepository repository, ToDoItemRepository itemRepository) {
        this.repository = repository;
        this.itemRepository=itemRepository;
    }

    @PostMapping
    public Mono<ResponseEntity> createTodoList(@RequestBody Mono<CreateTodoListRequest> request) {
        return request.map(r -> this.repository.save(new TodoList(r.getName())))
                .map(TodoList::getId)
                .map(id -> ResponseEntity.created(URI.create("/todo/" + id)).build());
    }

    @RequestMapping(value = "/{todoListId}/items", method = POST)
    public Mono<ResponseEntity> createTodoItem(@PathVariable() Long todoListId ,@RequestBody Mono<TodoItemRequest> request) {

               return  request.map(r ->
                {

                    TodoList list = this.repository.findById(todoListId).get();
                    list.addItem(r.getDescription());
                    this.repository.save(list);
                    return ResponseEntity.created(URI.create("/todo/" + todoListId)).build();
                });

    }

        @RequestMapping(value = "/{todoListId}/items/{todoItemId}", method = PATCH)
    public Mono<ResponseEntity> updateTodoItem(@PathVariable Long todoListId ,@PathVariable Long todoItemId,@RequestBody Mono<TodoItemRequest> request) {

        return  request.map(r ->
        {
            TodoList list = this.repository.findById(todoListId).get();
            TodoItem item = list.getItem(todoItemId);
            item.SetCompleted(r.getCompletion());
            this.repository.save(list);
            return ResponseEntity.created(URI.create("/todo/" + todoListId)).build();


        });

    }

    @RequestMapping(value = "/{todoListId}/items/{todoItemId}", method = DELETE)
    public ResponseEntity deleteTodoItem(@PathVariable Long todoListId ,@PathVariable Long todoItemId) {
            TodoList list = this.repository.findById(todoListId).get();
            list.removeItem(todoItemId);
            this.repository.save(list);
            return ResponseEntity.ok(URI.create("/todo/" + todoListId));


    }

    @GetMapping
    public ResponseEntity fetchTodoList() {
        return ResponseEntity.ok(repository.findAll());
    }

    @RequestMapping(value = "/{id}", method = GET)
public ResponseEntity fetchTodoListById(@PathVariable Long id) {
        return ResponseEntity.ok(repository.findById(id));
        }
}