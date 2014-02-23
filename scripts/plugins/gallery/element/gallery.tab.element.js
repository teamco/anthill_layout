/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineGalleryTabElement(BaseElement) {

    /**
     * Define Gallery Tab Element
     * @param view
     * @param opts
     * @returns {GalleryTabElement}
     * @constructor
     * @class GalleryTabElement
     */
    var GalleryTabElement = function GalleryTabElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.bindToggle();

        return this;
    };

    return GalleryTabElement.extend({

        bindToggle: function bindToggle() {

            var $gallery = this.view.elements.$gallery;

            this.$.on('click.toggle', function(){
                this.view.controller.isOpened() ?
                    $gallery.close.bind($gallery)() :
                    $gallery.open.bind($gallery)()
                }.bind(this)
            )
        }

    }, BaseElement.prototype);

});