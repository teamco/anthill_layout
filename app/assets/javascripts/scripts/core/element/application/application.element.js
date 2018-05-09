/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseElement
 * @type {BaseElement|*}
 */
const BaseElement = require('../../lib/modules/Element.js');

/**
 * Define Application element
 * @extends BaseElement
 * @class ApplicationElement
 * @type {module.ApplicationElement}
 * @constructor
 */
module.exports = class ApplicationElement extends BaseElement {

  /**
   * Define Application element
   * @extends BaseElement
   * @class ApplicationElement
   * @param {ApplicationView} view
   * @param opts
   * @returns {*}
   * @constructor
   */
  constructor(view, opts) {
    super('ApplicationElement', view, false);
    this._config(view, opts, $('<div />')).build(opts);
    $(opts.$container).addClass(opts.mode);
  }

  /**
   * Hide/Show scroll
   * @property ApplicationElement
   * @param {boolean} hide
   */
  hideScroll(hide) {
    this.$[(hide ? 'add' : 'remove') + 'Class']('overflow-scroll');
  }
};