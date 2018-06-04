package mcb.todo.todolist;

import org.springframework.data.repository.CrudRepository;


public interface ToDoItemRepository extends CrudRepository<TodoItem, Long>{
}

