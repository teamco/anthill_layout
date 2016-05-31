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
    'plugins/widgets/getty.images/element/getty.images.element',
    'plugins/widgets/getty.images/element/getty.images.preferences.element',
    'plugins/widgets/getty.images/element/getty.images.rules.element'
], function defineGettyImagesView(BaseView, Header, Footer, GettyImagesElement, GettyImagesPreferencesElement, GettyImagesRulesElement) {

    /**
     * Define view
     * @class GettyImagesView
     * @extends BaseView
     * @constructor
     */
    var GettyImagesView = function GettyImagesView() {
    };

    return GettyImagesView.extend('GettyImagesView', {

        /**
         * Render GettyImages element
         * @memberOf GettyImagesView
         */
        renderGettyImages: function renderGettyImages() {

            this.header(Header, this.get$container());

            /**
             * Define $gettyimages
             * @type {GettyImagesElement}
             */
            this.elements.$gettyimages = new GettyImagesElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf GettyImagesView
         * @returns {GettyImagesPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define GettyImages Preferences Element
             * @type {GettyImagesPreferencesElement}
             */
            this.elements.$preferences = new GettyImagesPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf GettyImagesView
         * @param widgetRules
         * @param contentRules
         * @returns {GettyImagesRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define GettyImages Rules Element
             * @type {GettyImagesRulesElement}
             */
            this.elements.$rules = new GettyImagesRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render GettyImages
         * @memberOf GettyImagesView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderGettyImages.bind(this)
            );
        }

    }, BaseView.prototype);
});
