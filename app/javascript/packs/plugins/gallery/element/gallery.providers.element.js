/**
 * Created by teamco on 3/25/14.
 */

import {PluginElement} from '../../plugin.element';

/**
 * @class GalleryProvidersElement
 * @extends PluginElement
 */
export class GalleryProvidersElement extends PluginElement {

  /**
   * @param {GalleryView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('GalleryProvidersElement', view, false);
    this._config(view, opts, $('<div />')).build(opts);
    this.renderData(opts.data, opts.current);
  }

  /**
   * Prepare data for combo box
   * @memberOf GalleryProvidersElement
   * @param data
   * @returns {*}
   */
  sortComboBoxData(data) {
    let combo = [];
    for (let index in data) {
      if (data.hasOwnProperty(index)) {
        combo.push({
          type: 'text',
          key: data[index].key,
          value: data[index].name
        });
      }
    }

    return this.utils.array.sortByValue.call(combo, 'value', 'string');
  }

  /**
   * Render data
   * @memberOf GalleryProvidersElement
   * @param data
   * @param currentProvider
   * @returns {GalleryProvidersElement|boolean}
   */
  renderData(data, currentProvider) {
    if (!currentProvider) {
      this.view.scope.logger.warn('Undefined current provider');
      this.view.get$container().$.addClass('no-provider');
      return false;
    }

    this.$.append(this.renderCombobox(
        this.sortComboBoxData(data),
        currentProvider.name,
        this.view.scope.i18n.t('gallery.provider'),
        'galleryProviders', {
          type: 'click.changeProvider',
          callback: this.view.controller.changeProvider
        },
        true
    ));

    return this;
  }
}