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
 * @class WidgetContentElement
 * @type {WidgetContentElement}
 */
export class WidgetContentElement extends BaseElement {

  /**
   * @param {WidgetView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WidgetContentElement', view);
    this._config(view, opts, $('<resource />')).build(opts);
    this.setPadding();
    this.setBackgroundImage(opts);
  }

  /**
   * Set background image
   * @memberOf WidgetContentElement
   * @param {{resource: string}} opts
   */
  setBackgroundImage(opts) {
    this.$.addClass(opts.resource.replace(/\./g, '-'));
  }

  /**
   * Set padding
   * @memberOf WidgetContentElement
   */
  setPadding() {
    const padding = this.view.controller.getLocalPadding();
    this.$.css(padding);
  }

  /**
   * Clean Metamorphic Content
   * @memberOf WidgetContentElement
   */
  cleanMetamorphicContent() {
    if (!this.isMetamorphicElement()) {
      return false;
    }
    $('> *', this.$).not(':hidden').remove();
  }
}