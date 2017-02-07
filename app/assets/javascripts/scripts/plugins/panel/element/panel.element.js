/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function definePanelElement(PluginElement) {

  /**
   * Define Panel Element
   * @param view
   * @param opts
   * @returns {PanelElement}
   * @constructor
   * @class PanelElement
   * @extends PluginElement
   */
  var PanelElement = function PanelElement(view, opts) {

    this._config(view, opts, $(this.getTemplate())).build({
      $container: opts.$container
    });

    /**
     * Fetch panel header
     * @property PanelElement
     */
    this.header = this.view.scope.model.getConfig('header');

    this.addCSS('panel');
    this.setPanelHeader();

    return this;
  };

  return PanelElement.extend('PanelElement', {

    /**
     * Define template
     * @memberOf PanelElement
     * @returns {string}
     */
    getTemplate: function getTemplate() {
      return [
        '<nav class="navbar-default navbar-static-side" role="navigation">',
        '<div class="sidebar-collapse">',
        '<ul></ul></div></nav>'
      ].join('');
    },

    /**
     * Define content container
     * @memberOf PanelElement
     * @returns {*}
     */
    getContentContainer: function getContentContainer() {
      return this.$.find('ul:first');
    },

    /**
     * Toggle open/close
     * @param {string} resource
     * @memberOf PanelElement
     * @returns {boolean}
     */
    toggleModule: function toggleModule(resource) {

      // Define locals
      var view = this.view,
          scope = view.scope;

      scope.observer.publish(
          scope.eventmanager.eventList.showContent,
          resource
      );
    },

    /**
     * Define header wrapper
     * @memberOf PanelElement
     */
    setPanelHeader: function setPanelHeader() {

      var $tpl = $('<li class="nav-header" />'),
          header = this.header;

      if (header && this.base.defineBoolean(header.visible, true)) {

        $tpl.appendTo(this.$.find('ul:first'));

        this.setLongHeader();
        this.setShortHeader();

        this.$.removeClass('no-title');

      } else {

        this.$.addClass('no-title');
      }
    },

    /**
     * Define long header wrapper
     * @memberOf PanelElement
     */
    setLongHeader: function getLongHeaderWrapper() {

      var $tpl = $(
          '<div class="profile-element text-center"><h1 class="logo-element"></h1></div>'),
          title = this.header.title;

      if (title && title.long) {
        $tpl.find('.logo-element').text(title.long);
        $tpl.appendTo(this.$.find('.nav-header'));
      }
    },

    /**
     * Define short header wrapper
     * @memberOf PanelElement
     */
    setShortHeader: function getShortHeaderWrapper() {

      var $tpl = $('<div class="logo-element" />'),
          title = this.header.title;

      if (title && title.short) {
        $tpl.find('.logo-element').text(title.short);
        $tpl.appendTo(this.$.find('.nav-header'));
      }
    },

    /**
     * Hide Active module
     * @memberOf PanelElement
     */
    hideActiveModule: function hideActiveModule() {
      this.view.elements.items[this.getContentItemIndex()].hide();
    },

    /**
     * Show Active module
     * @memberOf PanelElement
     */
    showActiveModule: function showActiveModule() {
      this.view.elements.items[this.getContentItemIndex()].show();
    },

    /**
     * Get item index
     * @memberOf PanelElement
     * @returns {string}
     */
    getContentItemIndex: function getContentItemIndex() {
      return ['$', this.view.controller.getActiveResource(), '-content'].join(
          '');
    }

  }, PluginElement.prototype);

});