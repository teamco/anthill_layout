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
    'plugins/widgets/channel.two/element/channel.two.element',
    'plugins/widgets/channel.two/element/channel.two.preferences.element',
    'plugins/widgets/channel.two/element/channel.two.rules.element'
], function defineChannelTwoView(BaseView, Header, Footer, ChannelTwoElement, ChannelTwoPreferencesElement, ChannelTwoRulesElement) {

    /**
     * Define view
     * @class ChannelTwoView
     * @extends BaseView
     * @constructor
     */
    var ChannelTwoView = function ChannelTwoView() {
    };

    return ChannelTwoView.extend('ChannelTwoView', {

        /**
         * Render channeltwo element
         * @member ChannelTwoView
         */
        renderChannelTwo: function renderChannelTwo() {

            this.header(Header, this.elements.$container);

            /**
             * Define $channeltwo
             * @type {ChannelTwoElement}
             */
            this.elements.$channeltwo = new ChannelTwoElement(this, {
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
         * @member ChannelTwoView
         * @returns {ChannelTwoPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define ChannelTwo Preferences Element
             * @type {ChannelTwoPreferencesElement}
             */
            this.elements.$preferences = new ChannelTwoPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member ChannelTwoView
         * @param widgetRules
         * @param contentRules
         * @returns {ChannelTwoRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define ChannelTwo Rules Element
             * @type {ChannelTwoRulesElement}
             */
            this.elements.$rules = new ChannelTwoRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render channeltwo
         * @member ChannelTwoView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderChannelTwo.bind(this)
            );
        }

    }, BaseView.prototype)

});
