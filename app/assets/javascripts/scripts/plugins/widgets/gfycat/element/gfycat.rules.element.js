/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineGfycatRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Gfycat Rules Element
   * @param view
   * @param opts
   * @returns {GfycatRulesElement}
   * @constructor
   * @class GfycatRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var GfycatRulesElement = function GfycatRulesElement(view, opts) {

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

  return GfycatRulesElement.extend(
      'GfycatRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
