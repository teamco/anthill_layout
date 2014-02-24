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

        var url = this.pluginPath + '/panel/panel.css',
            uuid = this.$.attr('id') + '-css';

        this.addCSS(url, uuid);

        return this;
    };

    return PanelElement.extend({

        /**
         * Toggle open/close
         * @param opened
         * @returns {boolean}
         */
        toggle: function toggle(opened) {

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
                [opened, 0]
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

            controller.setBehavior(opened);
        }

    }, BaseElement.prototype);

});