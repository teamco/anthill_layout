/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineDropboxRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Dropbox Rules Element
   * @param view
   * @param opts
   * @returns {DropboxRulesElement}
   * @constructor
   * @class DropboxRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var DropboxRulesElement = function DropboxRulesElement(view, opts) {

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

  return DropboxRulesElement.extend('DropboxRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});