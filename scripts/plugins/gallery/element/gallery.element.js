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

        toggle: function toggle(opened) {

            if (this.view.controller.isOpened() === opened) {

                this.view.scope.logger.debug('No change');
                return false;
            }

            var $container = this.view.elements.$container;

            $container.opened(opened);

            $container.$.stop().animate({
                width: opened ?
                    this.maxWidth :
                    this.minWidth
            }, 200, function callbackToggle(){
                if (!opened) {
                    $container.$.attr('style', '');
                }
            });

            this.view.controller.setBehavior(opened);
        }

    }, BaseElement.prototype);

});