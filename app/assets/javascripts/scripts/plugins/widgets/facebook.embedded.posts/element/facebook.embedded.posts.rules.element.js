/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineFacebookEmbeddedPostsRulesElement(PluginElement,
    BaseWidgetRules) {

  /**
   * Define FacebookEmbeddedPosts Rules Element
   * @param view
   * @param opts
   * @returns {FacebookEmbeddedPostsRulesElement}
   * @constructor
   * @class FacebookEmbeddedPostsRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var FacebookEmbeddedPostsRulesElement = function FacebookEmbeddedPostsRulesElement(view,
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

  return FacebookEmbeddedPostsRulesElement.extend(
      'FacebookEmbeddedPostsRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
