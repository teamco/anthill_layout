/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([
    'plugins/rules/rules',
    'element/button.element'
], function defineBaseWidgetRules(BaseRules, ButtonElement) {

    /**
     * Define rules
     * @class BaseWidgetRules
     * @extends Renderer
     * @extends BaseRules
     * @extends BaseElement
     * @constructor
     */
    var BaseWidgetRules = function BaseWidgetRules() {

        /**
         * Buttons collector
         * @member BaseWidgetRules
         * @type {{}}
         */
        this.$buttons = {};
    };

    return BaseWidgetRules.extend('BaseWidgetRules', {

        /**
         * Define default widget rules
         * @type {{
         * }}
         */
        defaultRules: {
        },

        /**
         * Render data
         * @memberOf BaseWidgetRules
         * @param data
         * @param rules
         */
        renderData: function renderData(data, rules) {

            /**
             * Buttons collector
             * @member BaseWidgetRules
             * @type {{}}
             */
            this.$buttons = this.base.define(this.$buttons, {}, true);

            /**
             * Define nodes
             * @type {Array}
             */
            var nodes = [],
                merge = {};

            var rulesList = [];

            for (var key in rules) {

                if (rules.hasOwnProperty(key)) {

                    rulesList.push({
                        type: 'text',
                        value: rules[key]
                    });
                }
            }

            rulesList.sort(
                function sortByValue(a, b) {
                    return a.value.localeCompare(b.value);
                }
            );

            var $li = $('<li />'),
                $ul = $('<ul />').addClass('button-add-rules');

            $li.append(
                this.renderCombobox(
                    rulesList,
                    rulesList[0].value,
                    'Publish on'
                )
            ).append($ul);

            this.view.button(
                ButtonElement, {
                    addRule: {
                        text: 'Add Rule',
                        $container: $ul,
                        events: {
                            click: [
                                'add',
                                this.view.scope.constructor.name,
                                'Rule'
                            ].join('')
                        }
                    }
                },
                this.$buttons
            );

            this.$.append($li);


            /**
             * Merge rules with default data
             * @type {{}}
             */
            data = $.extend(true, merge, this.defaultRules, data);

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