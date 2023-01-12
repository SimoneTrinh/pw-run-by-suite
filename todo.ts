import { Page } from "@playwright/test";

export const TODO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
];

export async function createDefaultTodos(page: Page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder("What needs to be done?");

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press("Enter");
  }
}

export async function checkNumberOfTodosInLocalStorage(
  page: Page,
  expected: number
) {
  return await page.waitForFunction((e) => {
    return JSON.parse(localStorage["react-todos"]).length === e;
  }, expected);
}

export async function checkNumberOfCompletedTodosInLocalStorage(
  page: Page,
  expected: number
) {
  return await page.waitForFunction((e) => {
    return (
      JSON.parse(localStorage["react-todos"]).filter(
        (todo: any) => todo.completed
      ).length === e
    );
  }, expected);
}
