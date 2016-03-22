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
    'plugins/widgets/ted/element/ted.element',
    'plugins/widgets/ted/element/ted.preferences.element',
    'plugins/widgets/ted/element/ted.rules.element'
], function defineTedView(BaseView, Header, Footer, TedElement, TedPreferencesElement, TedRulesElement) {

    /**
     * Define view
     * @class TedView
     * @extends BaseView
     * @constructor
     */
    var TedView = function TedView() {
    };

    return TedView.extend('TedView', {

        /**
         * Render ted element
         * @memberOf TedView
         */
        renderTed: function renderTed() {

            this.header(Header, this.get$container());

            /**
             * Define $ted
             * @type {TedElement}
             */
            this.elements.$ted = new TedElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf TedView
         * @returns {TedPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Ted Preferences Element
             * @type {TedPreferencesElement}
             */
            this.elements.$preferences = new TedPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf TedView
         * @param widgetRules
         * @param contentRules
         * @returns {TedRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Ted Rules Element
             * @type {TedRulesElement}
             */
            this.elements.$rules = new TedRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render ted
         * @memberOf TedView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderTed.bind(this)
            );
        }

    }, BaseView.prototype)

});
