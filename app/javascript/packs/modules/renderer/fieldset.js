/**
 * Created by teamco on 7/10/14.
 */

/**
 * @class FieldSetRenderer
 * @type {FieldSetRenderer}
 */
export class FieldSetRenderer {

  /**
   * @static
   * @param $element
   * @return {boolean}
   */
  static isOpenedFieldSet($element) {
    return $element.hasClass('open');
  }

  /**
   * @static
   * @param $element
   * @param {string} type
   */
  static handleCaret($element, type) {
    $element.find('svg').hide();
    $element.find(`svg.fa-caret-window.${type}`).show().removeClass('d-none');
  }

  /**
   * @static
   * @param $element
   */
  static openFieldSet($element) {
    $element.addClass('open');
    FieldSetRenderer.handleCaret($element, 'up');
  }

  /**
   * @static
   * @param $element
   */
  static closeFieldSet($element) {
    $element.removeClass('open');
    FieldSetRenderer.handleCaret($element, 'down');
  }

  /**
   * Toggle fieldset
   * @memberOf FieldSetRenderer
   * @param {Event} e
   */
  toggleFieldset(e) {

    /**
     * Define $li
     * @type {jQuery}
     */
    const $li = window.$(e.target);

    FieldSetRenderer.isOpenedFieldSet($li) ?
        FieldSetRenderer.closeFieldSet($li) :
        FieldSetRenderer.openFieldSet($li);

    if (this.adoptModalDialogPosition) {
      this.adoptModalDialogPosition();
    }
  }

  /**
   * Render fieldset
   * @memberOf FieldSetRenderer
   * @param {string} text
   * @param {*} $content
   * @param {boolean} [open]
   * @returns {*|jQuery}
   */
  renderFieldSet(text, $content, open) {
    const $legend = window.$('<legend />').html(text).on('click.toggle', this.toggleFieldset.bind(this));
    const $fieldset = window.$('<fieldset />').append($legend, $content);

    if (open) {
      FieldSetRenderer.openFieldSet($legend);
    }

    this.renderTooltip({
      title: window.$('<div />').html(text).text(),
      selector: $legend
    });

    return $fieldset;
  }
}