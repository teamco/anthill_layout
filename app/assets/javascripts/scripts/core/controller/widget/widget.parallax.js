defineP(function defineWidgetParallax() {

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
       * @type {{allowParallax: boolean, orientation: string, reactionTo:
       *     string, moveRange: string}}
       */
      var prefs = this.model.getConfig('preferences');

      /**
       * Get root
       * @type {module.Application}
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
          eventName = root.eventManager.eventList.scrollPublisher;

      // Detach event
      this.eventManager.detachEventUnSubscribe(root, eventName);

      if (!prefs.allowParallax) {
        this.logger.debug('Parallax does not allowed', speed);
        this.view.get$item().animateParallax(false);
        return false;
      }

      this.logger.debug('Set scroll speed parallax', speed);
      this.view.get$item().animateParallax(true);

      /**
       * Fetch event uuid
       * @type {string}
       */
      var eventUUID = root.eventManager.subscribe({
        event: {
          name: eventName,
          scope: this
        },
        callback: function _scrollWidgetCallback(event) {

          event.preventDefault();

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
            moveRange: prefs.moveRange,
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
      this.eventManager.defineEventUnSubscribe(eventName, eventUUID);
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
         *      moveRange: string,
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

        if (opts.moveRange) {

          var range = opts.moveRange.split(','),
              minR = parseFloat(range[0]),
              maxR = parseFloat(range[1]),
              behavior = 'left';

          if (orientation === 'Y') {
            behavior = 'top';
          }

          var dom = opts.$element.view.scope.dom[behavior],
              position = opts.$element.$.position()[behavior],
              opacity = 1;

          if (dom + maxR < position || dom - minR > position) {
            opacity = 0;
          }

          opts.$element.$.stop().animate({opacity: opacity}, 100);
        }

        if (opts.orientation === 'Both') {

          var speedY = opts.speed[1] ? parseFloat(opts.speed[1]) : speedX;
          opts.$element.translateXY(
              opts.scrollTop * speedX,
              opts.scrollTop * speedY,
              opts.scrollTop
          );

          return false;
        }

        opts.$element['translate' + orientation](opts.scrollTop * speedX,
            opts.scrollTop);
      }

      if (opts.reactionTo === 'Mouse move') {
        // TODO
      }

    }
  });
});