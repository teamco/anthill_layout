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
    'plugins/widgets/live.amcharts/element/live.amcharts.element',
    'plugins/widgets/live.amcharts/element/live.amcharts.preferences.element',
    'plugins/widgets/live.amcharts/element/live.amcharts.rules.element'
], function defineLiveAmchartsView(BaseView, Header, Footer, LiveAmchartsElement, LiveAmchartsPreferencesElement, LiveAmchartsRulesElement) {

    /**
     * Define view
     * @class LiveAmchartsView
     * @extends BaseView
     * @constructor
     */
    var LiveAmchartsView = function LiveAmchartsView() {
    };

    return LiveAmchartsView.extend('LiveAmchartsView', {

        /**
         * Render LiveAmcharts element
         * @memberOf LiveAmchartsView
         */
        renderLiveAmcharts: function renderLiveAmcharts() {

            this.header(Header, this.get$container());

            /**
             * Define $liveamcharts
             * @type {LiveAmchartsElement}
             */
            this.elements.$liveamcharts = new LiveAmchartsElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf LiveAmchartsView
         * @returns {LiveAmchartsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define LiveAmcharts Preferences Element
             * @type {LiveAmchartsPreferencesElement}
             */
            this.elements.$preferences = new LiveAmchartsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf LiveAmchartsView
         * @param widgetRules
         * @param contentRules
         * @returns {LiveAmchartsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define LiveAmcharts Rules Element
             * @type {LiveAmchartsRulesElement}
             */
            this.elements.$rules = new LiveAmchartsRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render LiveAmcharts
         * @memberOf LiveAmchartsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderLiveAmcharts.bind(this)
            );
        }

    }, BaseView.prototype);
});
