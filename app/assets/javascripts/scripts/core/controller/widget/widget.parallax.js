/**
 * @class WidgetParallax
 * @type {module.WidgetParallax}
 */
module.exports = class WidgetParallax {

  /**
   * Subscribe to scroll
   * @memberOf WidgetParallax
   * @param {string} speed
   */
  scrollSpeedParallaxBehavior(speed) {

    /**
     * Get prefs
     * @type {{allowParallax: boolean, orientation: string, reactionTo: string, moveRange: string}}
     */
    const prefs = this.model.getConfig('preferences');

    /**
     * Get root
     * @type {module.Application}
     */
    const root = this.controller.root();

    /**
     * Get root element
     * @type {ApplicationElement}
     */
    const $rootElement = root.view.get$item();

    /**
     * Get $page
     * @type {PageElement}
     */
    const $page = this.controller.get$page();

    let lastScrollTop = 0;
    const viewPortHeight = $page.getHeight(),
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
    const eventUUID = root.eventManager.subscribe({
      event: {
        name: eventName,
        scope: this
      },
      callback(event) {
        event.preventDefault();

        // Get scroll top
        const scrollTop = $rootElement.$[0].scrollTop,
            direction = (scrollTop > lastScrollTop) ? 'down' : 'up';

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
  }

  /**
   * Scroll parallax callback
   * @memberOf WidgetParallax
   * @param {{
   *  $element: WidgetElement,
   *  elementHeight,
   *  event: Event,
   *  speed: [],
   *  orientation: string,
   *  moveRange: string,
   *  reactionTo: string,
   *  direction: string,
   *  scrollTop: number,
   *  offsetTop: number,
   *  viewPortHeight
   * }} opts
   */
  scrollParallax(opts) {

    // Get scroll orientation
    let orientation = 'Y',
        behavior = 'left',
        opacity = 1;

    if (opts.orientation === 'Horizontal') orientation = 'X';

    // Get speed Y
    const speedX = parseFloat(opts.speed[0]);

    if (opts.reactionTo === 'Scroll') {
      if (opts.moveRange) {

        const range = opts.moveRange.split(','),
            minR = parseFloat(range[0]),
            maxR = parseFloat(range[1]);

        if (orientation === 'Y') {
          behavior = 'top';
        }

        const dom = opts.$element.view.scope.dom[behavior],
            position = opts.$element.$.position()[behavior];

        if (dom + maxR < position || dom - minR > position) {
          opacity = 0;
        }
        opts.$element.$.stop().animate({opacity: opacity}, 100);
      }

      if (opts.orientation === 'Both') {
        const speedY = opts.speed[1] ? parseFloat(opts.speed[1]) : speedX;
        opts.$element.translateXY(opts.scrollTop * speedX, opts.scrollTop * speedY, opts.scrollTop);
        return false;
      }

      opts.$element['translate' + orientation](opts.scrollTop * speedX, opts.scrollTop);
    }

    if (opts.reactionTo === 'Mouse move') {
      // TODO
    }
  }
};
