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
    'plugins/widgets/videopress/element/videopress.element',
    'plugins/widgets/videopress/element/videopress.preferences.element',
    'plugins/widgets/videopress/element/videopress.rules.element'
], function defineVideopressView(BaseView, Header, Footer, VideopressElement, VideopressPreferencesElement, VideopressRulesElement) {

    /**
     * Define view
     * @class VideopressView
     * @extends BaseView
     * @constructor
     */
    var VideopressView = function VideopressView() {
    };

    return VideopressView.extend('VideopressView', {

        /**
         * Render Videopress element
         * @memberOf VideopressView
         */
        renderVideopress: function renderVideopress() {

            this.header(Header, this.get$container());

            /**
             * Define $videopress
             * @type {VideopressElement}
             */
            this.elements.$videopress = new VideopressElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf VideopressView
         * @returns {VideopressPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Videopress Preferences Element
             * @type {VideopressPreferencesElement}
             */
            this.elements.$preferences = new VideopressPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf VideopressView
         * @param widgetRules
         * @param contentRules
         * @returns {VideopressRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Videopress Rules Element
             * @type {VideopressRulesElement}
             */
            this.elements.$rules = new VideopressRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Videopress
         * @memberOf VideopressView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderVideopress.bind(this)
            );
        }

    }, BaseView.prototype);
});
