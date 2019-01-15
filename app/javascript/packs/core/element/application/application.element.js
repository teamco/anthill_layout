/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseElement} from '../../../modules/Element';

/**
 * Define Application element
 * @extends BaseElement
 * @class ApplicationElement
 * @type {ApplicationElement}
 * @constructor
 */
export class ApplicationElement extends BaseElement {

  /**
   * @param {ApplicationView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('ApplicationElement', view);
    this._config(view, opts, $('<application />')).build(opts);
    $(opts.$container).addClass(`${opts.mode} loading`);
  }

  /**
   * Hide/Show scroll
   * @memberOf ApplicationElement
   * @param {boolean} hide
   */
  hideScroll(hide) {
    this.$[(hide ? 'add' : 'remove') + 'Class']('overflow-scroll');
  }
}