/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineKickStarterRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define KickStarter Rules Element
   * @param view
   * @param opts
   * @returns {KickStarterRulesElement}
   * @constructor
   * @class KickStarterRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var KickStarterRulesElement = function KickStarterRulesElement(view, opts) {

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

  return KickStarterRulesElement.extend('KickStarterRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
