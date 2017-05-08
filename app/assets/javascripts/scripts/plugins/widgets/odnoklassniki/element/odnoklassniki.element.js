/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineOdnoklassnikiElement(PluginElement) {

  /**
   * Define Odnoklassniki Element
   * @param view
   * @param opts
   * @returns {OdnoklassnikiElement}
   * @constructor
   * @class OdnoklassnikiElement
   * @extends PluginElement
   */
  var OdnoklassnikiElement = function OdnoklassnikiElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('odnoklassniki', {resource: '/widgets'});

    return this;
  };

  return OdnoklassnikiElement.extend('OdnoklassnikiElement', {

    /**
     * Render Embedded content
     * @memberOf OdnoklassnikiElement
     * @param {string} groupId
     * @param {number} width
     * @param {number} height
     */
    renderEmbeddedContent: function renderEmbeddedContent(groupId, width,
        height) {

      this.addContent('<div id="ok_group_widget" />');

      !function (d, id, did, st) {
        var js = d.createElement("script");
        js.src = "https://connect.ok.ru/connect.js";
        js.onload = js.onreadystatechange = function () {
          if (!this.readyState || this.readyState === "loaded" ||
              this.readyState === "complete") {
            if (!this.executed) {
              this.executed = true;
              setTimeout(function () {
                OK.CONNECT.insertGroupWidget(id, did, st);
              }, 0);
            }
          }
        };
        d.documentElement.appendChild(js);
      }(
          document, 'ok_group_widget', groupId,
          '{width:' + (width || 250) + ',height:' + (height || 250) + '}'
      );
    }

  }, PluginElement.prototype);
});
