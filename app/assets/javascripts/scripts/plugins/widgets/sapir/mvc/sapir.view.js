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
    'plugins/widgets/sapir/element/sapir.element',
    'plugins/widgets/sapir/element/sapir.preferences.element',
    'plugins/widgets/sapir/element/sapir.rules.element'
], function defineSapirView(BaseView, Header, Footer, SapirElement, SapirPreferencesElement, SapirRulesElement) {

    /**
     * Define view
     * @class SapirView
     * @extends BaseView
     * @constructor
     */
    var SapirView = function SapirView() {
    };

    return SapirView.extend('SapirView', {

        /**
         * Render Sapir element
         * @memberOf SapirView
         */
        renderSapir: function renderSapir() {

            this.header(Header, this.get$container());

            /**
             * Define $sapir
             * @type {SapirElement}
             */
            this.elements.$sapir = new SapirElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf SapirView
         * @returns {SapirPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Sapir Preferences Element
             * @type {SapirPreferencesElement}
             */
            this.elements.$preferences = new SapirPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf SapirView
         * @param widgetRules
         * @param contentRules
         * @returns {SapirRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Sapir Rules Element
             * @type {SapirRulesElement}
             */
            this.elements.$rules = new SapirRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Sapir
         * @memberOf SapirView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSapir.bind(this)
            );
        }

    }, BaseView.prototype);
});
