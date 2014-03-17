/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePanelContainerElement(BaseElement) {

    /**
     * Define Panel Container Element
     * @param view
     * @param opts
     * @returns {PanelContainerElement}
     * @constructor
     * @class PanelContainerElement
     * @extends BaseElement
     */
    var PanelContainerElement = function PanelContainerElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this.bindResize();
    };

    return PanelContainerElement.extend('PanelContainerElement', {

        /**
         * Toggle open class
         * @param {Boolean} open
         * @memberOf PanelContainerElement
         */
        opened: function opened(open) {
            open ?
                this.$.addClass('close') :
                this.$.removeClass('close');
        },

        /**
         * Bind resize
         * @memberOf PanelContainerElement
         */
        bindResize: function bindResize() {

            var controller = this.view.controller,
                resizeFrom = controller.isResizable();

            if (!resizeFrom) {
                return false;
            }

            /**
             * Define handle
             * @type {string}
             */
            var handle = resizeFrom === 'top' ?
                's' : resizeFrom === 'right' ?
                'w' : resizeFrom === 'bottom' ?
                'n' : 'e';

            /**
             * Set max width
             * @type {number}
             */
            var maxWidth = 290;

            this.$.resizable({
                handles: handle,
                containment: 'parent',
                maxWidth: maxWidth,
                minWidth: 130,
                start: function start(event, ui) {

                    /**
                     * Set width
                     * @type {number}
                     */
                    var width = ui.element.hasClass('close') ?
                        maxWidth : ui.size.width;

                    ui.element.resizable('option', 'maxWidth', width);
                }
            });

            return this;
        }

    }, BaseElement.prototype);

});