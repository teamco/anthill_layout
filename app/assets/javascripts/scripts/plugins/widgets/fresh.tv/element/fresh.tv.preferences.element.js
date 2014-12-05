/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineFreshTvPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define FreshTv Preferences Element
     * @param view
     * @param opts
     * @returns {FreshTvPreferencesElement}
     * @constructor
     * @class FreshTvPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var FreshTvPreferencesElement = function FreshTvPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FreshTvPreferencesElement.extend('FreshTvPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
