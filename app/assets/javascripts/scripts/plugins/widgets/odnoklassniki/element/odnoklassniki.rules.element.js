/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineOdnoklassnikiRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Odnoklassniki Rules Element
   * @param view
   * @param opts
   * @returns {OdnoklassnikiRulesElement}
   * @constructor
   * @class OdnoklassnikiRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var OdnoklassnikiRulesElement = function OdnoklassnikiRulesElement(view,
      opts) {

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

  return OdnoklassnikiRulesElement.extend(
      'OdnoklassnikiRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
