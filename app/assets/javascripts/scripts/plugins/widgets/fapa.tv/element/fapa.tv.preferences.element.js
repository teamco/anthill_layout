/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineFapaTvPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define FapaTv Preferences Element
     * @param view
     * @param opts
     * @returns {FapaTvPreferencesElement}
     * @constructor
     * @class FapaTvPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var FapaTvPreferencesElement = function FapaTvPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FapaTvPreferencesElement.extend('FapaTvPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
