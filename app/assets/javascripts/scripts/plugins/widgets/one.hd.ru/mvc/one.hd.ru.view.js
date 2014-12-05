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
    'plugins/widgets/one.hd.ru/element/one.hd.ru.element',
    'plugins/widgets/one.hd.ru/element/one.hd.ru.preferences.element',
    'plugins/widgets/one.hd.ru/element/one.hd.ru.rules.element'
], function defineOneHdRuView(BaseView, Header, Footer, OneHdRuElement, OneHdRuPreferencesElement, OneHdRuRulesElement) {

    /**
     * Define view
     * @class OneHdRuView
     * @extends BaseView
     * @constructor
     */
    var OneHdRuView = function OneHdRuView() {
    };

    return OneHdRuView.extend('OneHdRuView', {

        /**
         * Render onehdru element
         * @member OneHdRuView
         */
        renderOneHdRu: function renderOneHdRu() {

            this.header(Header, this.elements.$container);

            /**
             * Define $onehdru
             * @type {OneHdRuElement}
             */
            this.elements.$onehdru = new OneHdRuElement(this, {
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
         * @member OneHdRuView
         * @returns {OneHdRuPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define OneHdRu Preferences Element
             * @type {OneHdRuPreferencesElement}
             */
            this.elements.$preferences = new OneHdRuPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member OneHdRuView
         * @param widgetRules
         * @param contentRules
         * @returns {OneHdRuRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define OneHdRu Rules Element
             * @type {OneHdRuRulesElement}
             */
            this.elements.$rules = new OneHdRuRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render onehdru
         * @member OneHdRuView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderOneHdRu.bind(this)
            );
        }

    }, BaseView.prototype)

});
