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
         * @property Wireframe
         * @type {*}
         */
        this.widget = widget;

        /**
         * Define selector
         * @property Wireframe
         * @type {string}
         */
        this.selector = 'next-widget-position';
    };

    return Wireframe.extend('Wireframe', {

        /**
         * Move wireframe on widget drag
         * @memberOf Wireframe
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
         * @memberOf Wireframe
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
         * @memberOf Wireframe
         */
        show: function show() {
            this.$.show();
        },

        /**
         * Hide wireframe
         * @memberOf Wireframe
         */
        hide: function hide() {
            this.$.hide();
        },

        /**
         * Get wireframe jQuery element
         * @memberOf Wireframe
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
         * @memberOf Wireframe
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
         * @memberOf Wireframe
         * @param {{style}} opts
         * @returns {*}
         */
        defineHolder: function defineHolder(opts) {

            /**
             * Define wireframe element
             * @memberOf Wireframe
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
         * @memberOf Wireframe
         * @param opts
         */
        init: function init(opts) {

            opts = this.base.define(opts, {}, true);

            this.defineHolder(opts).show();
            this.$.css(opts.style);
        }

    }, AntHill.prototype);
});