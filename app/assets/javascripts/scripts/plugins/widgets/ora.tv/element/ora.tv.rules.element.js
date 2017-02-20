/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineOraTvRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define OraTv Rules Element
   * @param view
   * @param opts
   * @returns {OraTvRulesElement}
   * @constructor
   * @class OraTvRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var OraTvRulesElement = function OraTvRulesElement(view, opts) {

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

  return OraTvRulesElement.extend(
      'OraTvRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
