/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineVineCoRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define VineCo Rules Element
   * @param view
   * @param opts
   * @returns {VineCoRulesElement}
   * @constructor
   * @class VineCoRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var VineCoRulesElement = function VineCoRulesElement(view, opts) {

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

  return VineCoRulesElement.extend('VineCoRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
