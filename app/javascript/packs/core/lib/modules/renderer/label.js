/**
 * Created by teamco on 7/10/14.
 */

/**
 * @class LabelRenderer
 * @type {module.LabelRenderer}
 */
module.exports = class LabelRenderer {

  /**
   * Render label
   * @memberOf LabelRenderer
   * @param {*|string} uuid
   * @param {string} text
   * @param {*|string} [type]
   * @param {boolean} [visible]
   * @returns {*|jQuery}
   */
  renderLabel(uuid, text, type, visible) {

    /**
     * Parse Html
     * @type {Array}
     */
    let html = $.parseHTML(text) || [''];

    html = html.length ? html : [''];

    const title = html[html.length - 1].data || '';

    const $label = $('<span />').attr({
      id: uuid,
      title: title.toUpperCase()
    }).addClass(type + ' input-group-addon').html(text);

    if (!visible) {
      $label.hide();
    }

    return $label;
  }
};
