/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

defineP([
  'plugins/plugin.element'
], function defineMaximizeElement(PluginElement) {

  /**
   * Define Maximize Element
   * @param view
   * @param opts
   * @returns {MaximizeElement}
   * @constructor
   * @class MaximizeElement
   * @extends PluginElement
   */
  var MaximizeElement = function MaximizeElement(view, opts) {

    this._config(view, opts, $('<ul />')).build({
      $container: opts.$container
    });

    this.addCSS('maximize');

    return this;
  };

  return MaximizeElement.extend('MaximizeElement', {}, PluginElement.prototype);
});