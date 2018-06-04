package mcb.todo.todolist.restmodel;

public class TodoItemRequest {
    private String description;
    private Long listId;
    private Boolean completed;
    public String getDescription() {
        return description;
    }
    public Long getListId() {
        return listId;
    }
    public Boolean getCompletion() {
        return completed;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
    public void setListId(Long listId) {
        this.listId = listId;
    }
}
