/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/24/13
 * Time: 12:24 AM
 */

define([
    'jquery',
    'modules/base'
], function defineWidgetWireframe($, Base) {

    /**
     * Define Widget Wireframe
     * @param {*} widget
     * @constructor
     */
    var Wireframe = function Wireframe(widget) {
        this.widget = widget;
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
         *
         */
        show: function show() {
            if (this.$) {
                this.$.fadeIn(
                    0,
                    function showCallback() {
                        // Animation complete.
                        this.$.show();
                    }.bind(this)
                );
                this.$.addClass('visible');
            }
        },

        /**
         *
         */
        hide: function hide() {
            if (this.$) {
                this.$.fadeOut(
                    this.widget.page.layout.config.html.dragSpeed,
                    function fadeOut() {
                        // Animation complete.
                    }.bind(this)
                );
                this.$.removeClass('visible');
            }
        },

        /**
         *
         * @return {*}
         */
        isVisible: function isVisible() {
            return this.$.is(':visible');
        },

        /**
         *
         * @param opts
         */
        delayedJob: function delayedJob(opts) {
            opts = App.base.define(opts, {});
            this.hideDots = true;
            var params = {
                callback: opts.callback,
                widget: this.widget,
                funcName: opts.funcName,
                cancel: opts.cancel || false
            };
            App.callbacks.run(params);
            this.widget.html.checkWidgetsSizeOnBrowserResize();
        },

        /**
         *
         * @return {*}
         */
        getWireFrame: function getWireFrame() {
            return this.widget.controller.get$page().find('#next-widget-position');
        },
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
        init: function init(opts) {
            opts = this.base.define(opts, {}, true);
            this.defineHolder(opts).show();
//            var speed = !!opts.animate ?
//                this.widget.page.layout.config.eventSpeed :
//                this.widget.page.layout.config.html.dragSpeed;
//            if (!!opts.animate) {
//                this.$.stop().animate(
//                    opts.style,
//                    speed,
//                    function initAnimate() {
//                        TODO animate callback
//                    }
//                );
//            } else {
            this.$.css(opts.style);
//            }
        }
    }, Base);
});