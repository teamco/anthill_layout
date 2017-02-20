/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineAOneHipHopRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define AOneHipHop Rules Element
   * @param view
   * @param opts
   * @returns {AOneHipHopRulesElement}
   * @constructor
   * @class AOneHipHopRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var AOneHipHopRulesElement = function AOneHipHopRulesElement(view, opts) {

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

  return AOneHipHopRulesElement.extend('AOneHipHopRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
