/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineShowTheWayRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define ShowTheWay Rules Element
   * @param view
   * @param opts
   * @returns {ShowTheWayRulesElement}
   * @constructor
   * @class ShowTheWayRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var ShowTheWayRulesElement = function ShowTheWayRulesElement(view, opts) {

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

  return ShowTheWayRulesElement.extend(
      'ShowTheWayRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
