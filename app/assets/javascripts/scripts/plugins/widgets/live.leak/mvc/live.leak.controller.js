/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineLiveLeakController(PluginBase, WidgetContentController) {

    /**
     * Define LiveLeak controller
     * @class LiveLeakController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var LiveLeakController = function LiveLeakController() {
    };

    return LiveLeakController.extend('LiveLeakController', {

        /**
         * Set embedded content
         * @memberOf LiveLeakController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('liveleakUrl'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$liveleak.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate LiveLeak
         * @memberOf LiveLeakController
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
                url = $(url).attr('src');
            }

            var mask = this.model.getConfig('mask'),
                regex = url.match(
                    this.model.getConfig('regex')
                );

            if (!regex || url.match(/^\[/)) {
                this.scope.logger.warn('Invalid LiveLeak url');
                return false;
            }

            return mask.replace(/\{id}/g, regex[1]);
        },

        /**
         * Add LiveLeak rule
         * @memberOf LiveLeakController
         * @param e
         */
        addLiveLeakRule: function addLiveLeakRule(e) {

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
