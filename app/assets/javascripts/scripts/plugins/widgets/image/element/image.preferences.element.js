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

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);
        this.renderImagePlaceholder();

        return this;
    };

    return ImagePreferencesElement.extend(
        'ImagePreferencesElement', {

            /**
             * Define image placeholder
             * @memberOf ImagePreferencesElement
             */
            renderImagePlaceholder: function renderImagePlaceholder() {

                // Get image prefs container
                var $container = $('#content', this.$);

                $container.append('<img class="image-preview" />');

                // Update image
                var $url = $('textarea[name="imageUrl"]', $container);

                this.updatePreviewImage(
                    this, {
                        target: $url[0]
                    }
                );
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
                var $img = $('img.image-preview', $modal.$),
                    target = event.target,
                    view = this.view,
                    $item = view.get$item();

                if (!target) {
                    view.scope.logger.debug('Undefined target', event);
                    return false;
                }

                // Get callback
                var callback = 'update' + target.name.replace(/image/, '');

                if (typeof $item[callback] !== 'function') {

                    view.scope.logger.warn('Undefined callback', callback);
                    return false;
                }

                $item[callback]($img, target.value);
            }
        },
        BaseElement.prototype,
        WidgetPreferences.prototype
    );
});