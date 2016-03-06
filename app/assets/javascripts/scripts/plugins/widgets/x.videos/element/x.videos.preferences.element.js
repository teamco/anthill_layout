/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineXVideosPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define XVideos Preferences Element
     * @param view
     * @param opts
     * @returns {XVideosPreferencesElement}
     * @constructor
     * @class XVideosPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var XVideosPreferencesElement = function XVideosPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return XVideosPreferencesElement.extend('XVideosPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
