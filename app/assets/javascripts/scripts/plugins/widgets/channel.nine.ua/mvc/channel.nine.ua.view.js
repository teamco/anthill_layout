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
    'plugins/widgets/channel.nine.ua/element/channel.nine.ua.element',
    'plugins/widgets/channel.nine.ua/element/channel.nine.ua.preferences.element',
    'plugins/widgets/channel.nine.ua/element/channel.nine.ua.rules.element'
], function defineChannelNineUaView(BaseView, Header, Footer, ChannelNineUaElement, ChannelNineUaPreferencesElement, ChannelNineUaRulesElement) {

    /**
     * Define view
     * @class ChannelNineUaView
     * @extends BaseView
     * @constructor
     */
    var ChannelNineUaView = function ChannelNineUaView() {
    };

    return ChannelNineUaView.extend('ChannelNineUaView', {

        /**
         * Render channelnineua element
         * @memberOf ChannelNineUaView
         */
        renderChannelNineUa: function renderChannelNineUa() {

            this.header(Header, this.elements.$container);

            /**
             * Define $channelnineua
             * @type {ChannelNineUaElement}
             */
            this.elements.$channelnineua = new ChannelNineUaElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventManager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf ChannelNineUaView
         * @returns {ChannelNineUaPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define ChannelNineUa Preferences Element
             * @type {ChannelNineUaPreferencesElement}
             */
            this.elements.$preferences = new ChannelNineUaPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf ChannelNineUaView
         * @param widgetRules
         * @param contentRules
         * @returns {ChannelNineUaRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define ChannelNineUa Rules Element
             * @type {ChannelNineUaRulesElement}
             */
            this.elements.$rules = new ChannelNineUaRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render channelnineua
         * @memberOf ChannelNineUaView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderChannelNineUa.bind(this)
            );
        }

    }, BaseView.prototype)

});
