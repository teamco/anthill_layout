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
], function defineWorkspaceContainer(Base, BaseElement) {

    /**
     * Debugger element constructor
     * @param {*} view
     * @param {{style, [events], [id]}} opts
     * @returns {*}
     * @constructor Debugger
     */
    var Debugger = function Debugger(view, opts) {
        return this.config(view, opts).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return Debugger.extend({
        /**
         * DOM config
         * @param {*} view
         * @param {{style, [events], [id]}} opts
         * @returns {*}
         */
        config: function config(view, opts) {
            this.view = view;
            this.style = opts.style;
            this.events = opts.events;
            this.id = this.renderUUID(opts.id);
            this.$ = $('<div />').attr({
                id: opts.id
            }).addClass(this.style).
                append(
                    $('<div />')
                );

            return this;
        },
        /**
         * Activate debugger
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

    }, Base, BaseElement.prototype);
});