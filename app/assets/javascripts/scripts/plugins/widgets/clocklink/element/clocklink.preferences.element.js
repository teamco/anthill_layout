/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineClocklinkPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Clocklink Preferences Element
     * @constructor
     * @class ClocklinkPreferencesElement
     * @param {ClocklinkView} view
     * @param opts
     * @extends BaseElement
     * @extends WidgetPreferences
     * @returns {ClocklinkPreferencesElement}
     */
    var ClocklinkPreferencesElement = function ClocklinkPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ClocklinkPreferencesElement.extend('ClocklinkPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
