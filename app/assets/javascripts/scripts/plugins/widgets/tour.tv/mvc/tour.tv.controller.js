/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineTourTvController(PluginBase, WidgetContentController) {

    /**
     * Define tourtv controller
     * @class TourTvController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TourTvController = function TourTvController() {
    };

    return TourTvController.extend('TourTvController', {

        /**
         * Set embedded content
         * @member TourTvController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$tourtv.renderEmbeddedContent(
                this.model.getPrefs('tourtvEmbedCode')
            );
        },

        /**
         * Add TourTv rule
         * @member TourTvController
         * @param e
         */
        addTourTvRule: function addTourTvRule(e) {

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
