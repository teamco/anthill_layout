/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineImagePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Image Preferences Element
     * @constructor
     * @class ImagePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     * @param {ImageView} view
     * @param opts
     * @returns {ImagePreferencesElement}
     */
    var ImagePreferencesElement = function ImagePreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);
        this.renderImagePlaceholder();

        return this;
    };

    return ImagePreferencesElement.extend('ImagePreferencesElement', {

        /**
         * Define image placeholder
         * @memberOf ImagePreferencesElement
         */
        renderImagePlaceholder: function renderImagePlaceholder() {

            // Get image prefs container
            var $container = $('legend:contains(Image)', this.$).next();

            $container.append(
                $('<img />')
            );
        }

    }, BaseElement.prototype, WidgetPreferences.prototype);

});