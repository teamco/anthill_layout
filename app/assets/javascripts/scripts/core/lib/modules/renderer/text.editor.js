/**
 * Created by teamco on 7/10/14.
 */
define(['tinyMCE'], function defineTextEditorRenderer(tinyMCE) {

    /**
     * Define TextEditorRenderer
     * @class TextEditorRenderer
     * @extends LabelRenderer
     * @extends TextAreaRenderer
     * @extends ToolTipRenderer
     * @extends BaseElement
     * @constructor
     */
    var TextEditorRenderer = function TextEditorRenderer() {
    };

    return TextEditorRenderer.extend('TextEditorRenderer', {

        /**
         * Render text area
         * @memberOf TextEditorRenderer
         * @param {{
         *      text: string,
         *      name: string,
         *      [placeholder]: string,
         *      [tooltip]: string,
         *      value,
         *      [monitor],
         *      [visible],
         *      [mask],
         *      [disabled]: boolean,
         *      [validate]: {mask: RegExp, blank: boolean}
         * }} opts
         * @returns {*}
         */
        renderTextEditor: function renderTextEditor(opts) {

            /**
             * Create UUID
             * @type {String}
             */
            var uuid = this.base.lib.generator.UUID() + '-tinymce-content',
                $input;

            /**
             * Get $element
             * @type {TextEditorRenderer}
             */
            var scope = this;

            if (this.base.defineBoolean(opts.disabled, false, true)) {

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
                        callback: function _initTinyMCE() {
                            tinyMCE.init({
                                selector: '#' + this.id,
                                init_instance_callback: scope.afterInitTinyMce.bind(scope),
                                setup: function setup(editor) {
                                    scope.initMonitor(editor, opts.monitor);
                                }
                            });
                        }
                    }
                });
            }

            var $textarea = $input[1];

            scope.checkVisibility($textarea, opts.visible);
            scope.validateByMask($textarea, opts);

            /**
             * Get tooltip
             * @type {string|*}
             */
            var tooltip = opts.tooltip;

            if (tooltip) {
                this.renderTooltip({
                    title: opts.text.humanize(),
                    description: opts.tooltip,
                    selector: $input
                });
            }

            return $input;
        },

        /**
         * Define after init tinyMce callback
         * @memberOf TextEditorRenderer
         */
        afterInitTinyMce: function afterInitTinyMce(editor) {

            this.view.scope.logger.debug('TinyMCE initialized', arguments);

            /**
             * Get referrer (opener)
             * @type {*}
             */
            var referrer = this.view.scope.referrer;

            /**
             * Get $modal
             * @type {ModalElement}
             */
            var $modal = referrer.view.elements.$modal;

            if ($modal) {
                this.setPosition({
                    $container: $modal.$container,
                    $item: $modal.$,
                    position: $modal.position
                });
            }
        }
    });
});