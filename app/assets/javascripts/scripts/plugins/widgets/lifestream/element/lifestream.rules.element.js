/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineLifestreamRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Lifestream Rules Element
   * @param view
   * @param opts
   * @returns {LifestreamRulesElement}
   * @constructor
   * @class LifestreamRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var LifestreamRulesElement = function LifestreamRulesElement(view, opts) {

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

  return LifestreamRulesElement.extend('LifestreamRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
