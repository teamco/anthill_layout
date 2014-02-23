/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineGalleryElement(BaseElement) {

    /**
     * Define Gallery Element
     * @param view
     * @param opts
     * @returns {GalleryElement}
     * @constructor
     * @class GalleryElement
     */
    var GalleryElement = function GalleryElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        /**
         * Define max width
         * @type {*|number}
         */
        this.maxWidth = opts.maxWidth || 100;

        /**
         * Define min width
         * @type {*|number}
         */
        this.minWidth = opts.minWidth || 0;

        var url = this.pluginPath + '/gallery/gallery.css',
            uuid = this.$.attr('id') + '-css';

        this.addCSS(url, uuid);

        return this;
    };

    return GalleryElement.extend({

        /**
         * Toggle open/close
         * @param opened
         * @returns {boolean}
         */
        toggle: function toggle(opened) {

            /**
             * Define locals
             */
            var view = this.view,
                scope = view.scope,
                controller = view.controller;

            if (controller.isOpened() === opened) {

                scope.logger.debug('No change');
                return false;
            }

            var $container = view.elements.$container;

            $container.opened(opened);

            scope.observer.publish(
                scope.eventmanager.eventList.loadContent,
                opened
            );

            $container.$.stop().animate({
                width: opened ?
                    this.maxWidth :
                    this.minWidth
            }, 200, function callbackToggle() {
                if (!opened) {
                    $container.$.attr('style', '');
                }
            });

            controller.setBehavior(opened);
        }

    }, BaseElement.prototype);

});