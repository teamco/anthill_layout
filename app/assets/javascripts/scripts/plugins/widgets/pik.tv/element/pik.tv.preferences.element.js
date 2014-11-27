/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePikTvPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define PikTv Preferences Element
     * @param view
     * @param opts
     * @returns {PikTvPreferencesElement}
     * @constructor
     * @class PikTvPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PikTvPreferencesElement = function PikTvPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PikTvPreferencesElement.extend('PikTvPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
