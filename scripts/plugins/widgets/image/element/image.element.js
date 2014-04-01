/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineImageElement(BaseElement) {

    /**
     * Define Image Element
     * @param view
     * @param opts
     * @returns {ImageElement}
     * @constructor
     * @class ImageElement
     * @extends BaseElement
     */
    var ImageElement = function ImageElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('image', {resource: '/widgets'});

        return this;
    };

    return ImageElement.extend('ImageElement', {

        /**
         * Render Embedded content
         * @member ImageElement
         * @param {string} url
         * @param {string} text
         * @param {number} splitTo
         */
        renderEmbeddedContent: function renderEmbeddedContent(url, text, splitTo) {

            if (!url) {
                return false;
            }

            /**
             * Init splitTo
             * @type {number}
             */
            splitTo = this.base.define(splitTo, this.view.controller.getSubscribers(
                this.view.scope.eventmanager.eventList.setEmbeddedContent
            ).length + 1, true);

            /**
             * Define $img
             * @type {*|jQuery}
             */
            var $img = $('<img />').attr({
                src: url,
                alt: text,
                title: text
            });

            /**
             * Define embedded template
             * @type {string}
             */
            this.setHtml($img);

            if (splitTo > 1) {

                $img.css({
                    width: 'auto'
                });

                $img.parent().css({
                    overflow: 'hidden'
                });
            }
        }

    }, BaseElement.prototype);

});