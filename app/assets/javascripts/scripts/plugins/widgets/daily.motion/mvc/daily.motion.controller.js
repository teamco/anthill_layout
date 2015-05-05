/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineDailyMotionController(PluginBase, WidgetContentController) {

    /**
     * Define dailymotion controller
     * @class DailyMotionController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var DailyMotionController = function DailyMotionController() {
    };

    return DailyMotionController.extend('DailyMotionController', {

        /**
         * Set embedded content
         * @memberOf DailyMotionController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('dailymotionUrl'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$dailymotion.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate dailymotion
         * @memberOf DailyMotionController
         * @param {string} url
         * @return {string|boolean}
         */
        getEmbedCode: function getEmbedCode(url) {

            if (!url) {
                this.scope.logger.debug('Initial state');
                return false;
            }

            // Convert to string
            url += '';

            if (url.match(/iframe/)) {
                return $(url)[0].src;
            }

            var mask = this.model.getConfig('mask'),
                regex = url.match(
                    this.model.getConfig('regex')
                );

            return mask.replace(/\{id}/g, regex[1]);
        },

        /**
         * Add DailyMotion rule
         * @memberOf DailyMotionController
         * @param e
         */
        addDailyMotionRule: function addDailyMotionRule(e) {

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
