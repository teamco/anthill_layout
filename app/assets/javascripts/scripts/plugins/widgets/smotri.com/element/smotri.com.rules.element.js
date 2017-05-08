/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineSmotriComRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define SmotriCom Rules Element
   * @param view
   * @param opts
   * @returns {SmotriComRulesElement}
   * @constructor
   * @class SmotriComRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SmotriComRulesElement = function SmotriComRulesElement(view, opts) {

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

  return SmotriComRulesElement.extend('SmotriComRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
