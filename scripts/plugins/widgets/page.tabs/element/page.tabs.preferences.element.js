/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/preferences/widget.preferences'
], function definePageTabsPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define PageTabs Preferences Element
     * @param view
     * @param opts
     * @returns {PageTabsPreferencesElement}
     * @constructor
     * @class PageTabsPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PageTabsPreferencesElement = function PageTabsPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PageTabsPreferencesElement.extend('PageTabsPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});