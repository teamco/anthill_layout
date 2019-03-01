/**
 * @constant
 * @param node
 * @param order
 * @param render
 */
export const mvcExpectation = (node, order = 1, render = true) => {
  expect(node.api).toBeDefined();
  expect(node.controller).toBeDefined();
  expect(node.eventManager).toBeDefined();
  expect(node.observer).toBeDefined();
  expect(node.permission).toBeDefined();
  if (render) {
    expect(node.model.getConfig('order')).toBe(order);
    expect(node.model).toBeDefined();
    expect(node.view).toBeDefined();
  }
};