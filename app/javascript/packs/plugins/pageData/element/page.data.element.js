/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * @class PageDataElement
 * @extends PluginElement
 */
export class PageDataElement extends PluginElement {

  /**
   * @param {BaseView|PageDataView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('PageDataElement', view, false);
    this._config(view, opts, $('<ul />')).build(opts);
  }
}
