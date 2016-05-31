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
    'plugins/widgets/office.mix/element/office.mix.element',
    'plugins/widgets/office.mix/element/office.mix.preferences.element',
    'plugins/widgets/office.mix/element/office.mix.rules.element'
], function defineOfficeMixView(BaseView, Header, Footer, OfficeMixElement, OfficeMixPreferencesElement, OfficeMixRulesElement) {

    /**
     * Define view
     * @class OfficeMixView
     * @extends BaseView
     * @constructor
     */
    var OfficeMixView = function OfficeMixView() {
    };

    return OfficeMixView.extend('OfficeMixView', {

        /**
         * Render OfficeMix element
         * @memberOf OfficeMixView
         */
        renderOfficeMix: function renderOfficeMix() {

            this.header(Header, this.get$container());

            /**
             * Define $officemix
             * @type {OfficeMixElement}
             */
            this.elements.$officemix = new OfficeMixElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf OfficeMixView
         * @returns {OfficeMixPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define OfficeMix Preferences Element
             * @type {OfficeMixPreferencesElement}
             */
            this.elements.$preferences = new OfficeMixPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf OfficeMixView
         * @param widgetRules
         * @param contentRules
         * @returns {OfficeMixRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define OfficeMix Rules Element
             * @type {OfficeMixRulesElement}
             */
            this.elements.$rules = new OfficeMixRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render OfficeMix
         * @memberOf OfficeMixView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderOfficeMix.bind(this)
            );
        }

    }, BaseView.prototype);
});
