/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePanelElement(BaseElement) {

    /**
     * Define Panel Element
     * @param view
     * @param opts
     * @returns {PanelElement}
     * @constructor
     * @class PanelElement
     * @extends BaseElement
     */
    var PanelElement = function PanelElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        /**
         * Define max width
         * @member PanelElement
         * @type {*|number}
         */
        this.maxWidth = opts.maxWidth || 100;

        /**
         * Define min width
         * @member PanelElement
         * @type {*|number}
         */
        this.minWidth = opts.minWidth || 0;

        this.addCSS('panel');

        return this;
    };

    return PanelElement.extend({

        /**
         * Toggle open/close
         * @param {string} resource
         * @param {boolean} opened
         * @member PanelElement
         * @returns {boolean}
         */
        toggle: function toggle(resource, opened) {

            /**
             * Toggle callback
             * @private
             */
            function _callbackToggle() {
                if (!opened) {
                    $container.$.attr('style', '');
                }
            }

            /**
             * Define locals
             */
            var view = this.view,
                scope = view.scope,
                controller = view.controller;

            if (controller.isOpened() === opened && scope.active === resource) {

                scope.logger.debug('No change');
                return false;
            }

            var $container = view.elements.$container;

            $container.opened(opened);

            scope.observer.publish(
                scope.eventmanager.eventList.showContent,
                [opened, resource]
            );

            $container.$.stop().animate({
                width: opened ?
                    this.maxWidth :
                    this.minWidth
            }, 200, _callbackToggle);

            controller.setBehavior(resource, opened);
        },

        /**
         * Hide Active module
         * @member PanelElement
         */
        hideActiveModule: function hideActiveModule() {
            this.view.elements.items[this.getContentItemIndex()].hide();
        },

        /**
         * Show Active module
         * @member PanelElement
         */
        showActiveModule: function showActiveModule() {
            this.view.elements.items[this.getContentItemIndex()].show();
        },

        /**
         * Get item index
         * @member PanelElement
         * @returns {string}
         */
        getContentItemIndex: function getContentItemIndex() {
            return ['$', this.view.scope.active, '-content'].join('');
        }

    }, BaseElement.prototype);

});