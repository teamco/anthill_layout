/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

import $ from 'jquery';
import {BaseElement} from '../../modules/Element';

/**
 * Define Footer Element
 * @class FooterElement
 * @type {FooterElement}
 * @extends BaseElement
 */
export class FooterElement extends BaseElement {

  /**
   * @param view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('FooterElement', view);

    if (!view.getConfigHTML('footer')) {
      return this;
    }

    this._config(view, opts, $('<footer />')).build(opts);
  }
}
