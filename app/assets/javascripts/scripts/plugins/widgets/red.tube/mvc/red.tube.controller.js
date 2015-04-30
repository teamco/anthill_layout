/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineRedTubeController(PluginBase, WidgetContentController) {

    /**
     * Define RedTube controller
     * @class RedTubeController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var RedTubeController = function RedTubeController() {
    };

    return RedTubeController.extend('RedTubeController', {

        /**
         * Set embedded content
         * @memberOf RedTubeController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('redTubeUrl'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$redtube.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate red tube
         * @memberOf RedTubeController
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

            if (!regex) {
                this.scope.logger.warn('Invalid RedTube url');
                return false;
            }

            return mask.replace(/\{id}/g, regex[0]);
        },

        /**
         * Add RedTube rule
         * @memberOf RedTubeController
         * @param e
         */
        addRedTubeRule: function addRedTubeRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
