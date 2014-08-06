/**
 * Created by i061485 on 7/10/14.
 */

define([], function defineCheckBoxRenderer(){

    /**
     * Define CheckBoxRenderer
     * @class CheckBoxRenderer
     * @extends LabelRenderer
     * @constructor
     */
    var CheckBoxRenderer = function CheckBoxRenderer(){

    };

    return CheckBoxRenderer.extend('CheckBoxRenderer', {

        /**
         * Render checkbox
         * @member CheckBoxRenderer
         * @param {{text: string, name: string, value, [checked]: boolean, [disabled]: boolean, [monitor]}} opts
         * @returns {*[]}
         */
        renderCheckbox: function renderCheckbox(opts) {

            /**
             * Create UUID
             * @type {String}
             */
            var uuid = this.base.lib.generator.UUID() + '-checkbox',
                checked = this.base.defineBoolean(opts.checked, false, true);

            /**
             * Define $input
             * @type {*|jQuery}
             */
            var $input = $('<input />').attr({
                name: opts.name,
                type: 'checkbox',
                id: uuid,
                title: opts.value,
                checked: checked,
                disabled: this.base.defineBoolean(opts.disabled, false, true)
            }).val(opts.value);

            $input.prop(
                'checked',
                checked
            );

            if (opts.monitor) {

                $input.on(
                    opts.monitor.events.join(','),
                    opts.monitor.callback
                );
            }

            if (!opts.visible) {
                $input.hide();
            }

            return [
                $input,
                this.renderLabel(uuid, opts.text, 'text', opts.visible)
            ];
        }
    });
});