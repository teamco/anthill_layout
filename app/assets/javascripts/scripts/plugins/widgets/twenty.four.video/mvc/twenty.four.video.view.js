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
    'plugins/widgets/twenty.four.video/element/twenty.four.video.element',
    'plugins/widgets/twenty.four.video/element/twenty.four.video.preferences.element',
    'plugins/widgets/twenty.four.video/element/twenty.four.video.rules.element'
], function defineTwentyFourVideoView(BaseView, Header, Footer, TwentyFourVideoElement, TwentyFourVideoPreferencesElement, TwentyFourVideoRulesElement) {

    /**
     * Define view
     * @class TwentyFourVideoView
     * @extends BaseView
     * @constructor
     */
    var TwentyFourVideoView = function TwentyFourVideoView() {
    };

    return TwentyFourVideoView.extend('TwentyFourVideoView', {

        /**
         * Render twentyfourvideo element
         * @memberOf TwentyFourVideoView
         */
        renderTwentyFourVideo: function renderTwentyFourVideo() {

            this.header(Header, this.get$container());

            /**
             * Define $twentyfourvideo
             * @type {TwentyFourVideoElement}
             */
            this.elements.$twentyfourvideo = new TwentyFourVideoElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf TwentyFourVideoView
         * @returns {TwentyFourVideoPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define TwentyFourVideo Preferences Element
             * @type {TwentyFourVideoPreferencesElement}
             */
            this.elements.$preferences = new TwentyFourVideoPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf TwentyFourVideoView
         * @param widgetRules
         * @param contentRules
         * @returns {TwentyFourVideoRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define TwentyFourVideo Rules Element
             * @type {TwentyFourVideoRulesElement}
             */
            this.elements.$rules = new TwentyFourVideoRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render twentyfourvideo
         * @memberOf TwentyFourVideoView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderTwentyFourVideo.bind(this)
            );
        }

    }, BaseView.prototype)

});
