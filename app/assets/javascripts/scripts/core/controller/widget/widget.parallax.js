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
         * @param {string} speed
         */
        scrollSpeedParallaxBehavior: function scrollSpeedParallaxBehavior(speed) {

            /**
             * Get prefs
             * @type {{allowParallax: boolean, orientation: string, reactionTo: string}}
             */
            var prefs = this.model.getConfig('preferences');

            if (!prefs.allowParallax) {
                this.logger.debug('Parallax does not allowed', speed);
                return false;
            }

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
                elementHeight = $element.getHeight,
                eventName = root.eventmanager.eventList.scrollPublisher;

            // Remove before subscribe
            this.eventmanager.removeListener({
                scope: root,
                eventName: eventName,
                eventUUID: this.eventmanager.unSubscribe[eventName]
            });

            /**
             * Fetch event uuid
             * @type {String}
             */
            var eventUUID = root.eventmanager.subscribe({
                event: {
                    eventName: eventName,
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
                        orientation: prefs.orientation,
                        speed: speed.split(','),
                        direction: direction,
                        reactionTo: prefs.reactionTo,
                        scrollTop: scrollTop,
                        offsetTop: $element.$.position().top,
                        viewPortHeight: viewPortHeight
                    });
                }
            }, true);

            // Store event
            this.eventmanager.unSubscribe[eventName] = eventUUID;
        },

        /**
         * Scroll parallax callback
         * @memberOf WidgetParallax
         * @param {{
         *      $element: WidgetElement,
         *      elementHeight,
         *      event: Event,
         *      speed: [],
         *      orientation: string,
         *      reactionTo: string,
         *      direction: string,
         *      scrollTop: number,
         *      offsetTop: number,
         *      viewPortHeight
         * }} opts
         */
        scrollParallax: function scrollParallax(opts) {

            // Get scroll orientation
            var orientation = 'Y';

            if (opts.orientation === 'Horizontal') orientation = 'X';

            // Get speed Y
            var speedX = parseFloat(opts.speed[0]);

            if (opts.reactionTo === 'Scroll') {

                if (opts.orientation === 'Both') {

                    var speedY = opts.speed[1] ? parseFloat(opts.speed[1]) : speedX;
                    opts.$element.translateXY(
                        opts.scrollTop * speedX,
                        opts.scrollTop * speedY,
                        opts.scrollTop
                    );

                    return false;
                }

                opts.$element['translate' + orientation](opts.scrollTop * speedX, opts.scrollTop);
            }

            if (opts.reactionTo === 'Mouse move') {
                // TODO
            }
        }
    });
});