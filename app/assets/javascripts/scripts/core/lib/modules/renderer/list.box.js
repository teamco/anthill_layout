/**
 * Created by teamco on 7/10/14.
 */

define(function defineListBoxRenderer() {

    /**
     * Define ListBoxRenderer
     * @class ListBoxRenderer
     * @extends LabelRenderer
     * @extends ToolTipRenderer
     * @extends AntHill
     * @constructor
     */
    var ListBoxRenderer = function ListBoxRenderer() {
    };

    return ListBoxRenderer.extend('ListBoxRenderer', {

        /**
         * Render text field
         * @memberOf ListBoxRenderer
         * @param {{
         *      [text]: string,
         *      name: string,
         *      value,
         *      list: [],
         *      [type]: string,
         *      [style]: string,
         *      [disabled]: boolean,
         *      [monitor],
         *      [readonly],
         *      [visible]
         * }} opts
         * @returns {*[]}
         */
        renderListBox: function renderListBox(opts) {

            /**
             * Transfer resource
             * @param {Event} e
             * @private
             */
            function _onClick(e) {

                var button = e.target,
                    input = button.parentNode.nextSibling;

                if (input) {
                    input.value = button.getAttribute('data-resource');
                }

                $('button', button.parentNode).removeClass('btn-info').addClass('btn-default');
                $(button).removeClass('btn-default').addClass('btn-info')
            }

            /**
             * Define $input
             * @type {jQuery}
             */
            var $input = $('<input />').attr({
                name: opts.name,
                type: 'text',
                value: opts.value
            });

            var i = 0, l = opts.list.length,
                $list = $('<div />'),
                data, $button;

            for (; i < l; i++) {
                data = opts.list[i];
                $button = $('<button class="widget btn btn-default ' + data.resource.toClassName() + '" />');
                $button.attr({
                    type: 'button',
                    'data-resource': data.resource
                }).on('click.list', _onClick);

                if (data.tooltip) {
                    this.renderTooltip({
                        title: data.name,
                        description: data.description,
                        selector: $button
                    });
                }

                $list.append($button);

                if (opts.value === data.resource) {
                    $button.trigger('click.list');
                }
            }

            this.initMonitor($input, opts.monitor);
            this.checkVisibility($input, false);

            return [
                $list, $input
            ];
        }
    });
});