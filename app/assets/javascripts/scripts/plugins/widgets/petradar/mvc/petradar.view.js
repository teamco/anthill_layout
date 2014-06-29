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
    'plugins/widgets/petradar/element/petradar.element',
    'plugins/widgets/petradar/element/petradar.preferences.element',
    'plugins/widgets/petradar/element/petradar.rules.element'
], function definePetradarView(BaseView, Header, Footer, PetradarElement, PetradarPreferencesElement, PetradarRulesElement) {

    /**
     * Define view
     * @class PetradarView
     * @extends BaseView
     * @constructor
     */
    var PetradarView = function PetradarView() {
    };

    return PetradarView.extend('PetradarView', {

        /**
         * Render petradar element
         * @member PetradarView
         */
        renderPetradar: function renderPetradar() {

            this.header(Header, this.elements.$container);

            /**
             * Define $petradar
             * @type {PetradarElement}
             */
            this.elements.$petradar = new PetradarElement(this, {
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
         * @member PetradarView
         * @returns {PetradarPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Petradar Preferences Element
             * @type {PetradarPreferencesElement}
             */
            this.elements.$preferences = new PetradarPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member PetradarView
         * @param widgetRules
         * @param contentRules
         * @returns {PetradarRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Petradar Rules Element
             * @type {PetradarRulesElement}
             */
            this.elements.$rules = new PetradarRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render petradar
         * @member PetradarView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPetradar.bind(this)
            );
        }

    }, BaseView.prototype)

});