/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function definePizapPhotoEditorElement(PluginElement) {

  /**
   * Define PizapPhotoEditor Element
   * @param view
   * @param opts
   * @returns {PizapPhotoEditorElement}
   * @constructor
   * @class PizapPhotoEditorElement
   * @extends PluginElement
   */
  var PizapPhotoEditorElement = function PizapPhotoEditorElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('pizap.photo.editor', {resource: '/widgets'});

    return this;
  };

  return PizapPhotoEditorElement.extend('PizapPhotoEditorElement', {

    /**
     * Render Embedded content
     * @memberOf PizapPhotoEditorElement
     * @param {string} html
     */
    renderEmbeddedContent: function renderEmbeddedContent(html) {
      this.addContent(html);
    }

  }, PluginElement.prototype);
});
