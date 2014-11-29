/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineMixcloudPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Mixcloud Preferences Element
     * @param view
     * @param opts
     * @returns {MixcloudPreferencesElement}
     * @constructor
     * @class MixcloudPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var MixcloudPreferencesElement = function MixcloudPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return MixcloudPreferencesElement.extend('MixcloudPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
