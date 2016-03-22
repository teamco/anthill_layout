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
    'plugins/widgets/issuu/element/issuu.element',
    'plugins/widgets/issuu/element/issuu.preferences.element',
    'plugins/widgets/issuu/element/issuu.rules.element'
], function defineIssuuView(BaseView, Header, Footer, IssuuElement, IssuuPreferencesElement, IssuuRulesElement) {

    /**
     * Define view
     * @class IssuuView
     * @extends BaseView
     * @constructor
     */
    var IssuuView = function IssuuView() {
    };

    return IssuuView.extend('IssuuView', {

        /**
         * Render issuu element
         * @memberOf IssuuView
         */
        renderIssuu: function renderIssuu() {

            this.header(Header, this.get$container());

            /**
             * Define $issuu
             * @type {IssuuElement}
             */
            this.elements.$issuu = new IssuuElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf IssuuView
         * @returns {IssuuPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Issuu Preferences Element
             * @type {IssuuPreferencesElement}
             */
            this.elements.$preferences = new IssuuPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf IssuuView
         * @param widgetRules
         * @param contentRules
         * @returns {IssuuRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Issuu Rules Element
             * @type {IssuuRulesElement}
             */
            this.elements.$rules = new IssuuRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render issuu
         * @memberOf IssuuView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderIssuu.bind(this)
            );
        }

    }, BaseView.prototype)

});
