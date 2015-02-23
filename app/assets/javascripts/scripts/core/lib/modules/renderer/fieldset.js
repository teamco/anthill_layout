/**
 * Created by i061485 on 7/10/14.
 */

define([], function defineFieldSetRenderer() {

    /**
     * Define FieldSetRenderer
     * @class FieldSetRenderer
     * @constructor
     */
    var FieldSetRenderer = function FieldSetRenderer() {

    };

    return FieldSetRenderer.extend('FieldSetRenderer', {

        /**
         * Render fieldset
         * @member FieldSetRenderer
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
                $container: $legend
            });

            return $fieldset;
        }
    });
});