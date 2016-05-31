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
    'plugins/widgets/kitchenbowl/element/kitchenbowl.element',
    'plugins/widgets/kitchenbowl/element/kitchenbowl.preferences.element',
    'plugins/widgets/kitchenbowl/element/kitchenbowl.rules.element'
], function defineKitchenbowlView(BaseView, Header, Footer, KitchenbowlElement, KitchenbowlPreferencesElement, KitchenbowlRulesElement) {

    /**
     * Define view
     * @class KitchenbowlView
     * @extends BaseView
     * @constructor
     */
    var KitchenbowlView = function KitchenbowlView() {
    };

    return KitchenbowlView.extend('KitchenbowlView', {

        /**
         * Render Kitchenbowl element
         * @memberOf KitchenbowlView
         */
        renderKitchenbowl: function renderKitchenbowl() {

            this.header(Header, this.get$container());

            /**
             * Define $kitchenbowl
             * @type {KitchenbowlElement}
             */
            this.elements.$kitchenbowl = new KitchenbowlElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf KitchenbowlView
         * @returns {KitchenbowlPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Kitchenbowl Preferences Element
             * @type {KitchenbowlPreferencesElement}
             */
            this.elements.$preferences = new KitchenbowlPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf KitchenbowlView
         * @param widgetRules
         * @param contentRules
         * @returns {KitchenbowlRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Kitchenbowl Rules Element
             * @type {KitchenbowlRulesElement}
             */
            this.elements.$rules = new KitchenbowlRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Kitchenbowl
         * @memberOf KitchenbowlView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderKitchenbowl.bind(this)
            );
        }

    }, BaseView.prototype);
});
