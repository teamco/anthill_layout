/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * @class GalleryElement
 * @extends PluginElement
 */
export class GalleryElement extends PluginElement {

  /**
   * @param {GalleryView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('GalleryElement', view, false);
    this._config(view, opts, $('<ul />')).build(opts);
  };
}