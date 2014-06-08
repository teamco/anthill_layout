/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineJwplayerPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Jwplayer Preferences Element
     * @param view
     * @param opts
     * @returns {JwplayerPreferencesElement}
     * @constructor
     * @class JwplayerPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var JwplayerPreferencesElement = function JwplayerPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return JwplayerPreferencesElement.extend('JwplayerPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});