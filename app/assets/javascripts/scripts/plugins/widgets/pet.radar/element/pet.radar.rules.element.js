/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function definePetRadarRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define PetRadar Rules Element
   * @param view
   * @param opts
   * @returns {PetRadarRulesElement}
   * @constructor
   * @class PetRadarRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var PetRadarRulesElement = function PetRadarRulesElement(view, opts) {

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

  return PetRadarRulesElement.extend('PetRadarRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});