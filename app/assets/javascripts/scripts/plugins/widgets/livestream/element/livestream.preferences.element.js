/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineLivestreamPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Livestream Preferences Element
     * @param view
     * @param opts
     * @returns {LivestreamPreferencesElement}
     * @constructor
     * @class LivestreamPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var LivestreamPreferencesElement = function LivestreamPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return LivestreamPreferencesElement.extend('LivestreamPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
