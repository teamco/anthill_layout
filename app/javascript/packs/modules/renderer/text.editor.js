/**
 * Created by teamco on 7/10/14.
 */

export class TextEditorRenderer {

  /**
   * Render text area
   * @memberOf TextEditorRenderer
   * @param {{
   *  text: string,
   *  name: string,
   *  [placeholder]: string,
   *  [tooltip]: string,
   *  value,
   *  [monitor],
   *  [visible],
   *  [mask],
   *  [disabled]: boolean,
   *  [validate]: {mask: RegExp, blank: boolean}
   * }} opts
   * @returns {*}
   */
  renderTextEditor(opts) {

    /**
     * @constant tinyMCE
     * @type {Bw}
     */
    const tinyMCE = require('tinymce/tinymce.min');

    /**
     * Get $element
     * @type {TextEditorRenderer}
     */
    const scope = this;
    let $input;

    if (this.view.utils.setBoolean(opts.disabled, false)) {

      /**
       * Define $input
       * @type {*|jQuery}
       */
      $input = this.renderTextArea({
        name: opts.name,
        text: opts.text,
        value: opts.value,
        disabled: opts.disabled,
        visible: opts.visible
      });

    } else {

      /**
       * Define $input
       * @type {*|jQuery}
       */
      $input = this.renderTextArea({
        name: opts.name,
        text: opts.text,
        style: 'editor',
        value: opts.value,
        placeholder: opts.placeholder,
        disabled: opts.disabled,
        visible: opts.visible,
        monitor: {
          events: ['focus.tinymce'],
          _initTinyMCE() {
            tinyMCE.init({
              selector: '#' + this.id,
              init_instance_callback: scope.afterInitTinyMce.bind(scope),
              setup(editor) {
                scope.initMonitor(editor, opts.monitor);
              }
            });
          }
        }
      });
    }

    const $textarea = $input[1];

    scope.checkVisibility($textarea, opts.visible);
    scope.validateByMask($textarea, opts);

    /**
     * Get tooltip
     * @type {string|*}
     */
    const tooltip = opts.tooltip;

    if (tooltip) {
      this.renderTooltip({
        title: opts.text.humanize(),
        description: opts.tooltip,
        selector: $input
      });
    }

    return $input;
  }

  /**
   * Define after init tinyMce callback
   * @memberOf TextEditorRenderer
   */
  afterInitTinyMce(editor) {
    this.view.scope.logger.debug('TinyMCE initialized', arguments, editor);

    /**
     * Get referrer (opener)
     * @type {*}
     */
    const referrer = this.view.scope.referrer;

    /**
     * Get $modal
     * @type {ModalElement}
     */
    const $modal = referrer.view.elements.$modal;

    if ($modal) {
      this.setPosition({
        $container: $modal.$container,
        $item: $modal.$,
        position: $modal.position
      });
    }
  }
}