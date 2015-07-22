/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineJwplayerController(PluginBase, WidgetContentController) {

    /**
     * Define jwplayer controller
     * @class JwplayerController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var JwplayerController = function JwplayerController() {
    };

    return JwplayerController.extend('JwplayerController', {

        /**
         * Set embedded content
         * @memberOf JwplayerController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$jwplayer.renderEmbeddedContent({
                title: this.model.getPrefs('jwplayerVideoTitle'),
                script: this.model.getPrefs('jwplayerScriptUrl'),
                rtmp: this.model.getPrefs('jwplayerRtmpUrl'),
                image: this.model.getPrefs('jwplayerImageUrl'),
                width: this.model.getPrefs('jwplayerWidth'),
                aspectratio: this.model.getPrefs('jwplayerAspectRatio'),
                autostart: this.model.getPrefs('jwplayerAutoStart')
            });
        },

        /**
         * Validate jwplayer
         * @memberOf JwplayerController
         * @param {string} url
         * @return {string|boolean}
         */
        getEmbedCode: function getEmbedCode(url) {

            if (!url) {
                this.scope.logger.debug('Initial state');
                return false;
            }

            var mask = this.model.getConfig('mask'),
                embed, regex = this.model.getConfig('regex');

            if (!url.match(regex)) {
                this.scope.logger.warn('Invalid jwplayer url');
                return false;
            }

            if (url.match(/iframe/)) {

                /**
                 * Embed iframe fix
                 * @type {string}
                 */
                url = $(url).attr('src');
            }

            return url.replace(regex, mask.replace(/{{videoId}}/g, '$1')).
                replace(/embed\/embed/, 'embed');
        },

        /**
         * Add Jwplayer rule
         * @memberOf JwplayerController
         * @param e
         */
        addJwplayerRule: function addJwplayerRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});