/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineGiphyPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Giphy Preferences Element
     * @param view
     * @param opts
     * @returns {GiphyPreferencesElement}
     * @constructor
     * @class GiphyPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var GiphyPreferencesElement = function GiphyPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return GiphyPreferencesElement.extend('GiphyPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
