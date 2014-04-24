/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineImageController(PluginBase, WidgetContentController) {

    /**
     * Define image controller
     * @class ImageController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ImageController = function ImageController() {
    };

    return ImageController.extend('ImageController', {

        /**
         * Check rendering content
         * @member @ImageController
         */
        checkEmbeddedContent: function checkEmbeddedContent() {

            /**
             * Define event
             * @type {splitEmbeddedContent|setEmbeddedContent|string}
             */
            var event = this.model.getPrefs('imageSplitContent') ?
                this.eventmanager.eventList.splitEmbeddedContent :
                this.eventmanager.eventList.setEmbeddedContent;

            this.observer.publish(event);
        },

        /**
         * Set embedded content
         * @member ImageController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$image.renderEmbeddedContent(
                this.model.getPrefs('imageUrl'),
                this.model.getPrefs('imageText'),
                this.model.getPrefs('imageRepeatX'),
                this.model.getPrefs('imageRepeatY'),
                this.model.getPrefs('imageStretch')
            );
        },


        splitEmbeddedContent: function splitEmbeddedContent(subscribers) {

            subscribers = this.base.define(
                subscribers,
                this.controller.getSubscribers(
                    this.eventmanager.eventList.splitEmbeddedContent
                )
            );

            this.view.elements.$image.renderSplitEmbeddedContent(
                this.model.getPrefs('imageUrl'),
                this.model.getPrefs('imageText'),
                this.model.getPrefs('imageRepeatX'),
                this.model.getPrefs('imageRepeatY'),
                this.model.getPrefs('imageStretch'),
                subscribers.length
            );

        },

        /**
         * Add Image rule
         * @member ImageController
         * @param e
         */
        addImageRule: function addImageRule(e) {

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