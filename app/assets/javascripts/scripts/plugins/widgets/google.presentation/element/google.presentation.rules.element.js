/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineGooglePresentationRulesElement(PluginElement,
    BaseWidgetRules) {

  /**
   * Define GooglePresentation Rules Element
   * @param view
   * @param opts
   * @returns {GooglePresentationRulesElement}
   * @constructor
   * @class GooglePresentationRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var GooglePresentationRulesElement = function GooglePresentationRulesElement(view,
      opts) {

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

  return GooglePresentationRulesElement.extend('GooglePresentationRulesElement',
      {}, PluginElement.prototype, BaseWidgetRules.prototype);

});
