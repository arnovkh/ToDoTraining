package mcb.todo.todolist;

import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.platform.commons.util.ExceptionUtils;
import org.junit.rules.ExpectedException;

import java.io.IOException;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.Assert.fail;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class ToDoListTest {


    @Test
    public void runAddItemToList() {
        TodoList testList = new TodoList("test list");
        int initialListCount = testList.getItems().size();
        try {
            testList.addItem("new item");
        } catch (Exception e) {
            e.printStackTrace();
        }
        int newListFile = testList.getItems().size();
        assertThat(newListFile, equalTo(initialListCount + 1));

    }

    @Test
    public void runAddItemToListWithDuplicate() {
        TodoList testList = new TodoList("test list");
        try {
            testList.addItem("test item");
        } catch (IllegalStateException ignored) {
            fail("should not throw");
        }
        assertThrows(IllegalStateException.class, () -> testList.addItem("test item"));


    }

    @Test
    public void removeAddItemToList() {
        TodoList testList = new TodoList("test list");

        testList.addItem("new item1");
        testList.addItem("new item2");
        int initialListCount = testList.getItems().size();
        try {
            TodoItem itemToRemove = new TodoItem("new item1" );
            testList.removeItem(2l);
        } catch (Exception e) {
            e.printStackTrace();
        }
        int newListFile = testList.getItems().size();
        assertThat(newListFile, equalTo(initialListCount - 1));

    }


//    @Test
//    public void AddListTest() {
//        TodoList testList = new TodoList("test list");
//
//        try {
//            testList.addItem("new item");
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        int newListFile = testList.getItems().size();
//        assertThat(newListFile, equalTo(initialListCount + 1));
//
//    }

}


