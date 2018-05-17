/**
 * Created by teamco on 3/25/14.
 */

/**
 * @constant BaseElement
 * @type {module.BaseElement}
 */
const BaseElement = require('../lib/modules/Element.js');

/**
 * @class FilterElement
 * @type {module.FilterElement}
 * @extends BaseElement
 */
module.exports = class FilterElement extends BaseElement {

  /**
   * @param view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('FilterElement', view, false);
    this._config(view, opts, $('<div />')).build(opts);
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
      placeholder: this.view.scope.i18n.t('filter'),
      visible: true,
      callback: callback,
      enter: enter
    });

    this.$.append(this.$filter);
  }
};