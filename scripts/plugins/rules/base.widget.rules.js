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
         * @member BaseWidgetRules
         * @type {{
         * }}
         */
        defaultRules: {
        },

        /**
         * Transfer selected value
         * @member BaseWidgetRules
         * @param {string} value
         * @private
         */
        _transferValue: function _transferValue(value) {
            this.scope.$buttons[this.button].$.attr({
                value: value
            })
        },

        /**
         * Render widget rules
         * @member BaseWidgetRules
         * @param widgetRules
         */
        renderWidgetRules: function renderWidgetRules(widgetRules) {

            /**
             * Define rules list
             * @type {Array}
             */
            var rulesList = [];

            for (var key in widgetRules) {

                if (widgetRules.hasOwnProperty(key)) {

                    rulesList.push({
                        type: 'text',
                        value: widgetRules[key]
                    });
                }
            }

            if (rulesList.length === 0) {
                this.view.scope.logger.warn('Widget has no rules', widgetRules);
                return false;
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
                    'Widget rules', {
                        type: 'click.transferValue',
                        callback: this._transferValue.bind({
                            scope: this,
                            button: 'addWidgetRule'
                        })
                    }
                )
            ).append($ul);

            this.view.button(
                ButtonElement, {
                    addWidgetRule: {
                        text: 'Subscribe',
                        $container: $ul,
                        events: {
                            click: 'addWidgetRule'
                        }
                    }
                },
                this.$buttons
            );

            this.$.append($li);
        },

        /**
         * Render content rules
         * @member BaseWidgetRules
         * @param contentRules
         */
        renderContentRules: function renderContentRules(contentRules) {

            /**
             * Define rules list
             * @type {Array}
             */
            var rulesList = [];

            for (var key in contentRules) {

                if (contentRules.hasOwnProperty(key)) {

                    rulesList.push({
                        type: 'text',
                        value: contentRules[key]
                    });
                }
            }

            if (rulesList.length === 0) {
                this.view.scope.logger.warn('Content has no rules', contentRules);
                return false;
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
                    [this.view.scope.constructor.name, 'rules'].join(' '), {
                        type: 'click.transferValue',
                        callback: this._transferValue.bind({
                            scope: this,
                            button: 'addContentRule'
                        })
                    }
                )
            ).append($ul);

            this.view.button(
                ButtonElement, {
                    addContentRule: {
                        text: 'Subscribe',
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
        },

        /**
         * Render data
         * @memberOf BaseWidgetRules
         * @param data
         * @param widgetRules
         * @param contentRules
         */
        renderData: function renderData(data, widgetRules, contentRules) {

            /**
             * Buttons collector
             * @member BaseWidgetRules
             * @type {{}}
             */
            this.$buttons = this.base.define(this.$buttons, {}, true);

            this.renderWidgetRules(widgetRules);
            this.renderContentRules(contentRules);

            /**
             * Define nodes
             * @type {Array}
             */
            var nodes = [],
                merge = {};

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