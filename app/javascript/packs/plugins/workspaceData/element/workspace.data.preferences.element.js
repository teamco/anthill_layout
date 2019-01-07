/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';
import {PagesPreferences} from '../../preferences/pages.preferences';
import {aggregation} from '../../../lib/extends/aggregation';

/**
 * @class WorkspaceDataPreferencesElement
 * @extends {PluginElement}
 * @type {WorkspaceDataPreferencesElement}
 */
export class WorkspaceDataPreferencesElement extends aggregation(PluginElement, PagesPreferences) {

  /**
   * @constructor
   * @param {WorkspaceDataView} view
   * @param opts
   */
  constructor(view, opts) {
    super('WorkspaceDataPreferencesElement', view, false);
    this._config(view, opts, $('<ul />')).build(opts);
    this.renderData(opts);
  }
}
