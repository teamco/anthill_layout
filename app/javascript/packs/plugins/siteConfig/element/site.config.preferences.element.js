/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */
import {PluginElement} from '../../plugin.element';
import {aggregation} from '../../../lib/extends/aggregation';

// 'plugins/preferences/site.preferences'

/**
 * @class SiteConfigPreferencesElement
 * @extends {PluginElement}
 */
export class SiteConfigPreferencesElement extends aggregation(PluginElement) {

  /**
   * @constructor
   * @param view
   * @param opts
   */
  constructor(view, opts) {
    super('SiteConfigPreferencesElement', view, false);
    this._config(view, opts, $('<ul />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.getPreferencesHtml(opts.map);
  }
}
