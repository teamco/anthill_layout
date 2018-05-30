/**
 * Created by teamco on 3/19/14.
 */

/**
 * @class BasePreferencesElement
 * @type {module.BasePreferencesElement}
 */
module.exports = class BasePreferencesElement {

  /**
   * Open preferences
   * @memberOf BasePreferencesElement
   * @param opts
   */
  openPreferences(opts) {

    /**
     * Define buttons
     * @type {*}
     */
    const buttons = $.extend(true, {}, {
      locate: {
        text: 'Locate',
        type: 'default',
        events: {
          click: 'locateElementItem'
        }
      },
      approve: {
        text: 'OK',
        type: 'success',
        events: {
          click: 'approveUpdatePreferences'
        }
      },
      reject: {
        text: 'Cancel',
        type: 'default',
        events: {
          click: ['rejectModalEvent']
        }
      }
    }, opts.buttons || {});

    this.modalDialog({
      style: opts.style,
      type: opts.type || 'info',
      title: opts.title,
      text: opts.config.uuid,
      html: opts.$html,
      cover: true,
      buttons: buttons
    });
  }

  /**
   * Get node renderer
   * @memberOf BasePreferencesElement
   * @param node
   * @param {string} text
   * @param {string} index
   * @returns {*}
   */
  getNodeRenderer(node, text, index) {

    /**
     * Define placeholder text
     * @type {string}
     */
    const placeholder = node.placeholder || 'Enter ' + text;
    let $element;

    if (node.type === 'event') {

      /**
       * Get text field
       * @type {*[]}
       */
      $element = this.renderEventLink({
        name: index,
        title: text.trim(),
        group: node.group || index,
        disabled: node.disabled,
        events: node.events,
        visible: node.visible,
        tooltip: node.tooltip,
        checked: node.checked,
        monitor: node.monitor
      });
    }

    if (node.type === 'texteditor') {

      /**
       * Get text field
       * @type {*[]}
       */
      $element = this.renderTextEditor({
        name: index,
        text: text.trim(),
        placeholder: placeholder,
        value: node.value,
        disabled: node.disabled,
        visible: node.visible,
        validate: node.validate,
        tooltip: node.tooltip,
        monitor: node.monitor
      });
    }

    if (node.type === 'text') {

      /**
       * Get text field
       * @type {*[]}
       */
      $element = this.renderTextField({
        name: index,
        text: text.trim(),
        placeholder: placeholder,
        value: node.value,
        disabled: node.disabled,
        visible: node.visible,
        validate: node.validate,
        tooltip: node.tooltip,
        monitor: node.monitor
      });
    }

    if (node.type === 'number') {

      /**
       * Get number field
       * @type {*[]}
       */
      $element = this.renderNumberField({
        name: index,
        text: text.trim(),
        placeholder: placeholder,
        value: node.value,
        disabled: node.disabled,
        visible: node.visible,
        tooltip: node.tooltip,
        validate: node.validate,
        monitor: node.monitor
      });
    }

    if (node.type === 'range') {

      /**
       * Get number field
       * @type {*[]}
       */
      $element = this.renderRange({
        name: index,
        text: text.trim(),
        value: node.value,
        min: node.min,
        max: node.max,
        step: node.step,
        unit: node.unit,
        disabled: node.disabled,
        visible: node.visible,
        validate: node.validate,
        tooltip: node.tooltip,
        monitor: node.monitor
      });
    }

    if (node.type === 'checkbox') {

      /**
       * Get checkbox
       * @type {*[]}
       */
      $element = this.renderCheckbox({
        name: index,
        text: text.trim(),
        checked: node.value,
        value: node.value,
        disabled: node.disabled,
        tooltip: node.tooltip,
        visible: node.visible,
        monitor: node.monitor
      });
    }

    if (node.type === 'textarea') {

      /**
       * Get text field
       * @type {*[]}
       */
      $element = this.renderTextArea({
        name: index,
        text: text.trim(),
        placeholder: placeholder,
        value: node.value,
        disabled: node.disabled,
        tooltip: node.tooltip,
        visible: node.visible,
        monitor: node.monitor
      });
    }

    if (node.type === 'listbox') {

      /**
       * Get text field
       * @type {*[]}
       */
      $element = this.renderListBox({
        name: index,
        text: text.trim(),
        value: node.value,
        list: node.list,
        disabled: node.disabled,
        visible: node.visible,
        tooltip: node.tooltip,
        monitor: node.monitor
      });
    }

    if (node.type === 'combobox') {

      /**
       * Define selected item
       * @type {string}
       */
      const selected = node.value;

      /**
       * Get text field
       * @type {*[]}
       */
      $element = this.renderCombobox(
          node.list,
          selected,
          text.trim(),
          index,
          undefined,
          node.visible,
          node.disabled,
          node.placeholder,
          node.store,
          node.label
      );
    }

    return $element;
  }
};