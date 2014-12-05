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
    'plugins/widgets/channel.ten.il/element/channel.ten.il.element',
    'plugins/widgets/channel.ten.il/element/channel.ten.il.preferences.element',
    'plugins/widgets/channel.ten.il/element/channel.ten.il.rules.element'
], function defineChannelTenIlView(BaseView, Header, Footer, ChannelTenIlElement, ChannelTenIlPreferencesElement, ChannelTenIlRulesElement) {

    /**
     * Define view
     * @class ChannelTenIlView
     * @extends BaseView
     * @constructor
     */
    var ChannelTenIlView = function ChannelTenIlView() {
    };

    return ChannelTenIlView.extend('ChannelTenIlView', {

        /**
         * Render channeltenil element
         * @member ChannelTenIlView
         */
        renderChannelTenIl: function renderChannelTenIl() {

            this.header(Header, this.elements.$container);

            /**
             * Define $channeltenil
             * @type {ChannelTenIlElement}
             */
            this.elements.$channeltenil = new ChannelTenIlElement(this, {
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
         * @member ChannelTenIlView
         * @returns {ChannelTenIlPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define ChannelTenIl Preferences Element
             * @type {ChannelTenIlPreferencesElement}
             */
            this.elements.$preferences = new ChannelTenIlPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member ChannelTenIlView
         * @param widgetRules
         * @param contentRules
         * @returns {ChannelTenIlRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define ChannelTenIl Rules Element
             * @type {ChannelTenIlRulesElement}
             */
            this.elements.$rules = new ChannelTenIlRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render channeltenil
         * @member ChannelTenIlView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderChannelTenIl.bind(this)
            );
        }

    }, BaseView.prototype)

});
