/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineTubeEightRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define TubeEight Rules Element
   * @param view
   * @param opts
   * @returns {TubeEightRulesElement}
   * @constructor
   * @class TubeEightRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var TubeEightRulesElement = function TubeEightRulesElement(view, opts) {

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

  return TubeEightRulesElement.extend('TubeEightRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
