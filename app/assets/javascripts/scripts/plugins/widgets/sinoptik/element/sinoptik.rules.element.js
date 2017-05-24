/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineSinoptikRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Sinoptik Rules Element
   * @param view
   * @param opts
   * @returns {SinoptikRulesElement}
   * @constructor
   * @class SinoptikRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SinoptikRulesElement = function SinoptikRulesElement(view, opts) {

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

  return SinoptikRulesElement.extend(
      'SinoptikRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
