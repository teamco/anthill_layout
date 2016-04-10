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
    'plugins/widgets/here.maps.for.life/element/here.maps.for.life.element',
    'plugins/widgets/here.maps.for.life/element/here.maps.for.life.preferences.element',
    'plugins/widgets/here.maps.for.life/element/here.maps.for.life.rules.element'
], function defineHereMapsForLifeView(BaseView, Header, Footer, HereMapsForLifeElement, HereMapsForLifePreferencesElement, HereMapsForLifeRulesElement) {

    /**
     * Define view
     * @class HereMapsForLifeView
     * @extends BaseView
     * @constructor
     */
    var HereMapsForLifeView = function HereMapsForLifeView() {
    };

    return HereMapsForLifeView.extend('HereMapsForLifeView', {

        /**
         * Render HereMapsForLife element
         * @memberOf HereMapsForLifeView
         */
        renderHereMapsForLife: function renderHereMapsForLife() {

            this.header(Header, this.get$container());

            /**
             * Define $heremapsforlife
             * @type {HereMapsForLifeElement}
             */
            this.elements.$heremapsforlife = new HereMapsForLifeElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf HereMapsForLifeView
         * @returns {HereMapsForLifePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define HereMapsForLife Preferences Element
             * @type {HereMapsForLifePreferencesElement}
             */
            this.elements.$preferences = new HereMapsForLifePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf HereMapsForLifeView
         * @param widgetRules
         * @param contentRules
         * @returns {HereMapsForLifeRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define HereMapsForLife Rules Element
             * @type {HereMapsForLifeRulesElement}
             */
            this.elements.$rules = new HereMapsForLifeRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render HereMapsForLife
         * @memberOf HereMapsForLifeView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderHereMapsForLife.bind(this)
            );
        }

    }, BaseView.prototype);
});
