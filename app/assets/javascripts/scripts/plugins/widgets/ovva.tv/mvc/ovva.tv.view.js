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
    'plugins/widgets/ovva.tv/element/ovva.tv.element',
    'plugins/widgets/ovva.tv/element/ovva.tv.preferences.element',
    'plugins/widgets/ovva.tv/element/ovva.tv.rules.element'
], function defineOvvaTvView(BaseView, Header, Footer, OvvaTvElement, OvvaTvPreferencesElement, OvvaTvRulesElement) {

    /**
     * Define view
     * @class OvvaTvView
     * @extends BaseView
     * @constructor
     */
    var OvvaTvView = function OvvaTvView() {
    };

    return OvvaTvView.extend('OvvaTvView', {

        /**
         * Render OvvaTv element
         * @memberOf OvvaTvView
         */
        renderOvvaTv: function renderOvvaTv() {

            this.header(Header, this.get$container());

            /**
             * Define $ovvatv
             * @type {OvvaTvElement}
             */
            this.elements.$ovvatv = new OvvaTvElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf OvvaTvView
         * @returns {OvvaTvPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define OvvaTv Preferences Element
             * @type {OvvaTvPreferencesElement}
             */
            this.elements.$preferences = new OvvaTvPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf OvvaTvView
         * @param widgetRules
         * @param contentRules
         * @returns {OvvaTvRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define OvvaTv Rules Element
             * @type {OvvaTvRulesElement}
             */
            this.elements.$rules = new OvvaTvRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render OvvaTv
         * @memberOf OvvaTvView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderOvvaTv.bind(this)
            );
        }

    }, BaseView.prototype);
});
