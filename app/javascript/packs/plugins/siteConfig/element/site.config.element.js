/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */
import {PluginElement} from '../../plugin.element';

/**
 * @class SiteConfigElement
 * @extends PluginElement
 */
export class SiteConfigElement extends PluginElement {

  /**
   * @constructor
   * @param view
   * @param opts
   */
  constructor(view, opts) {
    super('SiteConfigElement', view, false);
    this._config(view, opts, $('<ul />')).build({
      $container: opts.$container
    });
  }
}