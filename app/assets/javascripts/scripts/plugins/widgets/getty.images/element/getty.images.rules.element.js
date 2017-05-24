/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineGettyImagesRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define GettyImages Rules Element
   * @param view
   * @param opts
   * @returns {GettyImagesRulesElement}
   * @constructor
   * @class GettyImagesRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var GettyImagesRulesElement = function GettyImagesRulesElement(view, opts) {

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

  return GettyImagesRulesElement.extend(
      'GettyImagesRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
