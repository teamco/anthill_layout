/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/24/13
 * Time: 12:24 AM
 */

define([
    'config/anthill'
], function defineWidgetWireframe(AntHill) {

    /**
     * Define Widget Wireframe
     * @class Wireframe
     * @extends AntHill
     * @param {*} widget
     * @constructor
     */
    var Wireframe = function Wireframe(widget) {

        /**
         * Define widget
         * @member Wireframe
         * @type {*}
         */
        this.widget = widget;

        /**
         * Define selector
         * @member Wireframe
         * @type {string}
         */
        this.selector = 'next-widget-position';
    };

    return Wireframe.extend('Wireframe', {

        /**
         * Move wireframe on widget drag
         * @member Wireframe
         */
        dragSticker: function dragSticker() {

            /**
             * Define DOM
             * @type {*}
             */
            var dom = this.widget.map.getDOM();

            this.init({
                style: {
                    left: dom.left,
                    top: dom.top,
                    width: dom.width,
                    height: dom.height
                },
                animate: false
            });
        },

        /**
         * Resize wireframe on widget resize
         * @member Wireframe
         */
        resizeSticker: function resizeSticker() {

            /**
             * Define CSS
             * @type {{width: Number, height: Number}}
             */
            var css = this.widget.map.resizeTo();

            this.init({
                style: {
                    left: css.left,
                    top: css.top,
                    width: css.width,
                    height: css.height
                },
                animate: false
            });
        },

        /**
         * Show wireframe
         * @member Wireframe
         */
        show: function show() {
            this.$.show();
        },

        /**
         * Hide wireframe
         * @member Wireframe
         */
        hide: function hide() {
            this.$.hide();
        },

        /**
         * Get wireframe jQuery element
         * @member Wireframe
         * @returns {*}
         */
        getWireFrame: function getWireFrame() {

            /**
             * Define uuid
             * @type {string}
             */
            var uuid = '#' + this.selector;

            return $(
                uuid,
                this.widget.controller.get$page().$
            );
        },

        /**
         * Move wireframe to current page
         * @member Wireframe
         */
        moveToCurrentPage: function moveToCurrentPage() {
            if (this.getWireFrame().length === 0) {
                this.$.appendTo(
                    this.widget.controller.get$page().$
                );
            }
        },

        /**
         * Define wireframe jQuery element
         * @member Wireframe
         * @param {{style}} opts
         * @returns {*}
         */
        defineHolder: function defineHolder(opts) {

            /**
             * Define wireframe element
             * @member Wireframe
             * @type {*}
             */
            this.$ = this.getWireFrame();

            if (this.$.length === 0) {
                $('#' + this.selector).remove();
                this.$ = $('<div />').css(opts.style).attr({
                    id: this.selector
                });
            }

            this.moveToCurrentPage();

            return this;
        },

        /**
         * Init wireframe
         * @member Wireframe
         * @param opts
         */
        init: function init(opts) {

            opts = this.base.define(opts, {}, true);

            this.defineHolder(opts).show();
            this.$.css(opts.style);
        }

    }, AntHill.prototype);
});