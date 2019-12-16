/**
 * Created by teamco on 7/10/14.
 */

/**
 * @class LabelRenderer
 * @type {LabelRenderer}
 */
export class LabelRenderer {

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
    let html = window.$.parseHTML(text) || [''];

    html = html.length ? html : [''];

    const title = html[html.length - 1].data || '';

    if (visible) {
      if (!(text || '').length) {
        visible = false;
      }
    }
    const $template = window.$(`
      <div class="input-group-prepend${visible ? '' : ' d-none'}">
        <span class="${type} input-group-text" id="${uuid}" title="${title.toUpperCase()}"></span>
      </div>`);

    $template.find('span').html(text);
    return $template;
  }
}
