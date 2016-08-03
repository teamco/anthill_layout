/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineFastpicController(PluginBase, WidgetContentController) {

    /**
     * Define Fastpic controller
     * @class FastpicController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var FastpicController = function FastpicController() {
    };

    return FastpicController.extend('FastpicController', {

        /**
         * Set embedded content
         * @memberOf FastpicController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('fastpicImageUrl')
            );
        },

        /**
         * Add Fastpic rule
         * @memberOf FastpicController
         * @param e
         */
        addFastpicRule: function addFastpicRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Fastpic|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
