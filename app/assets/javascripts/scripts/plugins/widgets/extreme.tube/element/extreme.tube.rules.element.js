/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineExtremeTubeRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define ExtremeTube Rules Element
   * @param view
   * @param opts
   * @returns {ExtremeTubeRulesElement}
   * @constructor
   * @class ExtremeTubeRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var ExtremeTubeRulesElement = function ExtremeTubeRulesElement(view, opts) {

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

  return ExtremeTubeRulesElement.extend('ExtremeTubeRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
