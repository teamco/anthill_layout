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
    'plugins/widgets/emotion/element/emotion.element',
    'plugins/widgets/emotion/element/emotion.preferences.element',
    'plugins/widgets/emotion/element/emotion.rules.element'
], function defineEmotionView(BaseView, Header, Footer, EmotionElement, EmotionPreferencesElement, EmotionRulesElement) {

    /**
     * Define view
     * @class EmotionView
     * @extends BaseView
     * @constructor
     */
    var EmotionView = function EmotionView() {
    };

    return EmotionView.extend('EmotionView', {

        /**
         * Render Emotion element
         * @memberOf EmotionView
         */
        renderEmotion: function renderEmotion() {

            this.header(Header, this.get$container());

            /**
             * Define $emotion
             * @type {EmotionElement}
             */
            this.elements.$emotion = new EmotionElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf EmotionView
         * @returns {EmotionPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Emotion Preferences Element
             * @type {EmotionPreferencesElement}
             */
            this.elements.$preferences = new EmotionPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf EmotionView
         * @param widgetRules
         * @param contentRules
         * @returns {EmotionRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Emotion Rules Element
             * @type {EmotionRulesElement}
             */
            this.elements.$rules = new EmotionRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Emotion
         * @memberOf EmotionView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderEmotion.bind(this)
            );
        }

    }, BaseView.prototype);
});
