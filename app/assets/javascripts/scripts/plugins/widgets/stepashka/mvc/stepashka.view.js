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
    'plugins/widgets/stepashka/element/stepashka.element',
    'plugins/widgets/stepashka/element/stepashka.preferences.element',
    'plugins/widgets/stepashka/element/stepashka.rules.element'
], function defineStepashkaView(BaseView, Header, Footer, StepashkaElement, StepashkaPreferencesElement, StepashkaRulesElement) {

    /**
     * Define view
     * @class StepashkaView
     * @extends BaseView
     * @constructor
     */
    var StepashkaView = function StepashkaView() {
    };

    return StepashkaView.extend('StepashkaView', {

        /**
         * Render stepashka element
         * @memberOf StepashkaView
         */
        renderStepashka: function renderStepashka() {

            this.header(Header, this.get$container());

            /**
             * Define $stepashka
             * @type {StepashkaElement}
             */
            this.elements.$stepashka = new StepashkaElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf StepashkaView
         * @returns {StepashkaPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Stepashka Preferences Element
             * @type {StepashkaPreferencesElement}
             */
            this.elements.$preferences = new StepashkaPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf StepashkaView
         * @param widgetRules
         * @param contentRules
         * @returns {StepashkaRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Stepashka Rules Element
             * @type {StepashkaRulesElement}
             */
            this.elements.$rules = new StepashkaRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render stepashka
         * @memberOf StepashkaView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderStepashka.bind(this)
            );
        }

    }, BaseView.prototype)

});
