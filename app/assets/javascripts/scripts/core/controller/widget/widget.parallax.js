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

            /**
             * Get $page
             * @type {PageElement}
             */
            var $page = this.controller.get$page();

            // Init vars
            var lastScrollTop = 0,
                viewPortHeight = $page.getHeight(),
                $element = this.controller.getView().get$item(),
                elementHeight = $element.getHeight;

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
                    this.controller.scrollParallax({
                        $element: $element,
                        elementHeight: elementHeight,
                        event: event,
                        speed: parseFloat(speed),
                        direction: direction,
                        scrollTop: scrollTop,
                        offsetTop: $element.$.position().top,
                        viewPortHeight: viewPortHeight
                    });
                }
            }, true);
        },

        /**
         * Scroll parallax callback
         * @memberOf WidgetParallax
         * @param {{
         *      $element: WidgetElement,
         *      elementHeight,
         *      event: Event,
         *      speed: number,
         *      direction: string,
         *      scrollTop: number,
         *      offsetTop: number,
         *      viewPortHeight
         * }} opts
         */
        scrollParallax: function scrollParallax(opts) {
            this.translateY(opts.$element, opts.scrollTop * opts.speed);
        },

        /**
         * Translate Y
         * @memberOf WidgetParallax
         * @param $element
         * @param y
         */
        translateY: function translateY($element, y) {
            var translateY = 'translateY(' + y + 'px)';
            $element.$.css({
                transform: translateY,
                msTransform: translateY,
                webkitTransform: translateY
            })
        }
    });
});