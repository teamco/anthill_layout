/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineRadikalFotoPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define RadikalFoto Preferences Element
     * @param view
     * @param opts
     * @returns {RadikalFotoPreferencesElement}
     * @constructor
     * @class RadikalFotoPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var RadikalFotoPreferencesElement = function RadikalFotoPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return RadikalFotoPreferencesElement.extend('RadikalFotoPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
