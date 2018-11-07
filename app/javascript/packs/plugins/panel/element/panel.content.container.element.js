/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * Define PanelContentContainer Element
 * @class PanelContentContainerElement
 * @extends PluginElement
 */
export class PanelContentContainerElement extends PluginElement {

  /**
   * @param {PanelView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('PanelContentContainerElement', view, false);
    this._config(view, opts, $('<li />')).build(opts);
  };
}