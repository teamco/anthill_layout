/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

defineP([
  'plugins/plugin.element',
  'plugins/preferences/pages.preferences'
], function defineWorkspaceDataPreferencesElement(PluginElement,
    PagesPreferences) {

  /**
   * Define WorkspaceData Preferences Element
   * @param view
   * @param opts
   * @returns {WorkspaceDataPreferencesElement}
   * @constructor
   * @class WorkspaceDataPreferencesElement
   * @extends PluginElement
   * @extends PagesPreferences
   */
  var WorkspaceDataPreferencesElement = function WorkspaceDataPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<ul />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderData(opts);

    return this;
  };

  return WorkspaceDataPreferencesElement.extend(
      'WorkspaceDataPreferencesElement', {},
      PluginElement.prototype,
      PagesPreferences.prototype
  );
});