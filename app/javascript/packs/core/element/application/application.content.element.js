/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseElement} from '../../../modules/Element';

/**
 * Define Application content element
 * @class ApplicationContentElement
 * @type {module.ApplicationContentElement}
 * @extends BaseElement
 */
export class ApplicationContentElement extends BaseElement {

  /**
   * @param {ApplicationView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('ApplicationContentElement', view);
    this._config(view, opts, $('<workspaces />')).build(opts);
  }
}
