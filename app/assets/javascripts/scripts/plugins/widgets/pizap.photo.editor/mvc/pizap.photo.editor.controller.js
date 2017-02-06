/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function definePizapPhotoEditorController(PluginBase, WidgetContentController) {

    /**
     * Define PizapPhotoEditor controller
     * @class PizapPhotoEditorController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PizapPhotoEditorController = function PizapPhotoEditorController() {
    };

    return PizapPhotoEditorController.extend('PizapPhotoEditorController', {

        /**
         * Set embedded content
         * @memberOf PizapPhotoEditorController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('pizapphotoeditorHtmlCode')
            );
        },

        /**
         * Add PizapPhotoEditor rule
         * @memberOf PizapPhotoEditorController
         * @param {Event} e
         */
        addPizapPhotoEditorRule: function addPizapPhotoEditorRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {PizapPhotoEditor|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
