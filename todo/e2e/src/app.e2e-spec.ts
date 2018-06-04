import {element} from 'protractor';
// https://github.com/arnovkh/ToDoTraining
describe('todo list', () => {
  it('should be able to add and remove a todo item', async function () {
      browser.get('http://localhost:4200');
      const todoItems = element.all(by.css('#list-1 li.todo-item'));
      const initialTodoItemsCount = await todoItems.count();
      element(by.css('#input-1.add-item')).sendKeys('automated ui tests');
    element(by.css('#btn-1')).click();

    expect(todoItems
      .count()).toEqual(initialTodoItemsCount + 1);

    expect(todoItems.get(initialTodoItemsCount).element(by.css('#list-1  .todo-item-description')).getText()).toEqual('automated ui tests');
    element.all(by.css('#list-1 button.remove-item'))
      .get(initialTodoItemsCount).click();
    expect(todoItems.count()).toEqual(initialTodoItemsCount);
    const actual = todoItems.filter(e => e.getText() === 'automated ui tests').count();
    expect(actual).toEqual(initialTodoItemsCount);
  }
);
});
