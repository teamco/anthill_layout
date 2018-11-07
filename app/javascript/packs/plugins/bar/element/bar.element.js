/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * Define Bar Element
 * @class BarElement
 * @extends PluginElement
 */
export class BarElement extends PluginElement {

  /**
   * @param {BarView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('BarElement', view, false);
    this._config(view, opts, $(this.getTemplate())).build(opts);
  };

  /**
   * Define template
   * @memberOf BarElement
   * @returns {string}
   */
  getTemplate() {
    return '<ul class="nav" />';
  }

  /**
   * Define content container
   * @memberOf BarElement
   * @returns {*}
   */
  getContentContainer() {
    return this.$.find('.nav');
  }
}