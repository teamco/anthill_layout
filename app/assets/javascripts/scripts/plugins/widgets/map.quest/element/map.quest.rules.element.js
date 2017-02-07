/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineMapQuestRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define MapQuest Rules Element
   * @param view
   * @param opts
   * @returns {MapQuestRulesElement}
   * @constructor
   * @class MapQuestRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var MapQuestRulesElement = function MapQuestRulesElement(view, opts) {

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

  return MapQuestRulesElement.extend(
      'MapQuestRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
