/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineShareController(PluginBase, WidgetContentController) {

    /**
     * Define share controller
     * @class ShareController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ShareController = function ShareController() {
    };

    return ShareController.extend('ShareController', {

        /**
         * Set embedded content
         * @member ShareController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$share.renderEmbeddedContent({

            });
        },

        /**
         * Add Share rule
         * @member ShareController
         * @param e
         */
        addShareRule: function addShareRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});