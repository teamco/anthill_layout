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
    'plugins/widgets/speaker.deck/element/speaker.deck.element',
    'plugins/widgets/speaker.deck/element/speaker.deck.preferences.element',
    'plugins/widgets/speaker.deck/element/speaker.deck.rules.element'
], function defineSpeakerDeckView(BaseView, Header, Footer, SpeakerDeckElement, SpeakerDeckPreferencesElement, SpeakerDeckRulesElement) {

    /**
     * Define view
     * @class SpeakerDeckView
     * @extends BaseView
     * @constructor
     */
    var SpeakerDeckView = function SpeakerDeckView() {
    };

    return SpeakerDeckView.extend('SpeakerDeckView', {

        /**
         * Render SpeakerDeck element
         * @memberOf SpeakerDeckView
         */
        renderSpeakerDeck: function renderSpeakerDeck() {

            this.header(Header, this.get$container());

            /**
             * Define $speakerdeck
             * @type {SpeakerDeckElement}
             */
            this.elements.$speakerdeck = new SpeakerDeckElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf SpeakerDeckView
         * @returns {SpeakerDeckPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define SpeakerDeck Preferences Element
             * @type {SpeakerDeckPreferencesElement}
             */
            this.elements.$preferences = new SpeakerDeckPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf SpeakerDeckView
         * @param widgetRules
         * @param contentRules
         * @returns {SpeakerDeckRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define SpeakerDeck Rules Element
             * @type {SpeakerDeckRulesElement}
             */
            this.elements.$rules = new SpeakerDeckRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render SpeakerDeck
         * @memberOf SpeakerDeckView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSpeakerDeck.bind(this)
            );
        }

    }, BaseView.prototype);
});
