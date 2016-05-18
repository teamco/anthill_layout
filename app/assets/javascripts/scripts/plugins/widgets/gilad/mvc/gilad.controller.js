/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineGiladController(PluginBase, WidgetContentController) {

    /**
     * Define Gilad controller
     * @class GiladController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var GiladController = function GiladController() {
    };

    return GiladController.extend('GiladController', {

        /**
         * Set embedded content
         * @memberOf GiladController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add Gilad rule
         * @memberOf GiladController
         * @param e
         */
        addGiladRule: function addGiladRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Gilad|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
