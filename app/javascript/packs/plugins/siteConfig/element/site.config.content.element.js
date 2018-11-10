/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * @class SiteConfigContentElement
 * @extends PluginElement
 */
export class SiteConfigContentElement extends PluginElement {

  /**
   * @constructor
   * @param view
   * @param opts
   */
  constructor(view, opts) {
    super('SiteConfigContentElement', view, false);
    this._config(view, opts, $('<li />')).build({
      $container: opts.$container
    });

    /**
     * Define page index
     * @type {number}
     */
    this.index = opts.counter;

    this.init(opts.data);
  }

  /**
   * Define inner content
   * @memberOf WorkspaceDataContentElement
   */
  getTemplate() {
    $('<a class="site-config" />').
        appendTo(this.$);
  }

  /**
   * Define init
   * @memberOf SiteConfigContentElement
   * @param {{title: string, description: string, [event]: string}} data
   * @returns {SiteConfigContentElement}
   */
  init(data) {

    this.getTemplate();
    this.setAttributes(data);
    this.bindShowPrefs(data);

    /**
     * Define data
     * @property SiteConfigContentElement
     * @type {{name: string, description: string}}
     */
    this.data = {
      name: data.title,
      description: data.description
    };
  }

  /**
   * Define attributes
   * @memberOf SiteConfigContentElement
   * @param data
   */
  setAttributes(data) {
    this.renderTooltip({
      title: data.title,
      description: data.description,
      selector: this.$
    });
  }

  /**
   * Bind show prefs
   * @memberOf SiteConfigContentElement
   * @param data
   */
  bindShowPrefs(data) {

    /**
     * Define scope
     * @type {SiteConfig}
     */
    const scope = this.view.scope;

    /**
     * Click prefs
     * @private
     * @param {Event} e
     */
    function _clickPreferences(e) {

      e.preventDefault();

      /**
       * Get event name
       * @type {string}
       */
      const event = scope.eventManager.eventList[data.event];

      event ? scope.observer.publish(event, data) :
          scope.logger.warn('Undefined preferences event', data.title, data.event);
    }

    this.$.off('click.config').on('click.config', _clickPreferences.bind(this));
  }
}
