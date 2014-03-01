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
     */
    var PanelElement = function PanelElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        /**
         * Define max width
         * @type {*|number}
         */
        this.maxWidth = opts.maxWidth || 100;

        /**
         * Define min width
         * @type {*|number}
         */
        this.minWidth = opts.minWidth || 0;

        this.addCSS('panel');

        return this;
    };

    return PanelElement.extend({

        /**
         * Toggle open/close
         * @param {string} path
         * @param {boolean} opened
         * @returns {boolean}
         */
        toggle: function toggle(path, opened) {

            /**
             * Define locals
             */
            var view = this.view,
                scope = view.scope,
                controller = view.controller;

            if (controller.isOpened() === opened) {

                scope.logger.debug('No change');
                return false;
            }

            var $container = view.elements.$container;

            $container.opened(opened);

            scope.observer.publish(
                scope.eventmanager.eventList.showContent,
                [opened, path]
            );

            $container.$.stop().animate({
                width: opened ?
                    this.maxWidth :
                    this.minWidth
            }, 200, function callbackToggle() {
                if (!opened) {
                    $container.$.attr('style', '');
                }
            });

            controller.setBehavior(path, opened);
        }

    }, BaseElement.prototype);

});