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
         * @memberOf OnetvRuView
         */
        renderOnetvRu: function renderOnetvRu() {

            this.header(Header, this.get$container());

            /**
             * Define $onetvru
             * @type {OnetvRuElement}
             */
            this.elements.$onetvru = new OnetvRuElement(this, {
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
         * @memberOf OnetvRuView
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

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf OnetvRuView
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

            return this.get$rules();
        },

        /**
         * Render onetvru
         * @memberOf OnetvRuView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderOnetvRu.bind(this)
            );
        }

    }, BaseView.prototype)

});
