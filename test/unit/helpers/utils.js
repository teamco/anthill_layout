/**
 * @constant
 * @param node
 * @param order
 * @param render
 */
export const mvcExpectation = (node, order = 1, render = true) => {

  /**
   * @method
   * @param type
   * @private
   */
  function _it(type) {
    it(`${type}: should be defined`, async () => {
      expect(node[type]).toBeDefined();
    });
  }

  it(`should be created`, async () => {
    expect(node instanceof node.constructor).toBeTruthy();
  });

  _it('api');
  _it('controller');
  _it('eventManager');
  _it('observer');
  _it('permission');

  if (render) {
    it(`order: should be ${order}`, async () => {
      expect(node.model.getConfig('order')).toBe(order);
    });

    _it('model');
    _it('view');
  }
};