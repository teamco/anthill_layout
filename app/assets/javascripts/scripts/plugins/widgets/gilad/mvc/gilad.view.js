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
    'plugins/widgets/gilad/element/gilad.element',
    'plugins/widgets/gilad/element/gilad.preferences.element',
    'plugins/widgets/gilad/element/gilad.rules.element'
], function defineGiladView(BaseView, Header, Footer, GiladElement, GiladPreferencesElement, GiladRulesElement) {

    /**
     * Define view
     * @class GiladView
     * @extends BaseView
     * @constructor
     */
    var GiladView = function GiladView() {
    };

    return GiladView.extend('GiladView', {

        /**
         * Render Gilad element
         * @memberOf GiladView
         */
        renderGilad: function renderGilad() {

            this.header(Header, this.get$container());

            /**
             * Define $gilad
             * @type {GiladElement}
             */
            this.elements.$gilad = new GiladElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf GiladView
         * @returns {GiladPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Gilad Preferences Element
             * @type {GiladPreferencesElement}
             */
            this.elements.$preferences = new GiladPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf GiladView
         * @param widgetRules
         * @param contentRules
         * @returns {GiladRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Gilad Rules Element
             * @type {GiladRulesElement}
             */
            this.elements.$rules = new GiladRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Gilad
         * @memberOf GiladView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderGilad.bind(this)
            );
        }

    }, BaseView.prototype);
});
