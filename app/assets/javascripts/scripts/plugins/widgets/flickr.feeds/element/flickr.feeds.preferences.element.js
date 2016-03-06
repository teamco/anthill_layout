/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineFlickrFeedsPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define FlickrFeeds Preferences Element
     * @param view
     * @param opts
     * @returns {FlickrFeedsPreferencesElement}
     * @constructor
     * @class FlickrFeedsPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var FlickrFeedsPreferencesElement = function FlickrFeedsPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FlickrFeedsPreferencesElement.extend('FlickrFeedsPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
