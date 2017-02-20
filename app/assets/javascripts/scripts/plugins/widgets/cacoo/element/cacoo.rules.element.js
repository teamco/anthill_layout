/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineCacooRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Cacoo Rules Element
   * @param view
   * @param opts
   * @returns {CacooRulesElement}
   * @constructor
   * @class CacooRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var CacooRulesElement = function CacooRulesElement(view, opts) {

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

  return CacooRulesElement.extend(
      'CacooRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
