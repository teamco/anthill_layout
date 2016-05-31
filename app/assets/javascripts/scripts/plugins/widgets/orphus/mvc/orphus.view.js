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
    'plugins/widgets/orphus/element/orphus.element',
    'plugins/widgets/orphus/element/orphus.preferences.element',
    'plugins/widgets/orphus/element/orphus.rules.element'
], function defineOrphusView(BaseView, Header, Footer, OrphusElement, OrphusPreferencesElement, OrphusRulesElement) {

    /**
     * Define view
     * @class OrphusView
     * @extends BaseView
     * @constructor
     */
    var OrphusView = function OrphusView() {
    };

    return OrphusView.extend('OrphusView', {

        /**
         * Render Orphus element
         * @memberOf OrphusView
         */
        renderOrphus: function renderOrphus() {

            this.header(Header, this.get$container());

            /**
             * Define $orphus
             * @type {OrphusElement}
             */
            this.elements.$orphus = new OrphusElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf OrphusView
         * @returns {OrphusPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Orphus Preferences Element
             * @type {OrphusPreferencesElement}
             */
            this.elements.$preferences = new OrphusPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf OrphusView
         * @param widgetRules
         * @param contentRules
         * @returns {OrphusRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Orphus Rules Element
             * @type {OrphusRulesElement}
             */
            this.elements.$rules = new OrphusRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Orphus
         * @memberOf OrphusView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderOrphus.bind(this)
            );
        }

    }, BaseView.prototype);
});
