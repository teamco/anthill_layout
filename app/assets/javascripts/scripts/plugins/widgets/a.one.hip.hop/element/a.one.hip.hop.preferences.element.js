/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineAOneHipHopPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define AOneHipHop Preferences Element
     * @param view
     * @param opts
     * @returns {AOneHipHopPreferencesElement}
     * @constructor
     * @class AOneHipHopPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var AOneHipHopPreferencesElement = function AOneHipHopPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return AOneHipHopPreferencesElement.extend('AOneHipHopPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
