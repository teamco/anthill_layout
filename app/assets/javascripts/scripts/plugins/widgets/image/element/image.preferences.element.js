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

            /**
             * Define range activation
             * @param {boolean} activate
             * @private
             */
            function _activateRange(activate) {
                $('li.range input', $img.parents('ul:first')).prop({
                    disabled: !activate
                });
            }

            var $range = $('li.range', $img.parents('ul:first')),
                border = parseInt($range.css('borderWidth'), 10),
                $element = this;

            $img.on('load', function _load() {

                $img.show().parent().css({
                    marginTop: -($range.outerHeight() + border * 2) * $range.length
                });

                _activateRange(true);
            });

            $img.on('error', function _error() {

                $element.view.scope.logger.warn(
                    'Unable to load image', arguments
                );

                _activateRange(false);
            });

            $img.attr({src: src});
        },

        /**
         * Define image css
         * @memberOf ImagePreferencesElement
         * @param $img
         * @param {string} value
         */
        defineCss: function defineCss($img, value) {

            /**
             * Define update css
             * @private
             */
            function _updateCss(css) {
                $img.css({
                    '-webkit-filter': css,
                    filter: css
                });
            }

            var _f = $img.css('filter'),
                _wf = $img.css('-webkit-filter');

            var _filter = _f === 'none' ?
                _wf === 'none' ? 'none' : _wf : _f;

            if (_filter === 'none') {

                _updateCss(value);
                return false;
            }

            var _css = _f.split(' '),
                _value = [], i = 0, l = _css.length;

            for (; i < l; i++) {

                var filter = _css[i];

                if (filter.indexOf(value.match(/\w+/)[0]) !== -1) {
                    filter = value;
                }

                _value.push(filter);
            }

            _updateCss(_value.join(' '));
        },

        /**
         * Update blur
         * @memberOf ImagePreferencesElement
         * @param $img
         * @param blur
         */
        updateBlur: function updateBlur($img, blur) {
            this.defineCss(
                $img, 'blur({0}px)'.replace(/\{0}/, blur)
            );
        },

        /**
         * Update saturate
         * @memberOf ImagePreferencesElement
         * @param $img
         * @param saturate
         */
        updateSaturate: function updateSaturate($img, saturate) {
            this.defineCss(
                $img, 'saturate({0})'.replace(/\{0}/, saturate)
            );
        }

    }, BaseElement.prototype, WidgetPreferences.prototype);

});