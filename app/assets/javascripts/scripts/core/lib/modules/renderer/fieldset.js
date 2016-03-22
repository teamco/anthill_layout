/**
 * Created by teamco on 7/10/14.
 */

define(function defineFieldSetRenderer() {

    /**
     * Define FieldSetRenderer
     * @class FieldSetRenderer
     * @extends ModalElement
     * @constructor
     */
    var FieldSetRenderer = function FieldSetRenderer() {
    };

    return FieldSetRenderer.extend('FieldSetRenderer', {

        /**
         * Toggle fieldset
         * @memberOf FieldSetRenderer
         * @param e
         */
        toggleFieldset: function toggleFieldset(e) {

            /**
             * Define $li
             * @type {*|jQuery|HTMLElement}
             */
            var $li = $(e.target);

            $li.hasClass('open') ?
                $li.removeClass('open') :
                $li.addClass('open');

            if (_.isFunction(this.adoptModalDialogPosition)) {
                this.adoptModalDialogPosition();
            }
        },

        /**
         * Render fieldset
         * @memberOf FieldSetRenderer
         * @param {string} text
         * @param {*} $content
         * @param {boolean} [open]
         * @returns {*|jQuery}
         */
        renderFieldSet: function renderFieldSet(text, $content, open) {

            var $legend = {
                $: $('<legend />').html(text).
                    on('click.toggle', this.toggleFieldset.bind(this))
            };

            if (open) {
                $legend.$.addClass('open');
            }

            var $fieldset = $('<fieldset />').append(
                $legend.$,
                $content
            );

            this.renderTooltip({
                title: $('<div />').html(text).text(),
                selector: $legend.$
            });

            return $fieldset;
        }
    });
});