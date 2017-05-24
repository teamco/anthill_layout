/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineWistiaRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Wistia Rules Element
   * @param view
   * @param opts
   * @returns {WistiaRulesElement}
   * @constructor
   * @class WistiaRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var WistiaRulesElement = function WistiaRulesElement(view, opts) {

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

  return WistiaRulesElement.extend(
      'WistiaRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
