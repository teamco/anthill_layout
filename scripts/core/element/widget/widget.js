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
     * @param {{}} opts
     * @returns {*}
     * @constructor
     */
    var Widget = function Widget(view, opts) {

        return this.config(view, opts).build({
            $container: opts.$container,
            destroy: false
        });
    };

    return Widget.extend({
        /**
         * Config widget element
         * @param {{}} view
         * @param {{style: String, id: String}} opts
         * @returns {*}
         */
        config: function config(view, opts) {
            this.view = view;
            this.style = opts.style;
            this.id = this.renderUUID(opts.id);
            this.$ = $('<li />').attr({
                id: opts.id
            }).addClass(this.style);

            return this;
        },
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

        }

    }, Base, BaseElement.prototype);
});