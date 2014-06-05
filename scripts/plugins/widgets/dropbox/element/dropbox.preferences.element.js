/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/preferences/widget.preferences'
], function defineDropboxPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Dropbox Preferences Element
     * @param view
     * @param opts
     * @returns {DropboxPreferencesElement}
     * @constructor
     * @class DropboxPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var DropboxPreferencesElement = function DropboxPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return DropboxPreferencesElement.extend('DropboxPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});