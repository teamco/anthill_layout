/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineClypItRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define ClypIt Rules Element
   * @param view
   * @param opts
   * @returns {ClypItRulesElement}
   * @constructor
   * @class ClypItRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var ClypItRulesElement = function ClypItRulesElement(view, opts) {

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

  return ClypItRulesElement.extend(
      'ClypItRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
