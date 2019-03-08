/**
 * @method
 * @param node
 * @param type
 * @private
 */
export const _it = (node, type) => {
  it(`${type}: should be defined`, async () => {
    expect(node[type]).toBeDefined();
  });
};

/**
 * @constant
 * @param node
 * @param order
 * @param render
 */
export const mvcExpectation = (node, order = 1, render = true, __it = true) => {

  it(`should be created`, async () => {
    expect(node instanceof node.constructor).toBeTruthy();
  });

  _it(node, 'api');
  _it(node, 'controller');
  _it(node, 'eventManager');
  _it(node, 'observer');
  _it(node, 'permission');

  if (render) {
    it(`order: should be ${order}`, async () => {
      expect(node.model.getConfig('order')).toBe(order);
    });

    _it(node, 'model');
    _it(node, 'view');
  }
};