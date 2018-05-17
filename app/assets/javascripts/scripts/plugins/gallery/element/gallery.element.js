/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

/**
 * @constant PluginElement
 * @type {module.PluginElement}
 */
const PluginElement = require('../../plugin.element.js');

/**
 * @class GalleryElement
 * @extends PluginElement
 */
module.exports = class GalleryElement extends PluginElement {

  /**
   * @param {Gallery} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('GalleryElement', view, false);
    this._config(view, opts, $('<ul />')).build(opts);
    this.addCSS('gallery');
  };
};