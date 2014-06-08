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
    'plugins/widgets/twits/element/twits.element',
    'plugins/widgets/twits/element/twits.preferences.element',
    'plugins/widgets/twits/element/twits.rules.element'
], function defineTwitsView(BaseView, Header, Footer, TwitsElement, TwitsPreferencesElement, TwitsRulesElement) {

    /**
     * Define view
     * @class TwitsView
     * @extends BaseView
     * @constructor
     */
    var TwitsView = function TwitsView() {
    };

    return TwitsView.extend('TwitsView', {

        /**
         * Render twits element
         * @member TwitsView
         */
        renderTwits: function renderTwits() {

            this.header(Header, this.elements.$container);

            /**
             * Define $twits
             * @type {TwitsElement}
             */
            this.elements.$twits = new TwitsElement(this, {
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
         * @member TwitsView
         * @returns {TwitsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Twits Preferences Element
             * @type {TwitsPreferencesElement}
             */
            this.elements.$preferences = new TwitsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member TwitsView
         * @param widgetRules
         * @param contentRules
         * @returns {TwitsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Twits Rules Element
             * @type {TwitsRulesElement}
             */
            this.elements.$rules = new TwitsRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render twits
         * @member TwitsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderTwits.bind(this)
            );
        }

    }, BaseView.prototype)

});