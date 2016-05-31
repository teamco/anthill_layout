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
    'plugins/widgets/one.twelve.channel.ua/element/one.twelve.channel.ua.element',
    'plugins/widgets/one.twelve.channel.ua/element/one.twelve.channel.ua.preferences.element',
    'plugins/widgets/one.twelve.channel.ua/element/one.twelve.channel.ua.rules.element'
], function defineOneTwelveChannelUaView(BaseView, Header, Footer, OneTwelveChannelUaElement, OneTwelveChannelUaPreferencesElement, OneTwelveChannelUaRulesElement) {

    /**
     * Define view
     * @class OneTwelveChannelUaView
     * @extends BaseView
     * @constructor
     */
    var OneTwelveChannelUaView = function OneTwelveChannelUaView() {
    };

    return OneTwelveChannelUaView.extend('OneTwelveChannelUaView', {

        /**
         * Render onetwelvechannelua element
         * @memberOf OneTwelveChannelUaView
         */
        renderOneTwelveChannelUa: function renderOneTwelveChannelUa() {

            this.header(Header, this.get$container());

            /**
             * Define $onetwelvechannelua
             * @type {OneTwelveChannelUaElement}
             */
            this.elements.$onetwelvechannelua = new OneTwelveChannelUaElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf OneTwelveChannelUaView
         * @returns {OneTwelveChannelUaPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define OneTwelveChannelUa Preferences Element
             * @type {OneTwelveChannelUaPreferencesElement}
             */
            this.elements.$preferences = new OneTwelveChannelUaPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf OneTwelveChannelUaView
         * @param widgetRules
         * @param contentRules
         * @returns {OneTwelveChannelUaRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define OneTwelveChannelUa Rules Element
             * @type {OneTwelveChannelUaRulesElement}
             */
            this.elements.$rules = new OneTwelveChannelUaRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render onetwelvechannelua
         * @memberOf OneTwelveChannelUaView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderOneTwelveChannelUa.bind(this)
            );
        }

    }, BaseView.prototype)

});
