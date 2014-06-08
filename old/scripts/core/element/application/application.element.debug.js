/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/element'
], function defineWorkspaceContainer(BaseElement) {

    /**
     * Debugger element constructor
     * @param {*} view
     * @param {{style, [events], [id]}} opts
     * @returns {*}
     * @constructor DebuggerElement
     * @extends BaseElement
     * @class DebuggerElement
     */
    var DebuggerElement = function DebuggerElement(view, opts) {

        if (!view.scope.permission.getCapability('activateDebugger')) {
            return false;
        }

        /**
         * Define config
         * @type {element._config}
         */
        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this._extend$();

    };

    return DebuggerElement.extend('DebuggerElement', {

        /**
         * DOM config
         * @member DebuggerElement
         * @returns {*}
         */
        _extend$: function _extend$() {
            this.$.css({
                opacity: this.opacity
            }).append(
                $('<div />')
            );

            this.bindHover();

            return this;
        },

        /**
         * Hover debugger
         * @member DebuggerElement
         */
        bindHover: function bindHover() {
            var opacity = this.opacity;
            this.$.hover(
                function on() {
                    $(this).css({
                        opacity: 0.9
                    });
                },
                function off() {
                    $(this).css({
                        opacity: opacity
                    });
                }
            );
        },

        /**
         * Activate debugger
         * @member DebuggerElement
         */
        activate: function activate() {
            var scope = this.view.scope,
                $element = this.$;
            $element.unbind('click.deactivateDebugger');
            scope.eventmanager.onEvent.bind({
                scope: scope,
                $: $element
            })('activateDebugger', 'click');
            $element.removeClass('activated');
        },

        /**
         * Deactivate debugger
         * @member DebuggerElement
         */
        deactivate: function deactivate() {
            var scope = this.view.scope,
                $element = this.$;
            $element.unbind('click.activateDebugger');
            scope.eventmanager.onEvent.bind({
                scope: scope,
                $: $element
            })('deactivateDebugger', 'click');
            $element.addClass('activated');
        }

    }, BaseElement.prototype);
});