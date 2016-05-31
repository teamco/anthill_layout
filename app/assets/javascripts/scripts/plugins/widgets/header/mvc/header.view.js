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
    'plugins/widgets/header/element/header.element',
    'plugins/widgets/header/element/header.preferences.element',
    'plugins/widgets/header/element/header.rules.element'
], function defineHeaderView(BaseView, Header, Footer, HeaderElement, HeaderPreferencesElement, HeaderRulesElement) {

    /**
     * Define view
     * @class HeaderView
     * @extends BaseView
     * @constructor
     */
    var HeaderView = function HeaderView() {
    };

    return HeaderView.extend('HeaderView', {

        /**
         * Render header element
         * @memberOf HeaderView
         */
        renderHeaderContainer: function renderHeaderContainer() {

            this.header(Header, this.get$container());

            /**
             * Define $header
             * @type {HeaderElement}
             */
            this.elements.$header = new HeaderElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf HeaderView
         * @returns {HeaderPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Header Preferences Element
             * @type {HeaderPreferencesElement}
             */
            this.elements.$preferences = new HeaderPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf HeaderView
         * @param widgetRules
         * @param contentRules
         * @returns {HeaderRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Header Rules Element
             * @type {HeaderRulesElement}
             */
            this.elements.$rules = new HeaderRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render header
         * @memberOf HeaderView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderHeaderContainer.bind(this)
            );
        }

    }, BaseView.prototype)

});