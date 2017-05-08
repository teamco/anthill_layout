/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineVideopressElement(PluginElement) {

  /**
   * Define Videopress Element
   * @param view
   * @param opts
   * @returns {VideopressElement}
   * @constructor
   * @class VideopressElement
   * @extends PluginElement
   */
  var VideopressElement = function VideopressElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('videopress', {resource: '/widgets'});

    return this;
  };

  return VideopressElement.extend('VideopressElement', {

    /**
     * Render Embedded content
     * @memberOf VideopressElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {

      if (!embed) {
        this.$.empty();
        return false;
      }

      var $element = this,
          $embed = $(embed);

      require([$embed[1].src], function _loadScript() {

        $element.$.append(
            $element.renderIframe(
                $embed[0].src
            )
        );
      });
    }

  }, PluginElement.prototype);
});
