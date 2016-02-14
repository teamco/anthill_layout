/**
 * Created by teamco on 7/10/14.
 */

define([], function defineLabelRenderer() {

    /**
     * Define LabelRenderer
     * @class LabelRenderer
     * @constructor
     */
    var LabelRenderer = function LabelRenderer() {

    };

    return LabelRenderer.extend('LabelRenderer', {

        /**
         * Render label
         * @memberOf LabelRenderer
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
            var html = $.parseHTML(text) || [''];

            html = html.length ? html : [''];

            var title = html[html.length - 1].data || '';

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