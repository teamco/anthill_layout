/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineClocklinkController(PluginBase, WidgetContentController) {

    /**
     * Define Clocklink controller
     * @class ClocklinkController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ClocklinkController = function ClocklinkController() {
    };

    return ClocklinkController.extend('ClocklinkController', {

        /**
         * Set embedded content
         * @memberOf ClocklinkController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$clocklink.renderEmbeddedContent();
        },

        /**
         * Add Clocklink rule
         * @memberOf ClocklinkController
         * @param e
         */
        addClocklinkRule: function addClocklinkRule(e) {

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
