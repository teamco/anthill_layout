/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePicasaController(PluginBase, WidgetContentController) {

    /**
     * Define picasa controller
     * @class PicasaController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PicasaController = function PicasaController() {
    };

    return PicasaController.extend('PicasaController', {

        /**
         * Set embedded content
         * @memberOf PicasaController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$picasa.renderEmbeddedContent(
                this.model.getPrefs('picasaEmbedCode')
            );
        },

        /**
         * Add Picasa rule
         * @memberOf PicasaController
         * @param e
         */
        addPicasaRule: function addPicasaRule(e) {

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
