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

        /**
         * Define overlapped css class
         * @member WidgetElement
         * @type {string}
         */
        this.overlapped = 'overlapped';

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
        },

        /**
         * Update layer of a widgets
         * @member WidgetElement
         * @param {number} layer
         */
        updateElementLayer: function updateElementLayer(layer) {
            this.$.css({
                zIndex: layer
            });
        },

        /**
         * Check if widget on top
         * @member WidgetElement
         * @returns {boolean}
         */
        isOnTop: function isOnTop() {
            return this.$.hasClass('ontop');
        },

        /**
         * Select overlapped widgets
         * @member WidgetElement
         * @param {boolean} select
         */
        selectWidget: function selectWidget(select) {

            if (select) {

                this.$.addClass(this.overlapped);

            } else {

                if (this.$.hasClass(this.overlapped)) {

                    this.$.removeClass(this.overlapped);
                }
            }
        }

    }, BaseElement.prototype);
});