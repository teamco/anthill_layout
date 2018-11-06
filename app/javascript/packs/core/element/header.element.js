/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseElement} from '../../modules/Element';

/**
 * Define Header Element
 * @class HeaderElement
 * @type {module.HeaderElement}
 * @extends BaseElement
 */
export class HeaderElement extends BaseElement {

  /**
   * @param view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('HeaderElement', view);

    if (!view.getConfigHTML('header')) {
      return this;
    }

    this._config(view, opts, $('<header />')).build(opts);
  }
}