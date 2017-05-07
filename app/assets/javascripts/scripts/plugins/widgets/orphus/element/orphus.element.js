/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineOrphusElement(PluginElement) {

  /**
   * Define Orphus Element
   * @param view
   * @param opts
   * @returns {OrphusElement}
   * @constructor
   * @class OrphusElement
   * @extends PluginElement
   */
  var OrphusElement = function OrphusElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('orphus', {resource: '/widgets'});

    return this;
  };

  return OrphusElement.extend('OrphusElement', {

    /**
     * Render Embedded content
     * @memberOf OrphusElement
     * @param {string} main
     * @returns {boolean}
     */
    renderEmbeddedContent: function renderEmbeddedContent(main) {

      /**
       * Get scope
       * @type {Orphus}
       */
      var scope = this.view.scope;

      this.setHtml([
        '<a href="http://orphus.ru" id="orphus" target="_blank">',
        '<img alt="Orphus system" src="/assets/scripts/plugins/widgets/orphus/lib/orphus.gif" />',
        '</a>'
      ].join(''));

      if (main) {

        /**
         * Define function
         * @type {Function}
         */
        var mainScript = new window.Function(main);

        // Run script
        mainScript();

        scope.logger.debug('Load orphus', main);

        return false;
      }

      require(['plugins/widgets/orphus/lib/orphus'],
          function _loadDefaultScript() {
            scope.logger.debug('Load default orphus script', main);
          });
    }

  }, PluginElement.prototype);
});
