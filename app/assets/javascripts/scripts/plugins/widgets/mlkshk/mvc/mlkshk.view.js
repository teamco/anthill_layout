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
    'plugins/widgets/mlkshk/element/mlkshk.element',
    'plugins/widgets/mlkshk/element/mlkshk.preferences.element',
    'plugins/widgets/mlkshk/element/mlkshk.rules.element'
], function defineMlkshkView(BaseView, Header, Footer, MlkshkElement, MlkshkPreferencesElement, MlkshkRulesElement) {

    /**
     * Define view
     * @class MlkshkView
     * @extends BaseView
     * @constructor
     */
    var MlkshkView = function MlkshkView() {
    };

    return MlkshkView.extend('MlkshkView', {

        /**
         * Render mlkshk element
         * @memberOf MlkshkView
         */
        renderMlkshk: function renderMlkshk() {

            this.header(Header, this.elements.$container);

            /**
             * Define $mlkshk
             * @type {MlkshkElement}
             */
            this.elements.$mlkshk = new MlkshkElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf MlkshkView
         * @returns {MlkshkPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Mlkshk Preferences Element
             * @type {MlkshkPreferencesElement}
             */
            this.elements.$preferences = new MlkshkPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf MlkshkView
         * @param widgetRules
         * @param contentRules
         * @returns {MlkshkRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Mlkshk Rules Element
             * @type {MlkshkRulesElement}
             */
            this.elements.$rules = new MlkshkRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render mlkshk
         * @memberOf MlkshkView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderMlkshk.bind(this)
            );
        }

    }, BaseView.prototype)

});
