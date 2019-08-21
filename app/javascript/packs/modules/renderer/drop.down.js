/**
 * Created by teamco on 7/10/14.
 */

import {LibGenerator} from 'js/modules/base/Generator';

/**
 * @class DropDownRenderer
 * @type {DropDownRenderer}
 */
export class DropDownRenderer {

  /**
   * Render drop down list
   * @memberOf DropDownRenderer
   * @param {Array} data
   * @param selected
   * @param {string} name
   * @param {string} index
   * @param {{type: string, callback: function}} [event]
   * @param {boolean} [visible]
   * @param {boolean} [disabled]
   * @param {string} [placeholder]
   * @param {boolean} [store]
   * @param {boolean} [label]
   */
  renderDropDown(data, selected, name, index, event, visible, disabled, placeholder, store, label) {

    // Init placeholder
    placeholder = _.isUndefined(placeholder) ? false : placeholder;

    // Init disabled
    disabled = this.view.utils.setBoolean(disabled, false);

    // Init store
    store = this.view.utils.setBoolean(store, true);

    // Init label
    label = this.view.utils.setBoolean(label, false);

    // Set default event
    event = event || {};

    /**
     * Define active content
     * @type {{name}|Page|WidgetContent}
     */
    const activeContent = this.view.scope.activeContent;

    const $input = $(`<input type="hidden" class="${store ? ' store' : ''}" />`).attr({
      name: index,
      value: selected
    });

    const style = (activeContent ? `${index}${activeContent.name}` : index).toDash(),
        id = `${LibGenerator.UUID()}-dropdown`,
        customCss = `${style} ${disabled ? ' disabled' : ''}`;

    const $combo = $(
        `<div class="input-group mb-2">         
          <button class="form-control btn btn-outline-secondary btn-sm dropdown-toggle ${customCss}" 
                  type="button" 
                  id="${id}-categories" 
                  data-toggle="dropdown" 
                  aria-haspopup="true" 
                  data-boundary="viewport" 
                  aria-expanded="false">
            Choose category
          </button>                                        
          <div class="dropdown-menu" aria-labelledby="${id}-categories"></div> 
        </div>`
    );

    $('li', $combo).append($input);

    /**
     * Update placeholder
     * @param value
     * @private
     */
    function _updatePlaceholder(value) {
      $('.dropdown-toggle', $combo).html(`${value}`);
    }

    /**
     * Store prefs
     * @param $selected
     * @param [force] {boolean}
     * @returns {boolean}
     * @private
     */
    function _store($selected, force) {
      const target = arguments[0].target;
      if (target) {
        $selected = $(target);
      }

      /**
       * Define value
       * @type {string}
       */
      const value = $selected.text();

      if (!force && value === selected) {
        return false;
      }

      selected = value;

      $('a', $selected.parent()).removeClass('selected');
      $selected.addClass('selected');
      $(`input[name="${index}"]`, $combo).val(value);
      _updatePlaceholder(value);
    }

    /**
     * Define $ul
     * @type {*|jQuery}
     */
    const $ul = $('div.dropdown-menu', $combo);
    let i = 0, l = data.length;

    for (; i < l; i++) {

      const field = data[i];
      let $li;

      if (field.type === 'text') {
        $li = $('<a class="dropdown-item" href="#" />').text(field.value);
      }

      if (field.type === 'html') {
        $li = field.value;
      }

      if (field.type === 'field') {
        $li = this.renderTextField({
          name: field.name,
          text: field.text.trim(),
          placeholder: field.placeholder,
          value: field.value,
          disabled: field.disabled,
          visible: field.visible,
          validate: field.validate,
          monitor: field.monitor
        });
      }

      if (selected === field.value) {
        _store($li, true);
      }

      $li.on('click.dropDownInternal', _store);

      // Get scope
      const scope = this.view.scope;

      if (typeof event.callback === 'function') {
        $li.on(event.type, e => {

          // Fix for change hash.
          e.preventDefault();

          // Execute callback with value as parameter
          event.callback.call(scope.controller, $(e.target).attr('rel'));
        });
      }

      $li.attr({
        rel: field.key || field.value,
        title: data[i].title || field.value
      }).appendTo($ul);

      /**
       * Get tooltip
       * @type {string|*}
       */
      const tooltip = data[i].tooltip;

      if (tooltip) {
        this.renderTooltip({
          title: field.value,
          description: tooltip,
          selector: $li
        });
      }
    }

    if (!selected) {
      _updatePlaceholder(placeholder ?
          this.view.scope.i18n.t('DropDown.placeholder', [name]) :
          $('li:first', $ul).text());
    }

    const labelPattern = new RegExp(this.view.scope.name.toLowerCase());

    // Define label
    const $label = $(`
      <div class="input-group-prepend">
        <span class="input-group-text lg-input">${(index.replace(labelPattern, '').humanize())}</span>
      </div>`);

    if (disabled) {
      this.disableDropDown($combo);
    }

    return label ? $combo.prepend($label) : $combo;
  }

  /**
   * Check if combo box disabled
   * @memberOf DropDownRenderer
   * @param $combo
   * @returns {boolean}
   */
  isDisabledDropDown($combo) {
    return $('li.dropdown', $combo).hasClass('disabled');
  }

  /**
   * Define enable combo box
   * @memberOf DropDownRenderer
   * @param $combo
   */
  enableDropDown($combo) {
    $('li.dropdown', $combo).removeClass('disabled');
    $('li.dropdown > a.dropdown-toggle', $combo).removeClass('disabled');
  }

  /**
   * Define disable combo box
   * @memberOf DropDownRenderer
   * @param $combo
   */
  disableDropDown($combo) {
    $('li.dropdown', $combo).addClass('disabled');
    $('li.dropdown > a.dropdown-toggle', $combo).addClass('disabled');
  }
}