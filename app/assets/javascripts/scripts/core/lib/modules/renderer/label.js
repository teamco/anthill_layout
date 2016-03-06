/**
 * Created by teamco on 7/10/14.
 */

define(function defineLabelRenderer() {

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

            var $label = $('<span />').attr({
                id: uuid,
                title: title.toUpperCase()
            }).addClass(type + ' input-group-addon').html(text);

            if (!visible) {
                $label.hide();
            }

            return $label;
        }
    });
});