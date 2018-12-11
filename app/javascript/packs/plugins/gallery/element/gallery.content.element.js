/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * Define PanelContent Element
 * @class GalleryContentElement
 * @extends PluginElement
 * @extends Renderer
 */
export class GalleryContentElement extends PluginElement {

  /**
   * @param {GalleryView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('GalleryContentElement', view, false);
    this._config(view, opts, $('<li class="nav-item" />')).build(opts);

    /**
     * Define data
     * @property GalleryContentElement
     * @type {{
     *  name: string,
     *  resource: string,
     *  description: string,
     *  is_external: boolean,
     *  external_resource: string
     * }}
     */
    this.data = opts.data;

    this.getTemplate();
    this.setAttributes();
    this.bindInstallWidget();
    this.bindShowInfo();
  }

  /**
   * Define inner content
   * @memberOf GalleryContentElement
   */
  getTemplate() {
    const resource = this.data.resource.toClassName();
    const name = this.data.name;
    $(`<a class="nav-link" data-uuid="${resource}" data-toggle="modal" data-target="#${resource}">
         <span class="widget ${resource}">${name}</span> 
       </a>`).appendTo(this.$);
  }

  /**
   * Set attributes
   * @memberOf GalleryContentElement
   */
  setAttributes() {

    this.$.attr({
      title: this.data.name,
      resource: this.data.resource
    });

    if (this.data.is_external) {
      $('a span', this.$).attr({
        style: `background-image: url("${this.fetchExternalResourceThumbnail(this.data)}");`
      });
    }
  }

  /**
   * Bind Install widget
   * @memberOf GalleryContentElement
   */
  bindInstallWidget() {

    /**
     * @constant that
     * @type {GalleryContentElement}
     */
    const that = this;

    /**
     * Click to install
     * @param {Event} event
     * @private
     */
    function _clickInstall(event) {
      event.preventDefault();
      that.view.controller.addWidget(that);
    }

    that.$.on('click.install', _clickInstall);
  }

  /**
   * Show item info
   * @memberOf GalleryContentElement
   */
  bindShowInfo() {
    const external = this.data.is_external ? 'External' : 'Core';

    this.renderTooltip({
      title: this.data.name,
      description: this.data.description + '\n' + '(' + external + ')',
      selector: this.$,
      customCss: `widget ${this.data.resource.toClassName()}`
    });
  }
}