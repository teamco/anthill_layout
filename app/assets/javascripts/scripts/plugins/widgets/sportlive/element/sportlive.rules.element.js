/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineSportliveRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Sportlive Rules Element
   * @param view
   * @param opts
   * @returns {SportliveRulesElement}
   * @constructor
   * @class SportliveRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SportliveRulesElement = function SportliveRulesElement(view, opts) {

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

  return SportliveRulesElement.extend(
      'SportliveRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
