/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineSketchfabController(PluginBase, WidgetContentController) {

    /**
     * Define Sketchfab controller
     * @class SketchfabController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SketchfabController = function SketchfabController() {
    };

    return SketchfabController.extend('SketchfabController', {

        /**
         * Set embedded content
         * @memberOf SketchfabController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('sketchfabEmbedCode')
            );
        },

        /**
         * Add Sketchfab rule
         * @memberOf SketchfabController
         * @param e
         */
        addSketchfabRule: function addSketchfabRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Sketchfab|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
