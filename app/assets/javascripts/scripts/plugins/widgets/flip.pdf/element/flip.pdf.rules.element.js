/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineFlipPdfRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define FlipPdf Rules Element
   * @param view
   * @param opts
   * @returns {FlipPdfRulesElement}
   * @constructor
   * @class FlipPdfRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var FlipPdfRulesElement = function FlipPdfRulesElement(view, opts) {

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

  return FlipPdfRulesElement.extend('FlipPdfRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
