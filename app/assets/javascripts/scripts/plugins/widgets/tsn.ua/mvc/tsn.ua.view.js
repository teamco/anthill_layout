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
    'plugins/widgets/tsn.ua/element/tsn.ua.element',
    'plugins/widgets/tsn.ua/element/tsn.ua.preferences.element',
    'plugins/widgets/tsn.ua/element/tsn.ua.rules.element'
], function defineTsnUaView(BaseView, Header, Footer, TsnUaElement, TsnUaPreferencesElement, TsnUaRulesElement) {

    /**
     * Define view
     * @class TsnUaView
     * @extends BaseView
     * @constructor
     */
    var TsnUaView = function TsnUaView() {
    };

    return TsnUaView.extend('TsnUaView', {

        /**
         * Render tsnua element
         * @memberOf TsnUaView
         */
        renderTsnUa: function renderTsnUa() {

            this.header(Header, this.get$container());

            /**
             * Define $tsnua
             * @type {TsnUaElement}
             */
            this.elements.$tsnua = new TsnUaElement(this, {
                $container: this.get$container().$,
                id: this.createUUID()
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf TsnUaView
         * @returns {TsnUaPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define TsnUa Preferences Element
             * @type {TsnUaPreferencesElement}
             */
            this.elements.$preferences = new TsnUaPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf TsnUaView
         * @param widgetRules
         * @param contentRules
         * @returns {TsnUaRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define TsnUa Rules Element
             * @type {TsnUaRulesElement}
             */
            this.elements.$rules = new TsnUaRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render tsnua
         * @memberOf TsnUaView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderTsnUa.bind(this)
            );
        }

    }, BaseView.prototype)

});
