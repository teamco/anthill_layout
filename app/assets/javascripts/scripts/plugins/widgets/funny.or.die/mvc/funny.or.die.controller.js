/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineFunnyOrDieController(PluginBase, WidgetContentController) {

    /**
     * Define funnyordie controller
     * @class FunnyOrDieController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var FunnyOrDieController = function FunnyOrDieController() {
    };

    return FunnyOrDieController.extend('FunnyOrDieController', {

        /**
         * Set embedded content
         * @memberOf FunnyOrDieController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('funnyordieUrl'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$funnyordie.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate funnyordie
         * @memberOf FunnyOrDieController
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

            return mask.replace(/\{id}/g, regex[1]);
        },

        /**
         * Add FunnyOrDie rule
         * @memberOf FunnyOrDieController
         * @param e
         */
        addFunnyOrDieRule: function addFunnyOrDieRule(e) {

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
