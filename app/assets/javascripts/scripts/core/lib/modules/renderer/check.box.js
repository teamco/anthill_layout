/**
 * Created by teamco on 7/10/14.
 */

define(function defineCheckBoxRenderer() {

    /**
     * Define CheckBoxRenderer
     * @class CheckBoxRenderer
     * @extends LabelRenderer
     * @extends AntHill
     * @constructor
     */
    var CheckBoxRenderer = function CheckBoxRenderer() {
    };

    return CheckBoxRenderer.extend('CheckBoxRenderer', {

        /**
         * Render checkbox
         * @memberOf CheckBoxRenderer
         * @param {{
         *      text: string,
         *      name: string,
         *      value,
         *      [checked]: boolean,
         *      [disabled]: boolean,
         *      [monitor],
         *      [visible]
         * }} opts
         * @returns {*}
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
             * @type {Object}
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

            this.initMonitor($input, opts.monitor);
            this.checkVisibility($input, opts.visible);

            var $template = $([
                '<div class="input-group">',
                '<span class="input-group-addon"></span>',
                '<input type="text" class="form-control" disabled="disabled" value="', opts.text, '">',
                '</div>'
            ].join(''));

            $template.find('.input-group-addon').append($input);

            return $template;
        }
    });
});