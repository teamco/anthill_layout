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
    'plugins/widgets/count.down/element/count.down.element',
    'plugins/widgets/count.down/element/count.down.preferences.element',
    'plugins/widgets/count.down/element/count.down.rules.element'
], function defineCountDownView(BaseView, Header, Footer, CountDownElement, CountDownPreferencesElement, CountDownRulesElement) {

    /**
     * Define view
     * @class CountDownView
     * @extends BaseView
     * @constructor
     */
    var CountDownView = function CountDownView() {
    };

    return CountDownView.extend('CountDownView', {

        /**
         * Render CountDown element
         * @memberOf CountDownView
         */
        renderCountDown: function renderCountDown() {

            this.header(Header, this.get$container());

            /**
             * Define $countdown
             * @type {CountDownElement}
             */
            this.elements.$countdown = new CountDownElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf CountDownView
         * @returns {CountDownPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define CountDown Preferences Element
             * @type {CountDownPreferencesElement}
             */
            this.elements.$preferences = new CountDownPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf CountDownView
         * @param widgetRules
         * @param contentRules
         * @returns {CountDownRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define CountDown Rules Element
             * @type {CountDownRulesElement}
             */
            this.elements.$rules = new CountDownRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render CountDown
         * @memberOf CountDownView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderCountDown.bind(this)
            );
        }

    }, BaseView.prototype);
});
