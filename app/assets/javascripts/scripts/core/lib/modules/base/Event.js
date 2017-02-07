/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
define(function defineLibEvent() {

  /**
   * Define LibEvent
   * @class LibEvent
   * @constructor
   */
  var LibEvent = function LibEvent() {
  };

  LibEvent.extend('LibEvent', {

    /**
     * Define possible events
     * @memberOf LibEvent
     */
    eventMatchers: {
      'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
      'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
    },

    /**
     * Define default opts
     * @memberOf LibEvent
     */
    defaultOptions: {
      pointerX: 0,
      pointerY: 0,
      button: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      bubbles: true,
      cancelable: true
    },

    /**
     * Simulate Event
     * @memberOf LibEvent
     * @param element
     * @param eventName
     * @returns {*}
     * @example simulate(document.getElementById("btn"), "click");
     * @example simulate(document.getElementById("btn"), "click", { pointerX:
     *     123, pointerY: 321 })
     */
    simulate: function simulate(element, eventName) {

      /**
       * Define simple extend
       * @param destination
       * @param source
       * @returns {*}
       */
      function extend(destination, source) {
        for (var property in source) {
          destination[property] = source[property];
        }
        return destination;
      }

      var options = extend(this.defaultOptions, arguments[2] || {}),
          oEvent, eventType = null;

      for (var name in this.eventMatchers) {
        if (this.eventMatchers[name].test(eventName)) {
          eventType = name;
          break;
        }
      }

      if (!eventType) {
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');
      }

      if (document.createEvent) {

        oEvent = document.createEvent(eventType);

        if (eventType == 'HTMLEvents') {

          oEvent.initEvent(eventName, options.bubbles, options.cancelable);

        } else {

          oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable,
              document.defaultView,
              options.button, options.pointerX, options.pointerY,
              options.pointerX, options.pointerY,
              options.ctrlKey, options.altKey, options.shiftKey,
              options.metaKey, options.button, element);
        }

        element.dispatchEvent(oEvent);

      } else {

        options.clientX = options.pointerX;
        options.clientY = options.pointerY;

        /**
         * Define event
         * @type {Event}
         */
        var evt = document.createEventObject();

        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
      }

      return element;
    }
  });

  return new LibEvent();
});