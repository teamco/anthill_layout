/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineInfogrAmRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define InfogrAm Rules Element
   * @param view
   * @param opts
   * @returns {InfogrAmRulesElement}
   * @constructor
   * @class InfogrAmRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var InfogrAmRulesElement = function InfogrAmRulesElement(view, opts) {

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

  return InfogrAmRulesElement.extend(
      'InfogrAmRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
