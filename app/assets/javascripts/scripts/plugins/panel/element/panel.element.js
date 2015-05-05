/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
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
         * @memberOf PanelElement
         * @type {*|number}
         */
        this.maxWidth = opts.maxWidth || 100;

        /**
         * Define min width
         * @memberOf PanelElement
         * @type {*|number}
         */
        this.minWidth = opts.minWidth || 0;

        this.addCSS('panel');

        return this;
    };

    return PanelElement.extend('PanelElement', {

        /**
         * Toggle open/close
         * @param {string} resource
         * @param {boolean} opened
         * @memberOf PanelElement
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
                scope.eventManager.eventList.showContent,
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
         * @memberOf PanelElement
         */
        hideActiveModule: function hideActiveModule() {
            this.view.elements.items[this.getContentItemIndex()].hide();
        },

        /**
         * Show Active module
         * @memberOf PanelElement
         */
        showActiveModule: function showActiveModule() {
            this.view.elements.items[this.getContentItemIndex()].show();
        },

        /**
         * Get item index
         * @memberOf PanelElement
         * @returns {string}
         */
        getContentItemIndex: function getContentItemIndex() {
            return ['$', this.view.scope.active, '-content'].join('');
        }

    }, BaseElement.prototype);

});