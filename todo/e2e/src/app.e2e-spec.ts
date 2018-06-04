import {element} from 'protractor';

describe('todo list', () => {
  it('should be able to add and remove a todo item', async function () {
      browser.get('http://localhost:4200');
      const todoItems = element.all(by.css('li.todo-item'));
      const initialTodoItemsCount = await todoItems.count();
      element(by.css('.add-item')).sendKeys('automated ui tests');
      element(by.css('button')).click();

      expect(todoItems
        .count()).toEqual(initialTodoItemsCount + 1);

      expect(todoItems.get(initialTodoItemsCount).element(by.css('.todo-item-description')).getText()).toEqual('automated ui tests');
      element.all(by.css('button.remove-item'))
        .get(initialTodoItemsCount).click();
      expect(todoItems.count()).toEqual(initialTodoItemsCount);
      const actual = todoItems.filter(e => e.getText() === 'automated ui tests').count();
      expect(actual).toEqual(0);
    }
  );
});
