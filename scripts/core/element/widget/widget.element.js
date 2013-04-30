/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/element'
], function defineWidget(Base, BaseElement) {

    /**
     * Define widget element
     * @param {{}} view
     * @param {$container} opts
     * @returns {*}
     * @constructor
     */
    var Widget = function Widget(view, opts) {

        return this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });
    };

    return Widget.extend({
        /**
         * Set widget position
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
         * @param {Number} layer
         * @private
         */
        _downgradeLayer: function _downgradeLayer(layer) {
            this.$.css({
                zIndex: layer
            });
        },
        /**
         * Get item content
         * @returns {*}
         */
        getContent: function getContent() {
            return this.$.find('.content');
        }


    }, Base, BaseElement.prototype);
});