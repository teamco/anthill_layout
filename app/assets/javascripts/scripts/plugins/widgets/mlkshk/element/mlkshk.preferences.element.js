/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineMlkshkPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Mlkshk Preferences Element
     * @param view
     * @param opts
     * @returns {MlkshkPreferencesElement}
     * @constructor
     * @class MlkshkPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var MlkshkPreferencesElement = function MlkshkPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return MlkshkPreferencesElement.extend('MlkshkPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
