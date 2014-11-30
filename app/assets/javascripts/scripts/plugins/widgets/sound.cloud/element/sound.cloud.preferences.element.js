/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineSoundCloudPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define SoundCloud Preferences Element
     * @param view
     * @param opts
     * @returns {SoundCloudPreferencesElement}
     * @constructor
     * @class SoundCloudPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var SoundCloudPreferencesElement = function SoundCloudPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SoundCloudPreferencesElement.extend('SoundCloudPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
