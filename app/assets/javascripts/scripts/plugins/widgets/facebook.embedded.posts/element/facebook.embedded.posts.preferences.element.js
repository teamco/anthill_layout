/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineFacebookEmbeddedPostsPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define FacebookEmbeddedPosts Preferences Element
     * @constructor
     * @class FacebookEmbeddedPostsPreferencesElement
     * @param {FacebookEmbeddedPostsView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {FacebookEmbeddedPostsPreferencesElement}
     */
    var FacebookEmbeddedPostsPreferencesElement = function FacebookEmbeddedPostsPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FacebookEmbeddedPostsPreferencesElement.extend(
        'FacebookEmbeddedPostsPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
