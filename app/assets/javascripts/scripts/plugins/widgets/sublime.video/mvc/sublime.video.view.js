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
    'plugins/widgets/sublime.video/element/sublime.video.element',
    'plugins/widgets/sublime.video/element/sublime.video.preferences.element',
    'plugins/widgets/sublime.video/element/sublime.video.rules.element'
], function defineSublimeVideoView(BaseView, Header, Footer, SublimeVideoElement, SublimeVideoPreferencesElement, SublimeVideoRulesElement) {

    /**
     * Define view
     * @class SublimeVideoView
     * @extends BaseView
     * @constructor
     */
    var SublimeVideoView = function SublimeVideoView() {
    };

    return SublimeVideoView.extend('SublimeVideoView', {

        /**
         * Render sublimevideo element
         * @memberOf SublimeVideoView
         */
        renderSublimeVideo: function renderSublimeVideo() {

            this.header(Header, this.get$container());

            /**
             * Define $sublimevideo
             * @type {SublimeVideoElement}
             */
            this.elements.$sublimevideo = new SublimeVideoElement(this, {
                $container: this.get$container(),
                id: this.createUUID()
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf SublimeVideoView
         * @returns {SublimeVideoPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define SublimeVideo Preferences Element
             * @type {SublimeVideoPreferencesElement}
             */
            this.elements.$preferences = new SublimeVideoPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf SublimeVideoView
         * @param widgetRules
         * @param contentRules
         * @returns {SublimeVideoRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define SublimeVideo Rules Element
             * @type {SublimeVideoRulesElement}
             */
            this.elements.$rules = new SublimeVideoRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render sublimevideo
         * @memberOf SublimeVideoView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSublimeVideo.bind(this)
            );
        }

    }, BaseView.prototype)

});
