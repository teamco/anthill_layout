/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([
    'plugins/rules/rules'
], function defineWidgetRules(BaseRules) {

    /**
     * Define prefs
     * @class WidgetRules
     * @extends Renderer
     * @extends BaseRules
     * @extends BaseElement
     * @constructor
     */
    var WidgetRules = function WidgetRules() {

    };

    return WidgetRules.extend('WidgetRules', {

        /**
         * Define default widget prefs
         * @type {{
         * }}
         */
        defaultPrefs: {
        },

        /**
         * Render data
         * @memberOf WidgetRules
         * @param data
         */
        renderData: function renderData(data) {
debugger
            /**
             * Define dom nodes
             * @type {Array}
             */
            var nodes = [], merge = {};

            /**
             * Merge prefs with default data
             * @type {{}}
             */
            data = $.extend(true, merge, this.defaultPrefs, data);

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Define text
                     * @type {string}
                     */
                    var text = index.toPoint().humanize();

                    /**
                     * Define node
                     * @type {*}
                     */
                    var node = data[index];

                    /**
                     * Define placeholder text
                     * @type {string}
                     */
                    var placeholder = 'Enter ' + text,
                        $element;

                    if (node.type === 'text') {

                        /**
                         * Get text field
                         * @type {*[]}
                         */
                        $element = this.renderTextField({
                            name: index,
                            text: text,
                            placeholder: placeholder,
                            value: node.value,
                            disabled: node.disabled
                        });
                    }

                    if (node.type === 'checkbox') {

                        /**
                         * Get checkbox
                         * @type {*[]}
                         */
                        $element = this.renderCheckbox({
                            name: index,
                            text: text,
                            checked: node.checked,
                            disabled: node.disabled
                        });
                    }

                    if (node.type === 'textarea') {

                        /**
                         * Get text field
                         * @type {*[]}
                         */
                        $element = this.renderTextArea({
                            name: index,
                            text: text,
                            placeholder: placeholder,
                            value: node.value,
                            disabled: node.disabled
                        });
                    }

                    nodes.push(
                        $('<li />').append($element)
                    );
                }
            }

            this.$.append(nodes);
        }

    }, BaseRules.prototype);
});