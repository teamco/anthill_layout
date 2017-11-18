/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

defineP([
  'plugins/plugin.element'
], function defineWidgetRulesContentElement(PluginElement) {

  /**
   * Define WidgetRules Content Element
   * @param view
   * @param opts
   * @returns {WidgetRulesContentElement}
   * @constructor
   * @class WidgetRulesContentElement
   * @extends PluginElement
   * @extends Renderer
   */
  var WidgetRulesContentElement = function WidgetRulesContentElement(view,
      opts) {

    this._config(view, opts, $('<li />')).build({
      $container: opts.$container
    });

    this.getTemplate(opts.data);
    this.setAttributes(opts.data);
    this.bindShowRules(opts.data);
    this.bindLocate(opts.data);

    return this;
  };

  return WidgetRulesContentElement.extend('WidgetRulesContentElement', {

    /**
     * Define inner content
     * @memberOf WidgetRulesContentElement
     */
    getTemplate: function getTemplate(data) {
      $('<a class="widget ' +
          data.model.getConfig('preferences').resource.toClassName() + '" />').
          appendTo(this.$);
    },

    /**
     * Define attributes
     * @memberOf WidgetRulesContentElement
     * @param data
     */
    setAttributes: function setAttributes(data) {

      /**
       * Get title
       * @type {boolean|string}
       */
      var title = data.model.getItemTitle();

      /**
       * Get prefs
       * @type {{description: string, resource: string}}
       */
      var prefs = data.model.getConfig('preferences');

      /**
       * Get description
       * @type {string}
       */
      var description = prefs.description || '';

      /**
       * Define data
       * @memberOf WidgetRulesContentElement
       * @type {{name: string, description: string}}
       */
      this.data = {
        name: title,
        description: description
      };

      this.$.attr({
        title: title
      }).addClass(
          this.view.controller.getResourceClassName(
              prefs.resource
          )
      );

      this.renderTooltip({
        title: title,
        description: description,
        selector: this.$
      });
    },

    /**
     * Bind show rules
     * @memberOf WidgetRulesContentElement
     * @param data
     */
    bindShowRules: function bindShowRules(data) {

      /**
       * Get scope
       * @type {WidgetRules}
       */
      var scope = this.view.scope;

      this.bindShowModalData(data, function _loadStoredRules() {
        scope.controller.loadStoredRules(
            data.model.getConfig().rules
        );
      });
    }

  }, PluginElement.prototype);
});