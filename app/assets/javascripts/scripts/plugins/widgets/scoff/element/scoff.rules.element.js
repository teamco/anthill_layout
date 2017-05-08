/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineScoffRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Scoff Rules Element
   * @param view
   * @param opts
   * @returns {ScoffRulesElement}
   * @constructor
   * @class ScoffRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var ScoffRulesElement = function ScoffRulesElement(view, opts) {

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

  return ScoffRulesElement.extend(
      'ScoffRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
