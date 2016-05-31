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
    'plugins/widgets/pastery/element/pastery.element',
    'plugins/widgets/pastery/element/pastery.preferences.element',
    'plugins/widgets/pastery/element/pastery.rules.element'
], function definePasteryView(BaseView, Header, Footer, PasteryElement, PasteryPreferencesElement, PasteryRulesElement) {

    /**
     * Define view
     * @class PasteryView
     * @extends BaseView
     * @constructor
     */
    var PasteryView = function PasteryView() {
    };

    return PasteryView.extend('PasteryView', {

        /**
         * Render Pastery element
         * @memberOf PasteryView
         */
        renderPastery: function renderPastery() {

            this.header(Header, this.get$container());

            /**
             * Define $pastery
             * @type {PasteryElement}
             */
            this.elements.$pastery = new PasteryElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf PasteryView
         * @returns {PasteryPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Pastery Preferences Element
             * @type {PasteryPreferencesElement}
             */
            this.elements.$preferences = new PasteryPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf PasteryView
         * @param widgetRules
         * @param contentRules
         * @returns {PasteryRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Pastery Rules Element
             * @type {PasteryRulesElement}
             */
            this.elements.$rules = new PasteryRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Pastery
         * @memberOf PasteryView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPastery.bind(this)
            );
        }

    }, BaseView.prototype);
});
