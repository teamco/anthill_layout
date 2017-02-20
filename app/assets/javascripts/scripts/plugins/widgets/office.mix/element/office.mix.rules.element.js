/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineOfficeMixRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define OfficeMix Rules Element
   * @param view
   * @param opts
   * @returns {OfficeMixRulesElement}
   * @constructor
   * @class OfficeMixRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var OfficeMixRulesElement = function OfficeMixRulesElement(view, opts) {

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

  return OfficeMixRulesElement.extend(
      'OfficeMixRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
