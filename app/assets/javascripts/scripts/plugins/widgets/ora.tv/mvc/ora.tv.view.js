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
    'plugins/widgets/ora.tv/element/ora.tv.element',
    'plugins/widgets/ora.tv/element/ora.tv.preferences.element',
    'plugins/widgets/ora.tv/element/ora.tv.rules.element'
], function defineOraTvView(BaseView, Header, Footer, OraTvElement, OraTvPreferencesElement, OraTvRulesElement) {

    /**
     * Define view
     * @class OraTvView
     * @extends BaseView
     * @constructor
     */
    var OraTvView = function OraTvView() {
    };

    return OraTvView.extend('OraTvView', {

        /**
         * Render OraTv element
         * @memberOf OraTvView
         */
        renderOraTv: function renderOraTv() {

            this.header(Header, this.get$container());

            /**
             * Define $oratv
             * @type {OraTvElement}
             */
            this.elements.$oratv = new OraTvElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf OraTvView
         * @returns {OraTvPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define OraTv Preferences Element
             * @type {OraTvPreferencesElement}
             */
            this.elements.$preferences = new OraTvPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf OraTvView
         * @param widgetRules
         * @param contentRules
         * @returns {OraTvRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define OraTv Rules Element
             * @type {OraTvRulesElement}
             */
            this.elements.$rules = new OraTvRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render OraTv
         * @memberOf OraTvView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderOraTv.bind(this)
            );
        }

    }, BaseView.prototype);
});
