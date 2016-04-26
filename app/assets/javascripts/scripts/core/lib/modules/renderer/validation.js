/**
 * Created by teamco on 10/30/14.
 */

define(function defineTextFieldRenderer() {

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

            opts.validate = opts.validate || {};

            /**
             * Validate mask
             * @param value
             * @returns {opts.validate.mask|*|Array|{index: number, input: string}}
             * @private
             */
            function _checkMask(value) {

                /**
                 * Get mask
                 * @type {Array|RegExp|number}
                 */
                var mask = opts.validate.mask,
                    i = 0, match = [];

                if (_.isUndefined(mask)) return true;

                if (Object.prototype.toString.call(mask) !== '[object Array]') {
                    mask = [mask];
                }

                for (i; i < mask.length; i++) {
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
                if (typeof opts.validate.blank === 'undefined') {
                    return true;
                }
                return opts.validate.blank ?
                    true : !!$.trim(value).length;
            }

            /**
             * Add message container
             * @type {*|jQuery}
             */
            var $span = $('<span class="validate" />').text(
                'The «' + opts.text + '» you entered is not valid'
            );

            /**
             * Show error
             * @private
             */
            function _showError() {
                $input.addClass('validate');
                $input.after($span);
            }

            /**
             * Hide error
             * @private
             */
            function _hideError() {
                $input.removeClass('validate');
                $span.remove();
            }

            $input.focusout(function focusOut() {

                /**
                 * Get value
                 * @type {string}
                 */
                var value = $input.val();

                _showError();

                if (_checkMask(value) && _checkEmpty(value)) _hideError();
            });
        }
    });
});
