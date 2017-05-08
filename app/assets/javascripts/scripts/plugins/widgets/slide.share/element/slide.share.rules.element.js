/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineSlideShareRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define SlideShare Rules Element
   * @param view
   * @param opts
   * @returns {SlideShareRulesElement}
   * @constructor
   * @class SlideShareRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SlideShareRulesElement = function SlideShareRulesElement(view, opts) {

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

  return SlideShareRulesElement.extend('SlideShareRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
