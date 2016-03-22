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
    'plugins/widgets/howcast/element/howcast.element',
    'plugins/widgets/howcast/element/howcast.preferences.element',
    'plugins/widgets/howcast/element/howcast.rules.element'
], function defineHowcastView(BaseView, Header, Footer, HowcastElement, HowcastPreferencesElement, HowcastRulesElement) {

    /**
     * Define view
     * @class HowcastView
     * @extends BaseView
     * @constructor
     */
    var HowcastView = function HowcastView() {
    };

    return HowcastView.extend('HowcastView', {

        /**
         * Render howcast element
         * @memberOf HowcastView
         */
        renderHowcast: function renderHowcast() {

            this.header(Header, this.get$container());

            /**
             * Define $howcast
             * @type {HowcastElement}
             */
            this.elements.$howcast = new HowcastElement(this, {
                $container: this.get$container().$,
                id: this.createUUID()
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf HowcastView
         * @returns {HowcastPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Howcast Preferences Element
             * @type {HowcastPreferencesElement}
             */
            this.elements.$preferences = new HowcastPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf HowcastView
         * @param widgetRules
         * @param contentRules
         * @returns {HowcastRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Howcast Rules Element
             * @type {HowcastRulesElement}
             */
            this.elements.$rules = new HowcastRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render howcast
         * @memberOf HowcastView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderHowcast.bind(this)
            );
        }

    }, BaseView.prototype)

});
