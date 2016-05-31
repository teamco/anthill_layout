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
    'plugins/widgets/participants/element/participants.element',
    'plugins/widgets/participants/element/participants.preferences.element',
    'plugins/widgets/participants/element/participants.rules.element'
], function defineParticipantsView(BaseView, Header, Footer, ParticipantsElement, ParticipantsPreferencesElement, ParticipantsRulesElement) {

    /**
     * Define view
     * @class ParticipantsView
     * @extends BaseView
     * @constructor
     */
    var ParticipantsView = function ParticipantsView() {
    };

    return ParticipantsView.extend('ParticipantsView', {

        /**
         * Render Participants element
         * @memberOf ParticipantsView
         */
        renderParticipants: function renderParticipants() {

            this.header(Header, this.get$container());

            /**
             * Define $participants
             * @type {ParticipantsElement}
             */
            this.elements.$participants = new ParticipantsElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf ParticipantsView
         * @returns {ParticipantsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Participants Preferences Element
             * @type {ParticipantsPreferencesElement}
             */
            this.elements.$preferences = new ParticipantsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf ParticipantsView
         * @param widgetRules
         * @param contentRules
         * @returns {ParticipantsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Participants Rules Element
             * @type {ParticipantsRulesElement}
             */
            this.elements.$rules = new ParticipantsRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Participants
         * @memberOf ParticipantsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderParticipants.bind(this)
            );
        }

    }, BaseView.prototype);
});
