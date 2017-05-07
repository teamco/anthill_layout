/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineMetamorphicRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Metamorphic Rules Element
   * @param view
   * @param opts
   * @returns {MetamorphicRulesElement}
   * @constructor
   * @class MetamorphicRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var MetamorphicRulesElement = function MetamorphicRulesElement(view, opts) {

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

  return MetamorphicRulesElement.extend(
      'MetamorphicRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
