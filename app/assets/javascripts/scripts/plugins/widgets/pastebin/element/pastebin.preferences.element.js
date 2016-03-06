/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePastebinPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Pastebin Preferences Element
     * @param view
     * @param opts
     * @returns {PastebinPreferencesElement}
     * @constructor
     * @class PastebinPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PastebinPreferencesElement = function PastebinPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PastebinPreferencesElement.extend('PastebinPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
