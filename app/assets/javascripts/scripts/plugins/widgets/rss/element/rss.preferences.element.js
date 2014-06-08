/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineRssPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Rss Preferences Element
     * @param view
     * @param opts
     * @returns {RssPreferencesElement}
     * @constructor
     * @class RssPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var RssPreferencesElement = function RssPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return RssPreferencesElement.extend('RssPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});