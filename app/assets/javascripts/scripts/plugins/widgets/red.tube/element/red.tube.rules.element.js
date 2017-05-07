/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineRedTubeRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define RedTube Rules Element
   * @param view
   * @param opts
   * @returns {RedTubeRulesElement}
   * @constructor
   * @class RedTubeRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var RedTubeRulesElement = function RedTubeRulesElement(view, opts) {

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

  return RedTubeRulesElement.extend('RedTubeRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
