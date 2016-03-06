/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineMusTvPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define MusTv Preferences Element
     * @param view
     * @param opts
     * @returns {MusTvPreferencesElement}
     * @constructor
     * @class MusTvPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var MusTvPreferencesElement = function MusTvPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return MusTvPreferencesElement.extend('MusTvPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
