/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineFlickrPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Flickr Preferences Element
     * @param view
     * @param opts
     * @returns {FlickrPreferencesElement}
     * @constructor
     * @class FlickrPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var FlickrPreferencesElement = function FlickrPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FlickrPreferencesElement.extend('FlickrPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
