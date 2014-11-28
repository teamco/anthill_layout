/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineHromadskeTvPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define HromadskeTv Preferences Element
     * @param view
     * @param opts
     * @returns {HromadskeTvPreferencesElement}
     * @constructor
     * @class HromadskeTvPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var HromadskeTvPreferencesElement = function HromadskeTvPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return HromadskeTvPreferencesElement.extend('HromadskeTvPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
