/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineCountDownElement(PluginElement) {

  /**
   * Define CountDown Element
   * @param view
   * @param opts
   * @returns {CountDownElement}
   * @constructor
   * @class CountDownElement
   * @extends PluginElement
   */
  var CountDownElement = function CountDownElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('count.down', {resource: '/widgets'});

    return this;
  };

  return CountDownElement.extend('CountDownElement', {

    /**
     * Render Embedded content
     * @memberOf CountDownElement
     */
    renderEmbeddedContent: function renderEmbeddedContent() {

      this.$.append(
          '<div>Start in <span id="time-counter">120:00</span> minutes!</div>');

      function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          display.textContent = minutes + ":" + seconds;

          if (--timer < 0) {
            timer = duration;
          }
        }, 1000);
      }

      var hour = 60 * 60,
          endTime = hour * 2,
          display = document.querySelector('#time-counter');

      startTimer(endTime, display);
    }

  }, PluginElement.prototype);
});
