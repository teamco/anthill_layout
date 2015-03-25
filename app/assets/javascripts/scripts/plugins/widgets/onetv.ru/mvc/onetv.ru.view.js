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
    'plugins/widgets/onetv.ru/element/onetv.ru.element',
    'plugins/widgets/onetv.ru/element/onetv.ru.preferences.element',
    'plugins/widgets/onetv.ru/element/onetv.ru.rules.element'
], function defineOnetvRuView(BaseView, Header, Footer, OnetvRuElement, OnetvRuPreferencesElement, OnetvRuRulesElement) {

    /**
     * Define view
     * @class OnetvRuView
     * @extends BaseView
     * @constructor
     */
    var OnetvRuView = function OnetvRuView() {
    };

    return OnetvRuView.extend('OnetvRuView', {

        /**
         * Render onetvru element
         * @member OnetvRuView
         */
        renderOnetvRu: function renderOnetvRu() {

            this.header(Header, this.elements.$container);

            /**
             * Define $onetvru
             * @type {OnetvRuElement}
             */
            this.elements.$onetvru = new OnetvRuElement(this, {
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
         * @member OnetvRuView
         * @returns {OnetvRuPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define OnetvRu Preferences Element
             * @type {OnetvRuPreferencesElement}
             */
            this.elements.$preferences = new OnetvRuPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member OnetvRuView
         * @param widgetRules
         * @param contentRules
         * @returns {OnetvRuRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define OnetvRu Rules Element
             * @type {OnetvRuRulesElement}
             */
            this.elements.$rules = new OnetvRuRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render onetvru
         * @member OnetvRuView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderOnetvRu.bind(this)
            );
        }

    }, BaseView.prototype)

});
