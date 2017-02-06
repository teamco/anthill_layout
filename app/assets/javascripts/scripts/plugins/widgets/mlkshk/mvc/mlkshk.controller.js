/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineMlkshkController(PluginBase, WidgetContentController) {

    /**
     * Define mlkshk controller
     * @class MlkshkController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var MlkshkController = function MlkshkController() {
    };

    return MlkshkController.extend('MlkshkController', {

        /**
         * Set embedded content
         * @memberOf MlkshkController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$mlkshk.renderEmbeddedContent(
                this.controller.getEmbedCode(
                    this.model.getPrefs('mlkshkEmbedCode')
                )
            );
        },

        /**
         * Validate Mlkshk
         * @memberOf MlkshkController
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

            /**
             * Define regex
             * @type {Array|{index: number, input: string}}
             */
            var regex = url.match(/\/r\/(\w+)/);

            if (this.base.isUrl(url) && regex) {
                return regex[1];
            }

            this.scope.logger.warn('Invalid Mlkshk embed code');
        },

        /**
         * Add Mlkshk rule
         * @memberOf MlkshkController
         * @param {Event} e
         */
        addMlkshkRule: function addMlkshkRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
