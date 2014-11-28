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
    'plugins/widgets/five.channel.ua/element/five.channel.ua.element',
    'plugins/widgets/five.channel.ua/element/five.channel.ua.preferences.element',
    'plugins/widgets/five.channel.ua/element/five.channel.ua.rules.element'
], function defineFiveChannelUaView(BaseView, Header, Footer, FiveChannelUaElement, FiveChannelUaPreferencesElement, FiveChannelUaRulesElement) {

    /**
     * Define view
     * @class FiveChannelUaView
     * @extends BaseView
     * @constructor
     */
    var FiveChannelUaView = function FiveChannelUaView() {
    };

    return FiveChannelUaView.extend('FiveChannelUaView', {

        /**
         * Render fivechannelua element
         * @member FiveChannelUaView
         */
        renderFiveChannelUa: function renderFiveChannelUa() {

            this.header(Header, this.elements.$container);

            /**
             * Define $fivechannelua
             * @type {FiveChannelUaElement}
             */
            this.elements.$fivechannelua = new FiveChannelUaElement(this, {
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
         * @member FiveChannelUaView
         * @returns {FiveChannelUaPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define FiveChannelUa Preferences Element
             * @type {FiveChannelUaPreferencesElement}
             */
            this.elements.$preferences = new FiveChannelUaPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member FiveChannelUaView
         * @param widgetRules
         * @param contentRules
         * @returns {FiveChannelUaRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define FiveChannelUa Rules Element
             * @type {FiveChannelUaRulesElement}
             */
            this.elements.$rules = new FiveChannelUaRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render fivechannelua
         * @member FiveChannelUaView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderFiveChannelUa.bind(this)
            );
        }

    }, BaseView.prototype)

});
