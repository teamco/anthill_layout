/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/preferences/widget.preferences'
], function defineImagePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Image Preferences Element
     * @param view
     * @param opts
     * @returns {ImagePreferencesElement}
     * @constructor
     * @class ImagePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var ImagePreferencesElement = function ImagePreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(opts.data);

        return this;
    };

    return ImagePreferencesElement.extend('ImagePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});