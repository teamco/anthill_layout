/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineSoundCloudController(PluginBase, WidgetContentController) {

    /**
     * Define soundcloud controller
     * @class SoundCloudController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SoundCloudController = function SoundCloudController() {
    };

    return SoundCloudController.extend('SoundCloudController', {

        /**
         * Set embedded content
         * @member SoundCloudController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('soundcloudEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$soundcloud.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate soundcloud
         * @member SoundCloudController
         * @param {string} embed
         * @return {string|boolean}
         */
        getEmbedCode: function getEmbedCode(embed) {

            if (!embed) {
                this.scope.logger.debug('Initial state');
                return false;
            }

            // Convert to string
            embed += '';

            if (embed.match(/^<iframe/)) {

                return $(embed).attr('src');

            } else {

                this.scope.logger.warn('Invalid SoundCloud embed code');
                return false;
            }
        },

        /**
         * Add SoundCloud rule
         * @member SoundCloudController
         * @param e
         */
        addSoundCloudRule: function addSoundCloudRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
