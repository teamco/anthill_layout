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
         * @memberOf ImageController
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
         * @memberOf ImageController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$image.renderEmbeddedContent({
                url: this.model.getPrefs('imageUrl'),
                text: this.model.getPrefs('imageText'),
                repeatX: this.model.getPrefs('imageRepeatX'),
                repeatY: this.model.getPrefs('imageRepeatY'),
                stretch: this.model.getPrefs('imageStretch')
            });
        },


        /**
         * Split embedded content
         * @memberOf ImageController
         * @param subscribers
         * @param {boolean|*} simulate
         */
        splitEmbeddedContent: function splitEmbeddedContent(subscribers, simulate) {

            subscribers = this.base.define(
                subscribers,
                this.controller.getSubscribers(
                    this.eventmanager.eventList.splitEmbeddedContent
                )
            );

            this.view.elements.$image.renderSplitEmbeddedContent({
                url: this.model.getPrefs('imageUrl'),
                text: this.model.getPrefs('imageText'),
                repeatX: this.model.getPrefs('imageRepeatX'),
                repeatY: this.model.getPrefs('imageRepeatY'),
                stretch: this.model.getPrefs('imageStretch'),
                splitTo: subscribers.length,
                simulate: this.base.defineBoolean(simulate, false, true)
            });

        },

        /**
         * Update preview
         * @memberOf ImageController
         * @param event
         */
        updatePreview: function updatePreview(event) {

            /**
             * Get scope
             * @type {Image}
             */
            var scope = this.scope,
                $referrer = scope.referrer,
                $modal = $referrer.view.get$modal(),
                $preferences = scope.view.elements.$preferences;

            if ($preferences) {
                $preferences.updatePreviewImage(
                    $modal,
                    event
                );
            }
        },

        /**
         * Add Image rule
         * @memberOf ImageController
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
                [$button.attr('value'), this.scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});