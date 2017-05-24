/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineLetsPlayRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define LetsPlay Rules Element
   * @param view
   * @param opts
   * @returns {LetsPlayRulesElement}
   * @constructor
   * @class LetsPlayRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var LetsPlayRulesElement = function LetsPlayRulesElement(view, opts) {

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

  return LetsPlayRulesElement.extend(
      'LetsPlayRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
