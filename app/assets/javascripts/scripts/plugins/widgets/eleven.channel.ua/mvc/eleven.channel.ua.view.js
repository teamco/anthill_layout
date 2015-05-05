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
    'plugins/widgets/eleven.channel.ua/element/eleven.channel.ua.element',
    'plugins/widgets/eleven.channel.ua/element/eleven.channel.ua.preferences.element',
    'plugins/widgets/eleven.channel.ua/element/eleven.channel.ua.rules.element'
], function defineElevenChannelUaView(BaseView, Header, Footer, ElevenChannelUaElement, ElevenChannelUaPreferencesElement, ElevenChannelUaRulesElement) {

    /**
     * Define view
     * @class ElevenChannelUaView
     * @extends BaseView
     * @constructor
     */
    var ElevenChannelUaView = function ElevenChannelUaView() {
    };

    return ElevenChannelUaView.extend('ElevenChannelUaView', {

        /**
         * Render elevenchannelua element
         * @memberOf ElevenChannelUaView
         */
        renderElevenChannelUa: function renderElevenChannelUa() {

            this.header(Header, this.elements.$container);

            /**
             * Define $elevenchannelua
             * @type {ElevenChannelUaElement}
             */
            this.elements.$elevenchannelua = new ElevenChannelUaElement(this, {
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
         * @memberOf ElevenChannelUaView
         * @returns {ElevenChannelUaPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define ElevenChannelUa Preferences Element
             * @type {ElevenChannelUaPreferencesElement}
             */
            this.elements.$preferences = new ElevenChannelUaPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf ElevenChannelUaView
         * @param widgetRules
         * @param contentRules
         * @returns {ElevenChannelUaRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define ElevenChannelUa Rules Element
             * @type {ElevenChannelUaRulesElement}
             */
            this.elements.$rules = new ElevenChannelUaRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render elevenchannelua
         * @memberOf ElevenChannelUaView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderElevenChannelUa.bind(this)
            );
        }

    }, BaseView.prototype)

});
