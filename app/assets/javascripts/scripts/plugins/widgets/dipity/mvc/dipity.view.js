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
    'plugins/widgets/dipity/element/dipity.element',
    'plugins/widgets/dipity/element/dipity.preferences.element',
    'plugins/widgets/dipity/element/dipity.rules.element'
], function defineDipityView(BaseView, Header, Footer, DipityElement, DipityPreferencesElement, DipityRulesElement) {

    /**
     * Define view
     * @class DipityView
     * @extends BaseView
     * @constructor
     */
    var DipityView = function DipityView() {
    };

    return DipityView.extend('DipityView', {

        /**
         * Render Dipity element
         * @memberOf DipityView
         */
        renderDipity: function renderDipity() {

            this.header(Header, this.get$container());

            /**
             * Define $dipity
             * @type {DipityElement}
             */
            this.elements.$dipity = new DipityElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf DipityView
         * @returns {DipityPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Dipity Preferences Element
             * @type {DipityPreferencesElement}
             */
            this.elements.$preferences = new DipityPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf DipityView
         * @param widgetRules
         * @param contentRules
         * @returns {DipityRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Dipity Rules Element
             * @type {DipityRulesElement}
             */
            this.elements.$rules = new DipityRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Dipity
         * @memberOf DipityView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderDipity.bind(this)
            );
        }

    }, BaseView.prototype);
});
