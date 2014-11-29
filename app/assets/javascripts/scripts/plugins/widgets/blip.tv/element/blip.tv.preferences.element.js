/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineBlipTvPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define BlipTv Preferences Element
     * @param view
     * @param opts
     * @returns {BlipTvPreferencesElement}
     * @constructor
     * @class BlipTvPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var BlipTvPreferencesElement = function BlipTvPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return BlipTvPreferencesElement.extend('BlipTvPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
