/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/element'
], function defineWidgetElement(BaseElement) {

    /**
     * Define widget element
     * @param {{}} view
     * @param {{$container}} opts
     * @returns {*}
     * @constructor
     * @class WidgetElement
     * @extends BaseElement
     */
    var WidgetElement = function WidgetElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        return this;
    };

    return WidgetElement.extend('WidgetElement', {

        /**
         * Set widget position
         * @member WidgetElement
         * @param {{animate: Boolean, callback: Function}} opts
         * @private
         */
        _setPosition: function _setPosition(opts) {
            var widget = this.view.scope,
                dom = widget.dom,
                position = widget.map.positionFor(
                    dom.column,
                    dom.row
                );

            this.$.stop().animate({
                    top: position.top,
                    left: position.left
                },
                !!opts.animate ? 500 : 0,
                opts.callback
            );
        },

        /**
         * Downgrade widget layer
         * @member WidgetElement
         * @param {Number} layer
         * @private
         */
        _downgradeLayer: function _downgradeLayer(layer) {
            this.$.css({
                zIndex: layer
            });
        },

        /**
         * Fix border issue on resize
         * @member WidgetElement
         * @param {boolean} resize
         */
        fixOnResize: function fixOnResize(resize) {

            resize ? this.$.addClass('on-resize') :
                this.$.removeClass('on-resize');
        },

        /**
         * Bind fix on resize (jumping height on resize up)
         * @member WidgetElement
         */
        bindFixOnResize: function bindFixOnResize() {

            /**
             * Fix on resize
             * @private
             */
            function _fixOnResize() {
                this.fixOnResize(true);
            }

            $('.ui-resizable-handle', this.$).on('mousedown', _fixOnResize.bind(this));
        },

        /**
         * Get item content
         * @member WidgetElement
         * @returns {*}
         */
        getContent: function getContent() {
            return $('.content', this.$);
        },

        /**
         * Clear thumbnail bg
         * @member WidgetElement
         */
        clearBackground: function clearBackground() {
            this.$.addClass('no-bg');
        },

        /**
         * Move on top layer
         * @member WidgetElement
         * @param {boolean} ontop
         */
        moveOnTopLayer: function moveOnTopLayer(ontop) {
            ontop ? this.$.addClass('ontop') :
                this.$.removeClass('ontop');
        }

    }, BaseElement.prototype);
});