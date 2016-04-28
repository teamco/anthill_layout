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
    'plugins/widgets/iframely/element/iframely.element',
    'plugins/widgets/iframely/element/iframely.preferences.element',
    'plugins/widgets/iframely/element/iframely.rules.element'
], function defineIframelyView(BaseView, Header, Footer, IframelyElement, IframelyPreferencesElement, IframelyRulesElement) {

    /**
     * Define view
     * @class IframelyView
     * @extends BaseView
     * @constructor
     */
    var IframelyView = function IframelyView() {
    };

    return IframelyView.extend('IframelyView', {

        /**
         * Render Iframely element
         * @memberOf IframelyView
         */
        renderIframely: function renderIframely() {

            this.header(Header, this.get$container());

            /**
             * Define $iframely
             * @type {IframelyElement}
             */
            this.elements.$iframely = new IframelyElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf IframelyView
         * @returns {IframelyPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Iframely Preferences Element
             * @type {IframelyPreferencesElement}
             */
            this.elements.$preferences = new IframelyPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf IframelyView
         * @param widgetRules
         * @param contentRules
         * @returns {IframelyRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Iframely Rules Element
             * @type {IframelyRulesElement}
             */
            this.elements.$rules = new IframelyRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Iframely
         * @memberOf IframelyView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderIframely.bind(this)
            );
        }

    }, BaseView.prototype);
});
