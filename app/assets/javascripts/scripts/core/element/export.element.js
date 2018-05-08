/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseElement
 * @type {module.BaseElement}
 */
const BaseElement = require('../lib/modules/Element.js');

/**
 * Define Application export element
 * @class ExportElement
 * @extends module.BaseElement
 */
module.exports = class ExportElement extends BaseElement {

  /**
   * @param view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('ExportElement', view, false);

    this._config(view, opts, $('<a />')).build(opts);
    this.init(opts.data || {});
  }

  /**
   * Init export element
   * @memberOf ExportElement
   * @param {{
   *  type: string,
   *  [fileName]: string,
   *  [title]: string,
   *  content,
   *  [autoload]: boolean
   * }} data
   * @returns {module.ExportElement}
   */
  init(data) {

    /**
     * Define scope
     * @type {module.Application}
     */
    const scope = this.view.scope;

    const lib = scope.base.lib,
        fname = data.fileName || 'file.txt';

    /**
     * Define url
     * @type {string}
     */
    let url;

    try {

      url = lib.file.createURL(
          scope.base.isBase64(data.content) ?
              data.content :
              lib.string.utf8ToBase64(data.content),
          data.type,
          fname
      );

      scope.logger.debug('Blob URL', url);

    } catch (e) {

      scope.logger.warn('Unable to create Blob URL', e);

      /**
       * Define content
       * @type {string}
       */
      const content = lib.string.base64.encode(
          data.content
      );

      if (content.length <= 50000) {

        try {

          url = [
            'data:', data.type,
            ';charset=utf-8;base64,', content
          ].join('');

          scope.logger.debug('Data-URI URL', url);

        } catch (e) {

          scope.logger.warn('Unable to create URL', e);
        }

      } else {

        scope.logger.warn('URL too long');
      }
    }

    if (url) {

      this.$.attr({

        href: url,
        download: fname,
        title: data.title || 'Download'

      }).text(data.title || 'Download');

      if (data.autoload) {

        lib.event.simulate(this.$[0], 'click');
      }
    }

    return this;
  }
};