/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/pages.preferences'
], function defineWorkspaceDataPreferencesElement(BaseElement, PagesPreferences) {

    /**
     * Define WorkspaceData Preferences Element
     * @param view
     * @param opts
     * @returns {WorkspaceDataPreferencesElement}
     * @constructor
     * @class WorkspaceDataPreferencesElement
     * @extends BaseElement
     * @extends PagesPreferences
     */
    var WorkspaceDataPreferencesElement = function WorkspaceDataPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(opts);

        return this;
    };

    return WorkspaceDataPreferencesElement.extend(
        'WorkspaceDataPreferencesElement', {},
        BaseElement.prototype,
        PagesPreferences.prototype
    );
});