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
    'plugins/widgets/videochart.net/element/videochart.net.element',
    'plugins/widgets/videochart.net/element/videochart.net.preferences.element',
    'plugins/widgets/videochart.net/element/videochart.net.rules.element'
], function defineVideochartNetView(BaseView, Header, Footer, VideochartNetElement, VideochartNetPreferencesElement, VideochartNetRulesElement) {

    /**
     * Define view
     * @class VideochartNetView
     * @extends BaseView
     * @constructor
     */
    var VideochartNetView = function VideochartNetView() {
    };

    return VideochartNetView.extend('VideochartNetView', {

        /**
         * Render VideochartNet element
         * @memberOf VideochartNetView
         */
        renderVideochartNet: function renderVideochartNet() {

            this.header(Header, this.get$container());

            /**
             * Define $videochartnet
             * @type {VideochartNetElement}
             */
            this.elements.$videochartnet = new VideochartNetElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf VideochartNetView
         * @returns {VideochartNetPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define VideochartNet Preferences Element
             * @type {VideochartNetPreferencesElement}
             */
            this.elements.$preferences = new VideochartNetPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf VideochartNetView
         * @param widgetRules
         * @param contentRules
         * @returns {VideochartNetRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define VideochartNet Rules Element
             * @type {VideochartNetRulesElement}
             */
            this.elements.$rules = new VideochartNetRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render VideochartNet
         * @memberOf VideochartNetView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderVideochartNet.bind(this)
            );
        }

    }, BaseView.prototype);
});
