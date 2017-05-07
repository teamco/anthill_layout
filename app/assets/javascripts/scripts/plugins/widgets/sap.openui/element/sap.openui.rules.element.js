/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineSapOpenuiRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define SapOpenui Rules Element
   * @param view
   * @param opts
   * @returns {SapOpenuiRulesElement}
   * @constructor
   * @class SapOpenuiRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SapOpenuiRulesElement = function SapOpenuiRulesElement(view, opts) {

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

  return SapOpenuiRulesElement.extend(
      'SapOpenuiRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
