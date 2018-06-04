package mcb.todo.todolist;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Entity
public class TodoList {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<TodoItem> items;

    protected TodoList() {
    }

    public TodoList(String name) {
        this.name = name;
        items = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<TodoItem> getItems() {
        return items;
    }

    public TodoItem getItem(Long id)
    {
        return items.stream()
                .filter( el -> el.getId() == id).findFirst().orElseThrow(() -> new IllegalArgumentException());
    }

    public void addItem(String itemDescription) throws IllegalStateException {
        var existingItemCount = items.stream().filter(str -> str.getDescription().equals(itemDescription)).count();
        if (existingItemCount == 0) {
            TodoItem toDoItem = new TodoItem(itemDescription);

            items.add(toDoItem);
        } else {
            throw new IllegalStateException("item already exists in list");
        }
    }

    public void removeItem(Long itemId ) throws IllegalStateException {
        var existingItemCount = items.stream().filter(str -> str.getId().equals(itemId)).count();
        if (existingItemCount > 0) {
            this.items =   items.stream().filter(str -> !str.getId().equals(itemId)).collect(toList());
        } else {
            throw new IllegalStateException("item does not exist in list");
        }
    }
}
