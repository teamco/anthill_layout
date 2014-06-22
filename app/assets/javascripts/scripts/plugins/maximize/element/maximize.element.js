/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineMaximizeElement(BaseElement) {

    /**
     * Define Maximize Element
     * @param view
     * @param opts
     * @returns {MaximizeElement}
     * @constructor
     * @class MaximizeElement
     * @extends BaseElement
     */
    var MaximizeElement = function MaximizeElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.addCSS('maximize');
        this.addCSS('preferences');

        return this;
    };

    return MaximizeElement.extend('MaximizeElement', {

        /**
         * Get footer html
         * @member MaximizeElement
         * @returns {*|jQuery}
         */
        getFooter: function getFooter() {
            return $('<div />').text([
                this.base.lib.hash.hashLength(
                    this.view.scope.controller.getData()
                ),
                'items'
            ].join(' '));
        },

        /**
         * Enlarge widget
         * @member MaximizeContentElement
         * @param {Widget} widget
         */
        enlarge: function enlarge(widget) {

            /**
             * Define scope
             * @type {Maximize}
             */
            var scope = this.view.scope;

            widget.view.get$item().$.stop().animate({

                width: '100%',
                height: '100%',
                left: 0,
                top: 0

            }, 500, function afterEnlarge(){

                scope.observer.publish(
                    scope.eventmanager.eventList.afterMaximize,
                    widget
                );

            }.bind(scope)).addClass(
                scope.constructor.name.toLowerCase()
            );
        },

        /**
         * Reduce widget
         * @member MaximizeContentElement
         * @param {Widget} widget
         */
        reduce: function reduce(widget) {

            /**
             * Define scope
             * @type {Maximize}
             */
            var scope = this.view.scope,
                dom = widget.dom;

            widget.view.get$item().$.stop().animate({

                width: dom.width,
                height: dom.height,
                left: dom.left,
                top: dom.top

            }, 500, function afterReduce(){

                scope.observer.publish(
                    scope.eventmanager.eventList.afterReduce,
                    widget
                );

            }.bind(scope)).removeClass(
                scope.constructor.name.toLowerCase()
            );
        }

    }, BaseElement.prototype);

});