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
    'plugins/widgets/screenr/element/screenr.element',
    'plugins/widgets/screenr/element/screenr.preferences.element',
    'plugins/widgets/screenr/element/screenr.rules.element'
], function defineScreenrView(BaseView, Header, Footer, ScreenrElement, ScreenrPreferencesElement, ScreenrRulesElement) {

    /**
     * Define view
     * @class ScreenrView
     * @extends BaseView
     * @constructor
     */
    var ScreenrView = function ScreenrView() {
    };

    return ScreenrView.extend('ScreenrView', {

        /**
         * Render screenr element
         * @memberOf ScreenrView
         */
        renderScreenr: function renderScreenr() {

            this.header(Header, this.get$container());

            /**
             * Define $screenr
             * @type {ScreenrElement}
             */
            this.elements.$screenr = new ScreenrElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf ScreenrView
         * @returns {ScreenrPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Screenr Preferences Element
             * @type {ScreenrPreferencesElement}
             */
            this.elements.$preferences = new ScreenrPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf ScreenrView
         * @param widgetRules
         * @param contentRules
         * @returns {ScreenrRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Screenr Rules Element
             * @type {ScreenrRulesElement}
             */
            this.elements.$rules = new ScreenrRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render screenr
         * @memberOf ScreenrView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderScreenr.bind(this)
            );
        }

    }, BaseView.prototype)

});
