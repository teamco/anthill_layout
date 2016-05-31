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
    'plugins/widgets/title/element/title.element',
    'plugins/widgets/title/element/title.preferences.element',
    'plugins/widgets/title/element/title.rules.element'
], function defineTitleView(BaseView, Header, Footer, TitleElement, TitlePreferencesElement, TitleRulesElement) {

    /**
     * Define view
     * @class TitleView
     * @extends BaseView
     * @constructor
     */
    var TitleView = function TitleView() {
    };

    return TitleView.extend('TitleView', {

        /**
         * Render Title element
         * @memberOf TitleView
         */
        renderTitle: function renderTitle() {

            this.header(Header, this.get$container());

            /**
             * Define $title
             * @type {TitleElement}
             */
            this.elements.$title = new TitleElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf TitleView
         * @returns {TitlePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Title Preferences Element
             * @type {TitlePreferencesElement}
             */
            this.elements.$preferences = new TitlePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf TitleView
         * @param widgetRules
         * @param contentRules
         * @returns {TitleRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Title Rules Element
             * @type {TitleRulesElement}
             */
            this.elements.$rules = new TitleRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Title
         * @memberOf TitleView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderTitle.bind(this)
            );
        }

    }, BaseView.prototype);
});
