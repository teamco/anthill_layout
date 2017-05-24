/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineMobypictureRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Mobypicture Rules Element
   * @param view
   * @param opts
   * @returns {MobypictureRulesElement}
   * @constructor
   * @class MobypictureRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var MobypictureRulesElement = function MobypictureRulesElement(view, opts) {

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

  return MobypictureRulesElement.extend('MobypictureRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
