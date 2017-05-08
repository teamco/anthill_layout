/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */
define([
  'plugins/plugin.element'
], function definePanelContentContainerElement(PluginElement) {

  /**
   * Define Panel Content Container Element
   * @param view
   * @param opts
   * @returns {PanelContentContainerElement}
   * @constructor
   * @class PanelContentContainerElement
   * @extends PluginElement
   */
  var PanelContentContainerElement = function PanelContentContainerElement(view,
      opts) {

    this._config(view, opts, $('<li />')).build({
      $container: opts.$container,
      destroy: true
    });

    return this;
  };

  return PanelContentContainerElement.extend(
      'PanelContentContainerElement', {},
      PluginElement.prototype
  );
});