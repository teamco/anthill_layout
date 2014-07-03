/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function defineWidgetElement(BaseElement) {

    /**
     * Define widget element
     * @param {{}} view
     * @param {{$container}} opts
     * @returns {*}
     * @constructor
     * @class WidgetElement
     * @extends BaseElement
     */
    var WidgetElement = function WidgetElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        /**
         * Define overlapped css class
         * @member WidgetElement
         * @type {string}
         */
        this.overlapped = 'overlapped';

        /**
         * Define show content class
         * @member WidgetElement
         * @type {string}
         */
        this.content = 'disable-interactions';

        /**
         * Define maximize class
         * @member WidgetElement
         * @type {string}
         */
        this.maximize = 'maximize';

        this.bindHoverInteractions();

        return this;
    };

    return WidgetElement.extend('WidgetElement', {

        /**
         * Bind interactions on hover
         * @member WidgetElement
         */
        bindHoverInteractions: function bindHoverInteractions() {

            /**
             * Define scope
             * @type {BaseElement}
             */
            var $widget = this.$;

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.view.scope;

            this._bindDisableInteractions(scope, $widget, this.content);
            this._bindEnableInteractions(scope, $widget, this.content);
        },

        /**
         * Bind disable interactions
         * @member WidgetElement
         * @private
         * @param {Widget} scope
         * @param {BaseElement} $widget
         * @param {string} content
         */
        _bindDisableInteractions: function _bindDisableInteractions(scope, $widget, content) {

            $widget.on('mouseenter.widget', function mouseEnter() {

                $widget.on('dblclick.widget', function dblClick() {

                    $widget.addClass(content);

                    scope.observer.publish(
                        scope.eventmanager.eventList.disableDraggable
                    );
                });
            });
        },

        /**
         * Bind enable interactions
         * @member WidgetElement
         * @private
         * @param {Widget} scope
         * @param {BaseElement} $widget
         * @param {string} content
         */
        _bindEnableInteractions: function _bindEnableInteractions(scope, $widget, content) {

            $widget.on('mouseleave.widget', function mouseLeave() {

                if ($widget.hasClass(content)) {

                    $widget.removeClass(content);
                    $widget.off('dblclick.widget');

                    scope.observer.publish(
                        scope.eventmanager.eventList.enableDraggable
                    );
                }
            });
        },

        /**
         * Set widget position
         * @member WidgetElement
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
         * Get item content
         * @member WidgetElement
         * @returns {*}
         */
        getContent: function getContent() {
            return $('.content', this.$);
        },

        /**
         * Clear thumbnail bg
         * @member WidgetElement
         */
        clearBackground: function clearBackground() {
            this.$.addClass('no-bg');
        },

        /**
         * Move on top layer
         * @member WidgetElement
         * @param {boolean} ontop
         */
        moveOnTopLayer: function moveOnTopLayer(ontop) {
            ontop ? this.$.addClass('ontop') :
                this.$.removeClass('ontop');
        },

        /**
         * Update layer of a widgets
         * @member WidgetElement
         * @param {number} layer
         */
        updateElementLayer: function updateElementLayer(layer) {
            this.$.css({
                zIndex: layer
            });
        },

        /**
         * Check if widget on top
         * @member WidgetElement
         * @returns {boolean}
         */
        isOnTop: function isOnTop() {
            return this.$.hasClass('ontop');
        },

        /**
         * Select overlapped widgets
         * @member WidgetElement
         * @param {boolean} select
         */
        selectWidget: function selectWidget(select) {

            if (select) {

                this.$.addClass(this.overlapped);

            } else {

                if (this.$.hasClass(this.overlapped)) {

                    this.$.removeClass(this.overlapped);
                }
            }
        },

        /**
         * Enlarge widget
         * @member WidgetElement
         */
        enlarge: function enlarge() {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.view.scope;

            this.$.stop().animate({

                width: '100%',
                height: '100%',
                left: 0,
                top: 0

            }, 500, function afterEnlarge() {

                scope.observer.publish(
                    scope.eventmanager.eventList.afterMaximize
                );

            }.bind(scope)).addClass(this.maximize);
        },

        /**
         * Reduce widget
         * @member WidgetElement
         */
        reduce: function reduce() {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.view.scope,
                dom = scope.dom;

            this.$.stop().animate({

                width: dom.width,
                height: dom.height,
                left: dom.left,
                top: dom.top

            }, 500, function afterReduce() {

                scope.observer.publish(
                    scope.eventmanager.eventList.afterReduce
                );

            }.bind(scope)).removeClass(this.maximize);
        },

        /**
         * Stretch element width
         * @member WidgetElement
         * @param {Page} page
         */
        stretchWidth: function stretchWidth(page) {

            this.$.css({

                left: 0,
                width: page.view.get$item().getWidth()

            });
        },

        /**
         * Restore original width
         * @member WidgetElement
         */
        restoreWidth: function restoreWidth() {

            var scope = this.view.scope;

            this.$.css({

                left: scope.dom.left,
                width: scope.dom.width

            });
        },

        /**
         * Stretch element height
         * @member WidgetElement
         * @param {Page} page
         */
        stretchHeight: function stretchHeight(page) {

            this.$.css({
                top: 0,
                height: page.view.get$item().getHeight()
            });
        },

        /**
         * Restore original height
         * @member WidgetElement
         */
        restoreHeight: function restoreHeight() {

            var scope = this.view.scope;

            this.$.css({

                top: scope.dom.top,
                height: scope.dom.height

            });
        }

    }, BaseElement.prototype);
});