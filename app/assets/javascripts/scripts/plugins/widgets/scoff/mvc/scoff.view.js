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
    'plugins/widgets/scoff/element/scoff.element',
    'plugins/widgets/scoff/element/scoff.preferences.element',
    'plugins/widgets/scoff/element/scoff.rules.element'
], function defineScoffView(BaseView, Header, Footer, ScoffElement, ScoffPreferencesElement, ScoffRulesElement) {

    /**
     * Define view
     * @class ScoffView
     * @extends BaseView
     * @constructor
     */
    var ScoffView = function ScoffView() {
    };

    return ScoffView.extend('ScoffView', {

        /**
         * Render Scoff element
         * @memberOf ScoffView
         */
        renderScoff: function renderScoff() {

            this.header(Header, this.get$container());

            /**
             * Define $scoff
             * @type {ScoffElement}
             */
            this.elements.$scoff = new ScoffElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf ScoffView
         * @returns {ScoffPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Scoff Preferences Element
             * @type {ScoffPreferencesElement}
             */
            this.elements.$preferences = new ScoffPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf ScoffView
         * @param widgetRules
         * @param contentRules
         * @returns {ScoffRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Scoff Rules Element
             * @type {ScoffRulesElement}
             */
            this.elements.$rules = new ScoffRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Scoff
         * @memberOf ScoffView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderScoff.bind(this)
            );
        }

    }, BaseView.prototype);
});
