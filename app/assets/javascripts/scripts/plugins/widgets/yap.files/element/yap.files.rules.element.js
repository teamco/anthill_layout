/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineYapFilesRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define YapFiles Rules Element
   * @param view
   * @param opts
   * @returns {YapFilesRulesElement}
   * @constructor
   * @class YapFilesRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var YapFilesRulesElement = function YapFilesRulesElement(view, opts) {

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

  return YapFilesRulesElement.extend('YapFilesRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
