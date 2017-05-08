/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'element/button.element'
], function defineWebrtcVideoChatElement(PluginElement, ButttonElement) {

  /**
   * Define WebrtcVideoChat Element
   * @param view
   * @param opts
   * @returns {WebrtcVideoChatElement}
   * @constructor
   * @class WebrtcVideoChatElement
   * @extends PluginElement
   * @extends Renderer
   */
  var WebrtcVideoChatElement = function WebrtcVideoChatElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.$buttons = {};
    this.addCSS('webrtc.video.chat', {resource: '/widgets'});

    return this;
  };

  return WebrtcVideoChatElement.extend('WebrtcVideoChatElement', {

    /**
     * Render Embedded content
     * @memberOf WebrtcVideoChatElement
     * @param {string} ppupnub
     * @param {string} webrtc
     */
    renderEmbeddedContent: function renderEmbeddedContent(ppupnub, webrtc) {

      /**
       * Get login field
       * @type {TextFieldRenderer}
       */
      this.$loginField = this.renderTextField({
        name: 'login',
        text: '',
        placeholder: 'Pick a username',
        disabled: false,
        visible: true
      });

      /**
       * Get call field
       * @type {TextFieldRenderer}
       */
      this.$callField = this.renderTextField({
        name: 'call',
        text: '',
        placeholder: 'Enter user to dial',
        disabled: false,
        visible: true
      });

      var $liCall = $('<li />').append(this.$callField),
          $liLogin = $('<li />').append(this.$loginField);

      this.$.append('<ul />').
          find('ul').
          append([$liLogin, $liCall]);

      this.view.button(
          ButttonElement, {
            login: {
              $container: $liLogin,
              text: 'Login',
              events: {click: 'doLogin'}
            },
            call: {
              $container: $liCall,
              text: 'Call',
              events: {click: 'doCall'}
            }
          }, this.$buttons
      );

      require([ppupnub, webrtc]);
    },

    /**
     * Define append video
     * @memberOf WebrtcVideoChatElement
     * @param video
     */
    appendVideo: function appendVideo(video) {
      this.$.append(video);
    },

    /**
     * Define fetch value
     * @memberOf WebrtcVideoChatElement
     * @param {string} $element
     * @returns {string}
     */
    fetchValue: function fetchValue($element) {
      return this[$element][1].val();
    }

  }, PluginElement.prototype);

});
