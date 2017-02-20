/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineLetsPlayElement(PluginElement) {

  /**
   * Define LetsPlay Element
   * @param view
   * @param opts
   * @returns {LetsPlayElement}
   * @constructor
   * @class LetsPlayElement
   * @extends PluginElement
   */
  var LetsPlayElement = function LetsPlayElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('lets.play', {resource: '/widgets'});

    return this;
  };

  return LetsPlayElement.extend('LetsPlayElement', {

    /**
     * Render Embedded content
     * @memberOf LetsPlayElement
     */
    renderEmbeddedContent: function renderEmbeddedContent() {

      this.addContent('<img src="/assets/demo/play" />');

      this.$.off().on(
          'click',
          function () {
            $('.application').scrollTop(0, 0);
            window.location.hash = '#/profile';
          }
      );
    }

  }, PluginElement.prototype);
});
