/**
 * @class SelectRenderer
 * @type {SelectRenderer}
 */
import {LibGenerator} from 'js/modules/base/Generator';

export class SelectRenderer {

  /**
   * Render select
   * @memberOf SelectRenderer
   * @param {*} data
   * @param {string} selected
   * @param {string} name
   * @param {*} opts
   * @param {*} event
   * @returns {*|jQuery}
   */
  renderSelect(data, selected, name, opts, event) {
    const $container = opts.$container;
    const list = data || {};
    const label = opts.label;
    const disabled = opts.disabled ? ' disabled' : '';
    const autofocus = opts.autofocus ? ' autofocus' : '';
    const multiple = opts.multiple ? ' multiple' : '';

    let $options = '';

    for (let index in list) {
      if (Object.prototype.hasOwnProperty.call(list, index)) {
        const value = list[index].value;
        const key = list[index].key;
        const disabled = list[index].disabled ? ' disabled' : '';
        const isSelected = selected === value ? ' selected' : '';
        $options += `<option value="${key}"${isSelected}${disabled}>${value}</option>\n`;
      }
    }

    const id = `${LibGenerator.UUID()}-select`;
    const $label = `<label for="${id}">${name}</label>`;

    const $template = window.$(`
      <div class="select-container">
        ${label ? $label : ''}
        <select id="${id}" class="form-control"${disabled}${multiple}${autofocus}>
          ${$options}
        </select>
      </div>        
    `);

    if (typeof event.callback === 'function') {
      const scope = this.view.scope;
      $template.on(event.type, e => {
        e.preventDefault();

        // Execute callback with value as parameter
        event.callback.call(scope.controller, e.target.value);
      });
    }

    return $template.appendTo($container);
  }
}