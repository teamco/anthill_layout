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
    'plugins/widgets/youtube/element/youtube.element',
    'plugins/widgets/youtube/element/youtube.preferences.element',
    'plugins/widgets/youtube/element/youtube.rules.element'
], function defineYoutubeView(BaseView, Header, Footer, YoutubeElement, YoutubePreferencesElement, YoutubeRulesElement) {

    /**
     * Define view
     * @class YoutubeView
     * @extends BaseView
     * @constructor
     */
    var YoutubeView = function YoutubeView() {
    };

    return YoutubeView.extend('YoutubeView', {

        /**
         * Render youtube element
         * @member YoutubeView
         */
        renderYoutube: function renderYoutube() {

            this.header(Header, this.elements.$container);

            /**
             * Define $youtube
             * @type {YoutubeElement}
             */
            this.elements.$youtube = new YoutubeElement(this, {
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
         * @member YoutubeView
         * @returns {YoutubePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Youtube Preferences Element
             * @type {YoutubePreferencesElement}
             */
            this.elements.$preferences = new YoutubePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member YoutubeView
         * @param widgetRules
         * @param contentRules
         * @returns {YoutubeRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Youtube Preferences Element
             * @type {YoutubeRulesElement}
             */
            this.elements.$rules = new YoutubeRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render youtube
         * @member YoutubeView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderYoutube.bind(this)
            );
        }

    }, BaseView.prototype)

});