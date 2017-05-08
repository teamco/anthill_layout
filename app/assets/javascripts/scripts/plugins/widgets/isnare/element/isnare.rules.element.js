/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineIsnareRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Isnare Rules Element
   * @param view
   * @param opts
   * @returns {IsnareRulesElement}
   * @constructor
   * @class IsnareRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var IsnareRulesElement = function IsnareRulesElement(view, opts) {

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

  return IsnareRulesElement.extend('IsnareRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
