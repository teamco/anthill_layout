/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineBingMapsRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define BingMaps Rules Element
   * @param view
   * @param opts
   * @returns {BingMapsRulesElement}
   * @constructor
   * @class BingMapsRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var BingMapsRulesElement = function BingMapsRulesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBaseRulesData(
        opts.data,
        opts.rules.widget,
        opts.rules.content
    );

    return this;
  };

  return BingMapsRulesElement.extend(
      'BingMapsRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
