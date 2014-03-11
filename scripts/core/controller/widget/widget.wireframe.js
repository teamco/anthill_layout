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
     * @param {*} widget
     * @constructor
     */
    var Wireframe = function Wireframe(widget) {

        /**
         * Define widget
         * @type {*}
         */
        this.widget = widget;

        /**
         * Define opacity
         * @type {number}
         */
        this.opacity = 0.2;

        /**
         * Define selector
         * @type {string}
         */
        this.selector = '#next-widget-position';
    };

    return Wireframe.extend({

        /**
         * Move wireframe on widget drag
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
                    height: dom.height,
                    opacity: this.opacity
                },
                animate: false
            });
        },

        /**
         * Resize wireframe on widget resize
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
                    height: css.height,
                    opacity: this.opacity
                },
                animate: false
            });
        },

        /**
         * Show wireframe
         */
        show: function show() {

            this.setVisibility('fadeIn', 'fast');
        },

        /**
         * Hide wireframe
         */
        hide: function hide() {

            this.setVisibility('fadeOut', 'fast');
        },

        /**
         * Set wireframe visibility
         * @param {String} fade
         * @param {String} type
         */
        setVisibility: function setVisibility(fade, type) {

            if (this.$) {
                this.$.stop()[fade](type);
            }
        },

        /**
         * Get wireframe jQuery element
         * @returns {*}
         */
        getWireFrame: function getWireFrame() {

            return $(
                this.selector,
                this.widget.controller.get$page()
            );
        },

        /**
         * Move wireframe to current page
         */
        moveToCurrentPage: function moveToCurrentPage() {

            if (this.getWireFrame().length === 0) {
                this.$.appendTo(this.widget.controller.get$page());
            }
        },

        /**
         * Define wireframe jQuery element
         * @param {{style}} opts
         * @returns {*}
         */
        defineHolder: function defineHolder(opts) {

            /**
             * Define wireframe element
             * @type {*}
             */
            this.$ = this.getWireFrame();

            if (this.$.length === 0) {
                $('#next-widget-position').remove();
                this.$ = $('<div />').css(opts.style).attr({
                    id: 'next-widget-position'
                });
            }

            this.moveToCurrentPage();

            return this;
        },

        /**
         * Init wireframe
         * @param opts
         */
        init: function init(opts) {

            opts = this.base.define(opts, {}, true);

            this.defineHolder(opts).show();
            this.$.css(opts.style);
        }

    }, AntHill.prototype);
});