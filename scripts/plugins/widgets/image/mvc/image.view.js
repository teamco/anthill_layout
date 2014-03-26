/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/image/element/image.element',
    'plugins/widgets/image/element/image.preferences.element'
], function defineImageView(BaseView, Header, Footer, ImageElement, ImagePreferencesElement) {

    /**
     * Define view
     * @class ImageView
     * @extends BaseView
     * @constructor
     */
    var ImageView = function ImageView() {
    };

    return ImageView.extend('ImageView', {

        /**
         * Render image element
         * @member ImageView
         */
        renderImage: function renderImage() {

            this.header(Header, this.elements.$container);

            /**
             * Define $image
             * @type {ImageElement}
             */
            this.elements.$image = new ImageElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @member ImageView
         * @returns {ImagePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Image Preferences Element
             * @type {ImagePreferencesElement}
             */
            this.elements.$preferences = new ImagePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render image
         * @member ImageView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderImage.bind(this)
            );
        }

    }, BaseView.prototype)

});