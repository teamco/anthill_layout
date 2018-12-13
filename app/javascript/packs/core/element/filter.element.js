/**
 * Created by teamco on 3/25/14.
 */

import {BaseElement} from '../../modules/Element';

/**
 * @class FilterElement
 * @type {FilterElement}
 * @extends BaseElement
 */
export class FilterElement extends BaseElement {

  /**
   * @param view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('FilterElement', view);
    this._config(view, opts, $('<li class="nav-item" />')).build(opts);
    this.renderData(opts.callback, opts.enter);
  }

  /**
   * Render search
   * @memberOf FilterElement
   * @param {function} [callback]
   * @param {boolean} [enter]
   */
  renderData(callback, enter) {

    /**
     * Define $filter
     * @type {FilterRenderer}
     */
    this.$filter = this.renderFilter({
      text: '',
      name: 'filter',
      placeholder: `${this.view.scope.i18n.t('filter')}`,
      visible: true,
      callback: callback,
      enter: enter
    });

    this.$.append(this.$filter);
  }
}