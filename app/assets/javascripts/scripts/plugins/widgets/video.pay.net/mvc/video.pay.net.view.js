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
    'plugins/widgets/video.pay.net/element/video.pay.net.element',
    'plugins/widgets/video.pay.net/element/video.pay.net.preferences.element',
    'plugins/widgets/video.pay.net/element/video.pay.net.rules.element'
], function defineVideoPayNetView(BaseView, Header, Footer, VideoPayNetElement, VideoPayNetPreferencesElement, VideoPayNetRulesElement) {

    /**
     * Define view
     * @class VideoPayNetView
     * @extends BaseView
     * @constructor
     */
    var VideoPayNetView = function VideoPayNetView() {
    };

    return VideoPayNetView.extend('VideoPayNetView', {

        /**
         * Render VideoPayNet element
         * @member VideoPayNetView
         */
        renderVideoPayNet: function renderVideoPayNet() {

            this.header(Header, this.elements.$container);

            /**
             * Define $videopaynet
             * @type {VideoPayNetElement}
             */
            this.elements.$videopaynet = new VideoPayNetElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @member VideoPayNetView
         * @returns {VideoPayNetPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define VideoPayNet Preferences Element
             * @type {VideoPayNetPreferencesElement}
             */
            this.elements.$preferences = new VideoPayNetPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member VideoPayNetView
         * @param widgetRules
         * @param contentRules
         * @returns {VideoPayNetRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define VideoPayNet Rules Element
             * @type {VideoPayNetRulesElement}
             */
            this.elements.$rules = new VideoPayNetRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render VideoPayNet
         * @member VideoPayNetView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderVideoPayNet.bind(this)
            );
        }

    }, BaseView.prototype)

});
