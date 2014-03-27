/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/preferences/widget.preferences'
], function defineImageGalleryPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define ImageGallery Preferences Element
     * @param view
     * @param opts
     * @returns {ImageGalleryPreferencesElement}
     * @constructor
     * @class ImageGalleryPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var ImageGalleryPreferencesElement = function ImageGalleryPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(opts.data);

        return this;
    };

    return ImageGalleryPreferencesElement.extend('ImageGalleryPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});