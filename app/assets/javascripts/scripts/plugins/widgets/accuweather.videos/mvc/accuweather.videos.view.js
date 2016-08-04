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
    'plugins/widgets/accuweather.videos/element/accuweather.videos.element',
    'plugins/widgets/accuweather.videos/element/accuweather.videos.preferences.element',
    'plugins/widgets/accuweather.videos/element/accuweather.videos.rules.element'
], function defineAccuweatherVideosView(BaseView, Header, Footer, AccuweatherVideosElement, AccuweatherVideosPreferencesElement, AccuweatherVideosRulesElement) {

    /**
     * Define view
     * @class AccuweatherVideosView
     * @extends BaseView
     * @constructor
     */
    var AccuweatherVideosView = function AccuweatherVideosView() {
    };

    return AccuweatherVideosView.extend('AccuweatherVideosView', {

        /**
         * Render AccuweatherVideos element
         * @memberOf AccuweatherVideosView
         */
        renderAccuweatherVideos: function renderAccuweatherVideos() {

            this.header(Header, this.get$container());

            /**
             * Define $accuweathervideos
             * @type {AccuweatherVideosElement}
             */
            this.elements.$accuweathervideos = new AccuweatherVideosElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf AccuweatherVideosView
         * @returns {AccuweatherVideosPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define AccuweatherVideos Preferences Element
             * @type {AccuweatherVideosPreferencesElement}
             */
            this.elements.$preferences = new AccuweatherVideosPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf AccuweatherVideosView
         * @param widgetRules
         * @param contentRules
         * @returns {AccuweatherVideosRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define AccuweatherVideos Rules Element
             * @type {AccuweatherVideosRulesElement}
             */
            this.elements.$rules = new AccuweatherVideosRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render AccuweatherVideos
         * @memberOf AccuweatherVideosView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderAccuweatherVideos.bind(this)
            );
        }

    }, BaseView.prototype);
});
