/**
 * Created by i061485 on 7/10/14.
 */

define([], function defineLabelRenderer(){

    /**
     * Define LabelRenderer
     * @class LabelRenderer
     * @constructor
     */
    var LabelRenderer = function LabelRenderer(){

    };

    return LabelRenderer.extend('LabelRenderer', {

        /**
         * Render label
         * @member LabelRenderer
         * @param {*|string} uuid
         * @param {string} text
         * @param {*|string} [type]
         * @param {boolean} [visible]
         * @returns {*|jQuery}
         */
        renderLabel: function renderLabel(uuid, text, type, visible) {

            /**
             * Parse Html
             * @type {Array}
             */
            var parse = $.parseHTML(text) || [''],
                title = parse[parse.length - 1].data || '';

            var $label = $('<label />').attr({
                'for': uuid,
                title: title.toUpperCase()
            }).addClass(type).html(text);

            if (!visible) {
                $label.hide();
            }

            return $label;
        }
    });
});