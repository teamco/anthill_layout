/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineVideochartNetController(PluginBase, WidgetContentController) {

    /**
     * Define VideochartNet controller
     * @class VideochartNetController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var VideochartNetController = function VideochartNetController() {
    };

    return VideochartNetController.extend('VideochartNetController', {

        /**
         * Set embedded content
         * @memberOf VideochartNetController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('videochartnetUrl')
            );
        },

        /**
         * Add VideochartNet rule
         * @memberOf VideochartNetController
         * @param {Event} e
         */
        addVideochartNetRule: function addVideochartNetRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {VideochartNet|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
