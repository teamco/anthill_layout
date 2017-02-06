/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineGfycatController(PluginBase, WidgetContentController) {

    /**
     * Define Gfycat controller
     * @class GfycatController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var GfycatController = function GfycatController() {
    };

    return GfycatController.extend('GfycatController', {

        /**
         * Set embedded content
         * @memberOf GfycatController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('gfycatUrl')
            );
        },

        /**
         * Add Gfycat rule
         * @memberOf GfycatController
         * @param {Event} e
         */
        addGfycatRule: function addGfycatRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Gfycat|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
