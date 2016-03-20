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
    'plugins/widgets/photobucket/element/photobucket.element',
    'plugins/widgets/photobucket/element/photobucket.preferences.element',
    'plugins/widgets/photobucket/element/photobucket.rules.element'
], function definePhotobucketView(BaseView, Header, Footer, PhotobucketElement, PhotobucketPreferencesElement, PhotobucketRulesElement) {

    /**
     * Define view
     * @class PhotobucketView
     * @extends BaseView
     * @constructor
     */
    var PhotobucketView = function PhotobucketView() {
    };

    return PhotobucketView.extend('PhotobucketView', {

        /**
         * Render photobucket element
         * @memberOf PhotobucketView
         */
        renderPhotobucket: function renderPhotobucket() {

            this.header(Header, this.getElementContainer());

            /**
             * Define $photobucket
             * @type {PhotobucketElement}
             */
            this.elements.$photobucket = new PhotobucketElement(this, {
                $container: this.get$container(),
                id: this.createUUID()
            });

            this.footer(Footer, this.getElementContainer());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf PhotobucketView
         * @returns {PhotobucketPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Photobucket Preferences Element
             * @type {PhotobucketPreferencesElement}
             */
            this.elements.$preferences = new PhotobucketPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf PhotobucketView
         * @param widgetRules
         * @param contentRules
         * @returns {PhotobucketRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Photobucket Rules Element
             * @type {PhotobucketRulesElement}
             */
            this.elements.$rules = new PhotobucketRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render photobucket
         * @memberOf PhotobucketView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPhotobucket.bind(this)
            );
        }

    }, BaseView.prototype)

});
