/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineWebrtcVideoChatPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define WebrtcVideoChat Preferences Element
     * @constructor
     * @class WebrtcVideoChatPreferencesElement
     * @param {WebrtcVideoChatView} view
     * @param opts
     * @extends BaseElement
     * @extends WidgetPreferences
     * @returns {WebrtcVideoChatPreferencesElement}
     */
    var WebrtcVideoChatPreferencesElement = function WebrtcVideoChatPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return WebrtcVideoChatPreferencesElement.extend('WebrtcVideoChatPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
