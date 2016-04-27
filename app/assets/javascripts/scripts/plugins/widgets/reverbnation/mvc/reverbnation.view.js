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
    'plugins/widgets/reverbnation/element/reverbnation.element',
    'plugins/widgets/reverbnation/element/reverbnation.preferences.element',
    'plugins/widgets/reverbnation/element/reverbnation.rules.element'
], function defineReverbnationView(BaseView, Header, Footer, ReverbnationElement, ReverbnationPreferencesElement, ReverbnationRulesElement) {

    /**
     * Define view
     * @class ReverbnationView
     * @extends BaseView
     * @constructor
     */
    var ReverbnationView = function ReverbnationView() {
    };

    return ReverbnationView.extend('ReverbnationView', {

        /**
         * Render Reverbnation element
         * @memberOf ReverbnationView
         */
        renderReverbnation: function renderReverbnation() {

            this.header(Header, this.get$container());

            /**
             * Define $reverbnation
             * @type {ReverbnationElement}
             */
            this.elements.$reverbnation = new ReverbnationElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf ReverbnationView
         * @returns {ReverbnationPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Reverbnation Preferences Element
             * @type {ReverbnationPreferencesElement}
             */
            this.elements.$preferences = new ReverbnationPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf ReverbnationView
         * @param widgetRules
         * @param contentRules
         * @returns {ReverbnationRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Reverbnation Rules Element
             * @type {ReverbnationRulesElement}
             */
            this.elements.$rules = new ReverbnationRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Reverbnation
         * @memberOf ReverbnationView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderReverbnation.bind(this)
            );
        }

    }, BaseView.prototype);
});
