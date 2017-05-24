/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function definePetPassportRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define PetPassport Rules Element
   * @param view
   * @param opts
   * @returns {PetPassportRulesElement}
   * @constructor
   * @class PetPassportRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var PetPassportRulesElement = function PetPassportRulesElement(view, opts) {

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

  return PetPassportRulesElement.extend('PetPassportRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});