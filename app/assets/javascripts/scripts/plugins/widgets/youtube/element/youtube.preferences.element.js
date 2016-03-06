/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineYoutubePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Youtube Preferences Element
     * @param view
     * @param opts
     * @returns {YoutubePreferencesElement}
     * @constructor
     * @class YoutubePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var YoutubePreferencesElement = function YoutubePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return YoutubePreferencesElement.extend('YoutubePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});