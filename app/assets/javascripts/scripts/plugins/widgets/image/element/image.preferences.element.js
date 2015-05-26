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

            $container.append([
                '<li class="image-preview">',
                '<img />',
                '</li>'
            ].join(''));
        },

        /**
         * Update preview image
         * @memberOf ImagePreferencesElement
         * @param {ModalElement} $modal
         * @param event
         */
        updatePreviewImage: function updatePreviewImage($modal, event) {

            /**
             * Get preview image
             * @type {*|jQuery|HTMLElement}
             */
            var $img = $('li.image-preview img', $modal.$),
                target = event.target;

            // Get callback
            var callback = 'update' + target.name.replace(/image/, '');

            if (typeof this[callback] !== 'function') {

                this.view.scope.logger.warn('Undefined callback', callback);
                return false;
            }

            this[callback]($img, target.value);
        },

        /**
         * Update url
         * @memberOf ImagePreferencesElement
         * @param $img
         * @param {string} src
         */
        updateUrl: function updateUrl($img, src) {

            var $range = $('li.range:first', $img.parents('ul:first'));

            $img.attr({src: src}).show().
                parent().css({
                    top: $range.position().top
                });
        }

    }, BaseElement.prototype, WidgetPreferences.prototype);

});