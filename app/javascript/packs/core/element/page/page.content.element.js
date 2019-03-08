/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseElement} from '../../../modules/Element';

/**
 * @extends BaseElement
 * @class PageContentElement
 * @type {PageContentElement}
 */
export class PageContentElement extends BaseElement {

  /**
   * @param {PageView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('PageContentElement', view);
    this._config(view, opts, '<widgets />').build(opts);
  }
}