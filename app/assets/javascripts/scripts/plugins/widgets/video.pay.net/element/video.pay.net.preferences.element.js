/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineVideoPayNetPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define VideoPayNet Preferences Element
     * @param view
     * @param opts
     * @returns {VideoPayNetPreferencesElement}
     * @constructor
     * @class VideoPayNetPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var VideoPayNetPreferencesElement = function VideoPayNetPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return VideoPayNetPreferencesElement.extend('VideoPayNetPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
