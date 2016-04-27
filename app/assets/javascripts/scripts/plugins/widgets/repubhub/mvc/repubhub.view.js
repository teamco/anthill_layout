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
    'plugins/widgets/repubhub/element/repubhub.element',
    'plugins/widgets/repubhub/element/repubhub.preferences.element',
    'plugins/widgets/repubhub/element/repubhub.rules.element'
], function defineRepubhubView(BaseView, Header, Footer, RepubhubElement, RepubhubPreferencesElement, RepubhubRulesElement) {

    /**
     * Define view
     * @class RepubhubView
     * @extends BaseView
     * @constructor
     */
    var RepubhubView = function RepubhubView() {
    };

    return RepubhubView.extend('RepubhubView', {

        /**
         * Render Repubhub element
         * @memberOf RepubhubView
         */
        renderRepubhub: function renderRepubhub() {

            this.header(Header, this.get$container());

            /**
             * Define $repubhub
             * @type {RepubhubElement}
             */
            this.elements.$repubhub = new RepubhubElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf RepubhubView
         * @returns {RepubhubPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Repubhub Preferences Element
             * @type {RepubhubPreferencesElement}
             */
            this.elements.$preferences = new RepubhubPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf RepubhubView
         * @param widgetRules
         * @param contentRules
         * @returns {RepubhubRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Repubhub Rules Element
             * @type {RepubhubRulesElement}
             */
            this.elements.$rules = new RepubhubRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Repubhub
         * @memberOf RepubhubView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderRepubhub.bind(this)
            );
        }

    }, BaseView.prototype);
});
