/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function definePixivElement(PluginElement) {

  /**
   * Define Pixiv Element
   * @param view
   * @param opts
   * @returns {PixivElement}
   * @constructor
   * @class PixivElement
   * @extends PluginElement
   */
  var PixivElement = function PixivElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('pixiv', {resource: '/widgets'});

    /**
     * Define embed
     * @memberOf PixivElement
     * @type {*}
     */
    this.embed = opts.embed;

    return this;
  };

  return PixivElement.extend('PixivElement', {

    /**
     * Render Embedded content
     * @memberOf PixivElement
     * @param {HTMLElement} code
     */
    renderEmbeddedContent: function renderEmbeddedContent(code) {

      // Export attributes
      // data-size="small|medium|large"
      // data-border="on|off"
      var attributes = {
        'src': code.getAttribute('src'),
        'data-id': code.getAttribute('data-id'),
        'data-size': code.getAttribute('data-size'),
        'data-border': code.getAttribute('data-border'),
        'done': code.getAttribute('data-done')
      };

      this.createScript(attributes, this.$[0]);

      /**
       * Get EventManager
       * @type {Pixiv}
       */
      var scope = this.view.scope,
          event = scope.eventmanager,
          $element = this;

      this.base.waitFor(
          function condition() {
            return $('div.pixiv-embed', $element.$).length > 0;
          },

          function callback() {

            // Re-emit the load event
            event.reEmmit('load');

            // Re-emit the message event
            event.reEmmit('message');
          },

          function fallback() {
            scope.logger.warn('Timeout. Unable to embed content');
          }
      );
    }

  }, PluginElement.prototype);
});