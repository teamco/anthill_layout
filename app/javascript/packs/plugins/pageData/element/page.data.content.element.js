/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * @class PageDataContentElement
 * @extends PluginElement
 */
export class PageDataContentElement extends PluginElement {

  /**
   * @param {BaseView|PageDataView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('PageDataContentElement', view, false);
    this._config(view, opts, $('<li class="nav-item" />')).build(opts);
    this.getTemplate(opts.data);
    this.setAttributes(opts.data);
    this.bindShowPrefs(opts.data);
    this.bindLocate(opts.data);
  }

  /**
   * Define inner content
   * @memberOf PageDataContentElement
   */
  getTemplate(data) {
    const resource = data.model.getConfig('preferences').resource.toClassName();
    const name = data.name;
    $(`<a class="nav-link" data-uuid="${resource}" data-toggle="modal" data-target="#${resource}">
         <span class="widget ${resource.toClassName()}">${name}</span> 
       </a>`).appendTo(this.$)
  }

  /**
   * Define attributes
   * @memberOf PageDataContentElement
   * @param data
   */
  setAttributes(data) {

    /**
     * Get title
     * @type {boolean|string}
     */
    const title = data.model.getItemTitle();

    /**
     * Get prefs
     * @type {{description: string, resource: string}}
     */
    const prefs = data.model.getConfig('preferences');

    /**
     * Define data
     * @memberOf PageDataContentElement
     * @type {{name: string, description: string}}
     */
    this.data = {
      name: title,
      description: prefs.description
    };

    /**
     * Get description
     * @type {string}
     */
    const description = prefs.description || '';
    this.$.attr({title: title}).addClass(this.view.controller.getResourceClassName(prefs.resource));

    this.renderTooltip({
      title: title,
      description: description,
      selector: this.$
    });
  }

  /**
   * Bind show prefs
   * @memberOf PageDataContentElement
   * @param data
   */
  bindShowPrefs(data) {
    this.bindShowModalData(data);
  }
}