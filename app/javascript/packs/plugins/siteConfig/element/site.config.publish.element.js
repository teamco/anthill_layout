/**
 * Created by teamco on 7/31/14.
 */
import {PluginElement} from '../../plugin.element';

/**
 * @class SiteConfigPublishElement
 * @extends PluginElement
 */
export class SiteConfigPublishElement extends PluginElement {

  /**
   * @constructor
   * @param view
   * @param opts
   */
  constructor(view, opts) {
    super('SiteConfigPublishElement', view, false);
    this._config(view, opts, $('<div class="publish" />')).build({
      $container: opts.$container
    });

    this.renderContent();
  }

  /**
   * Render content
   * @memberOf SiteConfigPublishElement
   */
  renderContent() {
    // TODO
  }
}