/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePhotobucketPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Photobucket Preferences Element
     * @param view
     * @param opts
     * @returns {PhotobucketPreferencesElement}
     * @constructor
     * @class PhotobucketPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PhotobucketPreferencesElement = function PhotobucketPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PhotobucketPreferencesElement.extend('PhotobucketPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
