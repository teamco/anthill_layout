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
    'plugins/widgets/sport.express/element/sport.express.element',
    'plugins/widgets/sport.express/element/sport.express.preferences.element',
    'plugins/widgets/sport.express/element/sport.express.rules.element'
], function defineSportExpressView(BaseView, Header, Footer, SportExpressElement, SportExpressPreferencesElement, SportExpressRulesElement) {

    /**
     * Define view
     * @class SportExpressView
     * @extends BaseView
     * @constructor
     */
    var SportExpressView = function SportExpressView() {
    };

    return SportExpressView.extend('SportExpressView', {

        /**
         * Render sportexpress element
         * @memberOf SportExpressView
         */
        renderSportExpress: function renderSportExpress() {

            this.header(Header, this.get$container());

            /**
             * Define $sportexpress
             * @type {SportExpressElement}
             */
            this.elements.$sportexpress = new SportExpressElement(this, {
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
         * @memberOf SportExpressView
         * @returns {SportExpressPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define SportExpress Preferences Element
             * @type {SportExpressPreferencesElement}
             */
            this.elements.$preferences = new SportExpressPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf SportExpressView
         * @param widgetRules
         * @param contentRules
         * @returns {SportExpressRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define SportExpress Rules Element
             * @type {SportExpressRulesElement}
             */
            this.elements.$rules = new SportExpressRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render sportexpress
         * @memberOf SportExpressView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSportExpress.bind(this)
            );
        }

    }, BaseView.prototype)

});
