/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineUbrRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Ubr Rules Element
   * @param view
   * @param opts
   * @returns {UbrRulesElement}
   * @constructor
   * @class UbrRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var UbrRulesElement = function UbrRulesElement(view, opts) {

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

  return UbrRulesElement.extend('UbrRulesElement', {}, PluginElement.prototype,
      BaseWidgetRules.prototype);

});
