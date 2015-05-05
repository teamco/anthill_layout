/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function defineWorkspaceContent(BaseElement) {

    /**
     * Define Workspace Content
     * @param {WorkspaceView} view
     * @param opts
     * @returns {*}
     * @constructor
     * @class WorkspaceContentElement
     * @extends BaseElement
     */
    var WorkspaceContentElement = function WorkspaceContentElement(view, opts) {
        return this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return WorkspaceContentElement.extend('WorkspaceContentElement', {

        /**
         * Define height after add page
         * @memberOf WorkspaceContentElement
         */
        defineHeight: function defineHeight() {

            var header = this.view.elements.$header,
                footer = this.view.elements.$footer,
                $container = this.getRootContainer();

            var headerHeight = header.$ ? header.$.height() : 0,
                footerHeight = footer.$ ? footer.$.height() : 0,
                containerHeight = $container.height();

            this.setHeight(containerHeight - (headerHeight + footerHeight));
        },

        /**
         * Define width after add page
         * @memberOf WorkspaceContentElement
         * @param {number} to
         */
        defineWidth: function defineWidth(to) {

            this.$.css({
                width: (100 * to) + '%'
            });
        },

        /**
         * Define pages width after add page
         * @memberOf WorkspaceContentElement
         * @param {*} items
         * @param {number} counter
         */
        adoptPagesWidth: function adoptPagesWidth(items, counter) {

            var index, $item;

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    /**
                     * Define page
                     * @type {Page}
                     */
                    $item = items[index].view.get$item();

                    $item.setWidth((100 / counter) + '%');
                }
            }
        },

        /**
         * Swipe container to current page
         * @memberOf WorkspaceContentElement
         * @param {Page} page
         */
        swipeTo: function swipeTo(page) {

            /**
             * Define view
             * @type {Workspace}
             */
            var scope = this.view.scope,
                animate = page.model.getConfig('preferences').animateSwipe,
                duration = 500;

            /**
             * Define on complete callback
             * @private
             */
            function _completeCallback() {

                scope.observer.publish(
                    scope.eventManager.eventList.afterSwitchToPage,
                    page
                );
            }

            /**
             * Get $pages
             * @type {WorkspaceContentElement}
             */
            var $pages = this.view.elements.$pages;

            /**
             * Get pages order
             * @type {number}
             */
            var order = page.model.getConfig('order') - 1,
                css = {left: (-order * 100) + '%'};

            if (typeof(animate) === 'undefined' ?
                    scope.model.getConfig('page').animateSwipe : !!animate) {

                $pages.$.stop().animate(css, {
                    duration: duration,
                    complete: _completeCallback
                });

            } else {

                $pages.$.css(css);
                _completeCallback();
            }
        }

    }, BaseElement.prototype);
});