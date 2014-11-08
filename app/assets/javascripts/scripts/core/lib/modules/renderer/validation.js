/**
 * Created by i061485 on 10/30/14.
 */

define([
    'jquery'
], function defineTextFieldRenderer($) {

    /**
     * Define ValidationRenderer
     * @class ValidationRenderer
     * @constructor
     */
    var ValidationRenderer = function ValidationRenderer() {

    };

    return ValidationRenderer.extend('ValidationRenderer', {

        /**
         * Define validation
         * @param $input
         * @param opts
         */
        validateByMask: function validateByMask($input, opts) {

            /**
             * Validate mask
             * @param value
             * @returns {opts.validate.mask|*|Array|{index: number, input: string}}
             * @private
             */
            function _checkMask(value) {

                /**
                 * Get mask
                 * @type {Array|RegExp}
                 */
                var mask = opts.validate.mask,
                    i = 0, match = [];

                if (typeof (mask) === 'undefined') return true;

                if (Object.prototype.toString.call(mask) !== '[object Array]') {
                    mask = [mask];
                }

                for (i = 0; i < mask.length; i++) {
                    match.push(!!value.match(mask[i]))
                }

                return (new Function([
                    'return ',
                    match.join('||'),
                    ';'
                ].join('')))();
            }

            /**
             * Validate empty
             * @param value
             * @returns {boolean}
             * @private
             */
            function _checkEmpty(value) {
                if (typeof(opts.validate.blank) === 'undefined') return true;
                return $.trim(value.length) > 0;
            }

            if (typeof(opts.validate) === 'object') {

                /**
                 * Add message container
                 * @type {*|jQuery}
                 */
                var $span = $('<span class="validate" />').
                    text('The «' + opts.text + '» you entered is not valid');

                $input.focusout(function focusOut() {

                    /**
                     * Get value
                     * @type {string}
                     */
                    var value = $input.val();

                    $input.addClass('validate');
                    $input.after($span);

                    if (_checkMask(value) && _checkEmpty(value)) {

                        $input.removeClass('validate');
                        $span.remove();
                    }
                });
            }
        }
    });
});
