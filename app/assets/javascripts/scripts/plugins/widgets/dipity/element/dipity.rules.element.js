/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineDipityRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Dipity Rules Element
   * @param view
   * @param opts
   * @returns {DipityRulesElement}
   * @constructor
   * @class DipityRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var DipityRulesElement = function DipityRulesElement(view, opts) {

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

  return DipityRulesElement.extend(
      'DipityRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
