/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../../../core/lib/extends/aggregation.js');

/**
 * @constant PluginElement
 * @type {module.PluginElement}
 */
const PluginElement = require('../../plugin.element.js');

/**
 * @constant PagesPreferences
 * @type {module.PagesPreferences}
 */
const PagesPreferences = require('../../preferences/pages.preferences.js');

/**
 * @class WorkspaceDataPreferencesElement
 * @extends {PluginElement}
 * @type {module.WorkspaceDataPreferencesElement}
 */
module.exports = class WorkspaceDataPreferencesElement extends aggregation(PluginElement, PagesPreferences) {

  /**
   * @constructor
   * @param {WorkspaceData} view
   * @param opts
   */
  constructor(view, opts) {
    super('WorkspaceDataPreferencesElement', view, false);
    this._config(view, opts, $('<ul />')).build(opts);
    this.renderData(opts);
  }
};
