/**
 * Created by teamco on 3/19/14.
 */

/**
 * @class BasePreferencesElement
 * @type {module.BasePreferencesElement}
 */
module.exports = class BasePreferencesElement {

  /**
   * @constructor
   * @param {string} [name]
   */
  constructor(name) {

    /**
     * @property BasePreferencesElement
     * @type {string}
     */
    this.name = name || 'BasePreferencesElement';
  }

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
   * @memberOf BasePreferencesElement
   * @return {boolean}
   */
  isEvent(node) {
    return node.type === 'event';
  }

  /**
   * @memberOf BasePreferencesElement
   * @return {boolean}
   */
  isTextEditor(node) {
    return node.type === 'texteditor';
  }

  /**
   * @memberOf BasePreferencesElement
   * @return {boolean}
   */
  isTextField(node) {
    return node.type === 'text';
  }

  /**
   * @memberOf BasePreferencesElement
   * @return {boolean}
   */
  isTextAreaField(node) {
    return node.type === 'textarea';
  }

  /**
   * @memberOf BasePreferencesElement
   * @return {boolean}
   */
  isNumberField(node) {
    return node.type === 'number';
  }

  /**
   * @memberOf BasePreferencesElement
   * @return {boolean}
   */
  isRangeField(node) {
    return node.type === 'range';
  }

  /**
   * @memberOf BasePreferencesElement
   * @return {boolean}
   */
  isListBoxField(node) {
    return node.type === 'listbox';
  }

  /**
   * @memberOf BasePreferencesElement
   * @return {boolean}
   */
  isCheckBoxField(node) {
    return node.type === 'checkbox';
  }

  /**
   * @memberOf BasePreferencesElement
   * @return {boolean}
   */
  isComboBoxField(node) {
    return node.type === 'combobox';
  }

  /**
   * @memberOf BasePreferencesElement
   * @param text
   * @param node
   * @param index
   * @return {*}
   */
  eventLink(text, index, node) {
    return this.get$item().renderEventLink({
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

  /**
   * @memberOf BasePreferencesElement
   * @param text
   * @param node
   * @param index
   * @return {*}
   */
  textEditor(text, index, node) {
    return this.get$item().renderTextEditor({
      name: index,
      text: text.trim(),
      placeholder: node.placeholder || 'Enter ' + text,
      value: node.value,
      disabled: node.disabled,
      visible: node.visible,
      validate: node.validate,
      tooltip: node.tooltip,
      monitor: node.monitor
    });
  }

  /**
   * @memberOf BasePreferencesElement
   * @param text
   * @param index
   * @param node
   * @return {module.TextFieldRenderer}
   */
  textField(text, index, node) {
    return this.get$item().renderTextField({
      name: index,
      text: text.trim(),
      placeholder: node.placeholder || 'Enter ' + text,
      value: node.value,
      disabled: node.disabled,
      visible: node.visible,
      validate: node.validate,
      tooltip: node.tooltip,
      monitor: node.monitor
    });
  }

  /**
   * @memberOf BasePreferencesElement
   * @param text
   * @param index
   * @param node
   * @return {*|*[]}
   */
  numberField(text, index, node) {
    return this.get$item().renderNumberField({
      name: index,
      text: text.trim(),
      placeholder: node.placeholder || 'Enter ' + text,
      value: node.value,
      disabled: node.disabled,
      visible: node.visible,
      tooltip: node.tooltip,
      validate: node.validate,
      monitor: node.monitor
    });
  }

  /**
   * @memberOf BasePreferencesElement
   * @param text
   * @param index
   * @param node
   * @return {*|*[]}
   */
  rangeField(text, index, node) {
    return this.get$item().renderRange({
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

  /**
   * @memberOf BasePreferencesElement
   * @param text
   * @param index
   * @param node
   * @return {*}
   */
  checkBoxField(text, index, node) {
    return this.get$item().renderCheckbox({
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

  /**
   * @memberOf BasePreferencesElement
   * @param text
   * @param index
   * @param node
   * @return {*|*[]}
   */
  textAreaField(text, index, node) {
    return this.get$item().renderTextArea({
      name: index,
      text: text.trim(),
      placeholder: node.placeholder || 'Enter ' + text,
      value: node.value,
      disabled: node.disabled,
      tooltip: node.tooltip,
      visible: node.visible,
      monitor: node.monitor
    });
  }

  /**
   * @memberOf BasePreferencesElement
   * @param text
   * @param index
   * @param node
   * @return {*|*[]}
   */
  listBoxField(text, index, node) {
    return this.get$item().renderListBox({
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

  /**
   * @memberOf BasePreferencesElement
   * @param text
   * @param index
   * @param node
   * @return {*}
   */
  comboBoxField(text, index, node) {
    return this.get$item().renderCombobox(
        node.list,
        node.value,
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

  /**
   * Get node renderer
   * @memberOf BasePreferencesElement
   * @param view
   * @param node
   * @param {string} text
   * @param {string} index
   * @returns {*}
   */
  getNodeRenderer(view, node, text, index) {
    if (this.isEvent(node)) return this.eventLink.call(view, text, index, node);
    if (this.isTextEditor(node)) return this.textEditor.call(view, text, index, node);
    if (this.isTextField(node)) return this.textField.call(view, text, index, node);
    if (this.isTextAreaField(node)) return this.textAreaField.call(view, text, index, node);
    if (this.isNumberField(node)) return this.numberField.call(view, text, index, node);
    if (this.isRangeField(node)) return this.rangeField.call(view, text, index, node);
    if (this.isCheckBoxField(node)) return this.checkBoxField.call(view, text, index, node);
    if (this.isListBoxField(node)) return this.listBoxField.call(view, text, index, node);
    if (this.isComboBoxField(node)) return this.comboBoxField.call(view, text, index, node);
  }
};