/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseElement} from '../../../modules/Element';

/**
 * @extends BaseElement
 * @class DeltaScrollElement
 * @type {DeltaScrollElement}
 */
export class DeltaScrollElement extends BaseElement {

  /**
   * @param {PageView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('DeltaScrollElement', view);
    this._config(view, opts, $('<div />')).build(opts);
  }
}