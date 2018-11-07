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
 */
export class GalleryContentElement extends PluginElement {

  /**
   * @param {GalleryView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('GalleryContentElement', view, false);

    this._config(view, opts, $('<li />')).build({
      $container: opts.$container,
      destroy: false
    });

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
    $('<a class="widget ' + this.data.resource.toClassName() + '" />').appendTo(this.$);
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

      $('a', this.$).attr({
        style: 'background-image: url("' +
        this.fetchExternalResourceThumbnail(this.data) + '");'
      });

    } else {
      this.$.addClass(this.view.controller.getResourceClassName(this.data.resource));
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

    /**
     * Define content element
     * @type {GalleryContentElement|string}
     */
    const element = this,
        external = element.data.is_external ? 'External' : 'Core';

    element.renderTooltip({
      title: element.data.name,
      description: element.data.description + '\n' + '(' + external + ')',
      selector: element.$
    });
  }
}