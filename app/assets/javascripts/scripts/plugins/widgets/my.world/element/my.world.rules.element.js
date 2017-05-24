/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineMyWorldRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define MyWorld Rules Element
   * @param view
   * @param opts
   * @returns {MyWorldRulesElement}
   * @constructor
   * @class MyWorldRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var MyWorldRulesElement = function MyWorldRulesElement(view, opts) {

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

  return MyWorldRulesElement.extend('MyWorldRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
