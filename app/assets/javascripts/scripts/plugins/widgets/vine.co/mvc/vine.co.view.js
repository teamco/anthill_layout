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
    'plugins/widgets/vine.co/element/vine.co.element',
    'plugins/widgets/vine.co/element/vine.co.preferences.element',
    'plugins/widgets/vine.co/element/vine.co.rules.element'
], function defineVineCoView(BaseView, Header, Footer, VineCoElement, VineCoPreferencesElement, VineCoRulesElement) {

    /**
     * Define view
     * @class VineCoView
     * @extends BaseView
     * @constructor
     */
    var VineCoView = function VineCoView() {
    };

    return VineCoView.extend('VineCoView', {

        /**
         * Render VineCo element
         * @memberOf VineCoView
         */
        renderVineCo: function renderVineCo() {

            this.header(Header, this.elements.$container);

            /**
             * Define $vineco
             * @type {VineCoElement}
             */
            this.elements.$vineco = new VineCoElement(this, {
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
         * @memberOf VineCoView
         * @returns {VineCoPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define VineCo Preferences Element
             * @type {VineCoPreferencesElement}
             */
            this.elements.$preferences = new VineCoPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf VineCoView
         * @param widgetRules
         * @param contentRules
         * @returns {VineCoRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define VineCo Rules Element
             * @type {VineCoRulesElement}
             */
            this.elements.$rules = new VineCoRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render VineCo
         * @memberOf VineCoView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderVineCo.bind(this)
            );
        }

    }, BaseView.prototype)

});
