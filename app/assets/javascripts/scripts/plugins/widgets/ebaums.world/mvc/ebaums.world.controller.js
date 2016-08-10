/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineEbaumsWorldController(PluginBase, WidgetContentController) {

    /**
     * Define EbaumsWorld controller
     * @class EbaumsWorldController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var EbaumsWorldController = function EbaumsWorldController() {
    };

    return EbaumsWorldController.extend('EbaumsWorldController', {

        /**
         * Set embedded content
         * @memberOf EbaumsWorldController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('ebaumsworldEmbedCode')
            );
        },

        /**
         * Add EbaumsWorld rule
         * @memberOf EbaumsWorldController
         * @param e
         */
        addEbaumsWorldRule: function addEbaumsWorldRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {EbaumsWorld|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
