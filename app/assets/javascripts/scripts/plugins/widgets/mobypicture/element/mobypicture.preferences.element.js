/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineMobypicturePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Mobypicture Preferences Element
     * @param view
     * @param opts
     * @returns {MobypicturePreferencesElement}
     * @constructor
     * @class MobypicturePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var MobypicturePreferencesElement = function MobypicturePreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return MobypicturePreferencesElement.extend('MobypicturePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
