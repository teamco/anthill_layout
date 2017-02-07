/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineTutByRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define TutBy Rules Element
   * @param view
   * @param opts
   * @returns {TutByRulesElement}
   * @constructor
   * @class TutByRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var TutByRulesElement = function TutByRulesElement(view, opts) {

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

  return TutByRulesElement.extend(
      'TutByRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
