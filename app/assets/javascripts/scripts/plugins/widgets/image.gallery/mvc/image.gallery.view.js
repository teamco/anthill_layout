/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/View',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/image.gallery/element/image.gallery.element',
    'plugins/widgets/image.gallery/element/image.gallery.preferences.element',
    'plugins/widgets/image.gallery/element/image.gallery.rules.element'
], function defineImageGalleryView(BaseView, Header, Footer, ImageGalleryElement, ImageGalleryPreferencesElement, ImageGalleryRulesElement) {

    /**
     * Define view
     * @class ImageGalleryView
     * @extends BaseView
     * @constructor
     */
    var ImageGalleryView = function ImageGalleryView() {
    };

    return ImageGalleryView.extend('ImageGalleryView', {

        /**
         * Render image.gallery element
         * @memberOf ImageGalleryView
         */
        renderImageGallery: function renderImageGallery() {

            this.header(Header, this.get$container());

            /**
             * Define $image.gallery
             * @type {ImageGalleryElement}
             */
            this.elements.$imagegallery = new ImageGalleryElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf ImageGalleryView
         * @returns {ImageGalleryPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define ImageGallery Preferences Element
             * @type {ImageGalleryPreferencesElement}
             */
            this.elements.$preferences = new ImageGalleryPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf ImageGalleryView
         * @param widgetRules
         * @param contentRules
         * @returns {ImageGalleryRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define ImageGallery Rules Element
             * @type {ImageGalleryRulesElement}
             */
            this.elements.$rules = new ImageGalleryRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render image.gallery
         * @memberOf ImageGalleryView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderImageGallery.bind(this)
            );
        }

    }, BaseView.prototype)

});