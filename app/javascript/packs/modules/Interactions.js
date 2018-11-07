/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/21/13
 * Time: 4:14 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @class Interactions
 * @type {Interactions}
 */
export class Interactions {

  /**
   * Check permission
   * @memberOf Interactions
   */
  checkPermission() {
    this.scope.permission.check({
      capability: this.capability.toLowerCase(),
      callback: () => this.init()
    });
  }

  /**
   * Debug UI
   * @memberOf Interactions
   * @param {Event} event
   * @param ui
   */
  debugUI(event, ui) {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope,
        eventName = scope.eventManager.eventList.debugInteractions;

    if (eventName) {
      scope.observer.publish(eventName, [this.scope, event, ui]);
    }
  }

  /**
   * Check if enabled
   * @memberOf Interactions
   * @returns {boolean}
   */
  isEnabled() {
    return true;
  }

  /**
   * Check if disabled
   * @memberOf Interactions
   * @returns {boolean}
   */
  isDisabled() {
    return !this.isEnabled();
  }

  /**
   * Get resize direction
   * @memberOf Interactions
   * @param ui
   * @returns {string}
   */
  getResizeDirection(ui) {

    /**
     * Get South/East direction
     * @param {number} side
     * @param {number} dir
     * @returns {boolean}
     * @private
     */
    function _getSE(side, dir) {
      return !side && (dir || dir < 0);
    }

    /**
     * Get North/West direction
     * @param {number} side
     * @param {number} dir
     * @returns {boolean}
     * @private
     */
    function _getNW(side, dir) {
      return (side < 0 || side) && (dir || dir < 0);
    }

    // determine resize deltas
    const delta_x = ui.size.width - ui.originalSize.width;
    const delta_y = ui.size.height - ui.originalSize.height;

    const delta_top = ui.position.top - ui.originalPosition.top;
    const delta_left = ui.position.left - ui.originalPosition.left;

    // build direction string
    let dir = '';

    if (_getSE(delta_top, delta_y)) {
      dir += 's';
    }

    if (_getNW(delta_top, delta_y)) {
      dir += 'n';
    }

    if (_getSE(delta_left, delta_x)) {
      dir += 'e';
    }

    if (_getNW(delta_left, delta_x)) {
      dir += 'w';
    }

    return dir;
  }

  /**
   * Get West
   * @memberOf Interactions
   * @param ui
   * @returns {{left: number, width: number}}
   */
  getDirectionW(ui) {

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.scope;

    /**
     * Set delta left
     * @type {number}
     */
    const deltaLeft = ui.position.left - ui.originalPosition.left;

    /**
     * Set delta width
     * @type {number}
     */
    const deltaWidth = widget.dom.width - deltaLeft;

    return {
      left: widget.dom.left + deltaLeft,
      width: deltaWidth
    };
  }

  /**
   * Get East
   * @memberOf Interactions
   * @param ui
   * @returns {{width: number}}
   */
  getDirectionE(ui) {

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.scope;

    /**
     * Set delta width
     * @type {number}
     */
    const deltaWidth = ui.size.width - ui.originalSize.width;
    return {width: widget.dom.width + deltaWidth};
  }

  /**
   * Get North
   * @memberOf Interactions
   * @param ui
   * @returns {{height: number, top: number}}
   */
  getDirectionN(ui) {

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.scope;

    /**
     * Set delta width
     * @type {number}
     */
    const deltaHeight = ui.size.height - ui.originalSize.height;

    /**
     * Set delta top
     * @type {number}
     */
    const deltaTop = ui.position.top - ui.originalPosition.top;

    return {
      height: widget.dom.height + deltaHeight,
      top: widget.dom.top + deltaTop
    };
  }

  /**
   * Get South
   * @memberOf Interactions
   * @param ui
   * @returns {{height: number}}
   */
  getDirectionS(ui) {

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.scope;

    /**
     * Set delta width
     * @type {number}
     */
    const deltaHeight = ui.size.height - ui.originalSize.height;

    return {height: widget.dom.height + deltaHeight};
  }
}
