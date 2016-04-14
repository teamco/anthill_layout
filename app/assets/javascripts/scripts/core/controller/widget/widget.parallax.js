define(function defineWidgetParallax() {

    /**
     * Define WidgetParallax
     * @class WidgetParallax
     * @constructor
     * @extends BaseController
     */
    var WidgetParallax = function WidgetParallax() {
    };

    return WidgetParallax.extend('WidgetParallax', {

        /**
         * Subscribe to scroll
         * @memberOf WidgetParallax
         * @param {number} speed
         */
        scrollSpeedParallaxBehavior: function scrollSpeedParallaxBehavior(speed) {

            this.logger.debug('Set scroll speed parallax', speed);

            /**
             * Get root
             * @type {Application}
             */
            var root = this.controller.root();

            /**
             * Get root element
             * @type {ApplicationElement}
             */
            var $rootElement = root.view.get$item();

            // Init scroll top
            var lastScrollTop = 0;

            root.eventmanager.subscribe({
                event: {
                    eventName: root.eventmanager.eventList.scrollPublisher,
                    scope: this
                },
                callback: function _scrollWidgetCallback(event) {

                    // Get scroll top
                    var scrollTop = $rootElement.$[0].scrollTop,
                        direction = (scrollTop > lastScrollTop) ?
                            'down' : 'up';

                    lastScrollTop = scrollTop;

                    this.logger.debug('Scroll speed parallax callback', event);
                    this.controller.scrollParallax(
                        event,
                        parseInt(speed, 10),
                        scrollTop,
                        this.view.get$item().$.position().top,
                        direction
                    );
                }
            }, true);
        },

        /**
         * Scroll parallax callback
         * @memberOf WidgetParallax
         * @param {Event} event
         * @param {number} speed
         * @param {number} scrollTop
         * @param {number} fgOffset
         * @param {string} direction
         */
        scrollParallax: function scrollParallax(event, speed, scrollTop, fgOffset, direction) {

            var $element = this.getView().get$item();

            if (!speed) {
                return false;
            }
            var multiply = direction === 'up' ? 1 : -1;

            var yPos = fgOffset;// + multiply * (scrollTop / 40);

            console.log('d:' + direction, 'o:' + fgOffset, 't:' + scrollTop)

            $element.$.css('top', yPos);
        }
    });
});