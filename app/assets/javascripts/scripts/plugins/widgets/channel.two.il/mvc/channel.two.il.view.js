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
    'plugins/widgets/channel.two.il/element/channel.two.il.element',
    'plugins/widgets/channel.two.il/element/channel.two.il.preferences.element',
    'plugins/widgets/channel.two.il/element/channel.two.il.rules.element'
], function defineChannelTwoIlView(BaseView, Header, Footer, ChannelTwoIlElement, ChannelTwoIlPreferencesElement, ChannelTwoIlRulesElement) {

    /**
     * Define view
     * @class ChannelTwoIlView
     * @extends BaseView
     * @constructor
     */
    var ChannelTwoIlView = function ChannelTwoIlView() {
    };

    return ChannelTwoIlView.extend('ChannelTwoIlView', {

        /**
         * Render channeltwoil element
         * @memberOf ChannelTwoIlView
         */
        renderChannelTwoIl: function renderChannelTwoIl() {

            this.header(Header, this.get$container());

            /**
             * Define $channeltwoil
             * @type {ChannelTwoIlElement}
             */
            this.elements.$channeltwoil = new ChannelTwoIlElement(this, {
                $container: this.get$container(),
                id: this.createUUID()
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf ChannelTwoIlView
         * @returns {ChannelTwoIlPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define ChannelTwoIl Preferences Element
             * @type {ChannelTwoIlPreferencesElement}
             */
            this.elements.$preferences = new ChannelTwoIlPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf ChannelTwoIlView
         * @param widgetRules
         * @param contentRules
         * @returns {ChannelTwoIlRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define ChannelTwoIl Rules Element
             * @type {ChannelTwoIlRulesElement}
             */
            this.elements.$rules = new ChannelTwoIlRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render channeltwoil
         * @memberOf ChannelTwoIlView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderChannelTwoIl.bind(this)
            );
        }

    }, BaseView.prototype)

});
