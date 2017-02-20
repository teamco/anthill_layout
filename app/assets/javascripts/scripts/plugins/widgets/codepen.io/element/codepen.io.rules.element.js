/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineCodepenIoRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define CodepenIo Rules Element
   * @param view
   * @param opts
   * @returns {CodepenIoRulesElement}
   * @constructor
   * @class CodepenIoRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var CodepenIoRulesElement = function CodepenIoRulesElement(view, opts) {

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

  return CodepenIoRulesElement.extend(
      'CodepenIoRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
