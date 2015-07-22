/**
 * Created by teamco on 7/10/14.
 */
define(['tinyMCE'], function defineTextEditorRenderer(tinyMCE) {

    /**
     * Define TextEditorRenderer
     * @class TextEditorRenderer
     * @extends LabelRenderer
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
         *      value,
         *      [monitor],
         *      [disabled]: boolean,
         *      [validate]: {mask: RegExp, blank: boolean}
         * }} opts
         * @returns {*[]}
         */
        renderTextEditor: function renderTextEditor(opts) {

            /**
             * Create UUID
             * @type {String}
             */
            var uuid = this.base.lib.generator.UUID() + '-textarea',
                $input;

            if (this.base.defineBoolean(opts.disabled, false, true)) {

                /**
                 * Define $input
                 * @type {*|jQuery}
                 */
                $input = $('<p />').attr({
                    name: opts.name,
                    id: uuid,
                    title: opts.value
                }).addClass('textarea').text(opts.value);

            } else {

                /**
                 * Define $input
                 * @type {*|jQuery}
                 */
                $input = $('<textarea />').attr({
                    name: opts.name,
                    id: uuid,
                    placeholder: opts.placeholder,
                    title: opts.value
                }).addClass('editor').val(opts.value);
            }

            $input.on('focus.tinymce', function init() {

                tinyMCE.init({
                    selector: 'textarea#' + uuid,
                    init_instance_callback: this.afterInitTinyMce.bind(this),
                    setup: function setup(editor) {

                        this.initMonitor(editor, opts.monitor);

                    }.bind(this)
                });

            }.bind(this));

            this.checkVisibility($input, opts.visible);
            this.validateByMask($input, opts);

            return [
                this.renderLabel(uuid, opts.text, 'textarea', opts.visible),
                $input
            ];
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