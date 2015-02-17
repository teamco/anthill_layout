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

            var $legend = $('<legend />').html(text).
                on('click.toggle', this.toggleFieldset.bind(this)).attr({
                    title: text
                }
            );

            if (open) {
                $legend.addClass('open');
            }

            return $('<fieldset />').append(
                $legend,
                $content
            );
        }
    });
});