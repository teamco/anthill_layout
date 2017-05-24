/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineSoundCloudRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define SoundCloud Rules Element
   * @param view
   * @param opts
   * @returns {SoundCloudRulesElement}
   * @constructor
   * @class SoundCloudRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SoundCloudRulesElement = function SoundCloudRulesElement(view, opts) {

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

  return SoundCloudRulesElement.extend('SoundCloudRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
