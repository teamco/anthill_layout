/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/24/13
 * Time: 12:24 AM
 */

define([
    'modules/base'
], function defineWidgetWireframe(Base) {

    /**
     * Define Widget Wireframe
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
    };

    return Wireframe.extend({
        /**
         * Move wireframe on widget drag
         */
        dragSticker: function dragSticker() {
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
            return this.widget.controller.get$page().find('#next-widget-position');
        },
        /**
         * Define wireframe jQuery element
         * @param {{style}} opts
         * @returns {*}
         */
        defineHolder: function defineHolder(opts) {
            this.$ = this.getWireFrame();
            if (this.$.length === 0) {
                $('#next-widget-position').remove();
                this.$ = $('<div />').css(opts.style).attr({
                    id: 'next-widget-position'
                }).appendTo(this.widget.controller.get$page());
            }
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
    }, Base);
});