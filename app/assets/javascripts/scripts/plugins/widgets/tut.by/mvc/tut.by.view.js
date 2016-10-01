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
    'plugins/widgets/tut.by/element/tut.by.element',
    'plugins/widgets/tut.by/element/tut.by.preferences.element',
    'plugins/widgets/tut.by/element/tut.by.rules.element'
], function defineTutByView(BaseView, Header, Footer, TutByElement, TutByPreferencesElement, TutByRulesElement) {

    /**
     * Define view
     * @class TutByView
     * @extends BaseView
     * @constructor
     */
    var TutByView = function TutByView() {
    };

    return TutByView.extend('TutByView', {

        /**
         * Render TutBy element
         * @memberOf TutByView
         */
        renderTutBy: function renderTutBy() {

            this.header(Header, this.get$container());

            /**
             * Define $tutby
             * @type {TutByElement}
             */
            this.elements.$tutby = new TutByElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf TutByView
         * @returns {TutByPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define TutBy Preferences Element
             * @type {TutByPreferencesElement}
             */
            this.elements.$preferences = new TutByPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf TutByView
         * @param widgetRules
         * @param contentRules
         * @returns {TutByRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define TutBy Rules Element
             * @type {TutByRulesElement}
             */
            this.elements.$rules = new TutByRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render TutBy
         * @memberOf TutByView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderTutBy.bind(this)
            );
        }

    }, BaseView.prototype);
});
