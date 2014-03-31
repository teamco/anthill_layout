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
                        text: 'Publish',
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
                        text: 'Publish',
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
         * Render subscribe rules
         * @member BaseWidgetRules
         * @param subscribe
         */
        renderSubscribeRules: function renderSubscribeRules(subscribe) {

            /**
             * Get published rules
             * @type {{}}
             */
            var published = this.view.controller.getPublishedRules();

            if (this.base.lib.hash.hashLength(published) === 0) {
                this.view.scope.logger.warn('Empty published events', published);
                return false;
            }

            /**
             * Set $ul
             * @type {*|jQuery}
             */
            var $ul = $('<ul />').addClass('subscribe-rules');

            /**
             * Define title
             * @type {string}
             */
            var title = 'Subscribe events';

            /**
             * Define fieldset
             * @type {*|jQuery}
             */
            var $node = $('<li />').append(
                $('<fieldset />').append([
                    $('<legend />').text(title).
                        on('click.toggle', this.toggleFieldset).attr({
                            title: title
                        }),
                    $ul
                ])
            );

            for (var index in published) {

                if (published.hasOwnProperty(index)) {

                    var $inner = $('<ul />'),
                        rulesList = this.base.define(
                            published[index].rules, {}, true
                        ),
                        checkedRulesList = this.base.define(
                            subscribe[index], {}, true
                        );

                    for (var type in rulesList) {

                        if (rulesList.hasOwnProperty(type)) {

                            var rules = rulesList[type],
                                checked = checkedRulesList[type] || [];

                            for (var i = 0, l = rules.length; i < l; i++) {

                                $inner.append(
                                    $('<li />').append(
                                        this.renderCheckbox({
                                            name: [type, rules[i]].join(':'),
                                            text: [
                                                '<span>', type, '</span>: ',
                                                rules[i]
                                            ].join(''),
                                            checked: $.inArray(rules[i], checked) !== -1,
                                            disabled: false
                                        })
                                    )
                                );
                            }
                        }
                    }

                    $('<li />').append(
                        $('<fieldset />').append([
                            $('<legend />').text(published[index].type).
                                on('click.toggle', this.toggleFieldset).attr({
                                    title: index
                                }),
                            $inner
                        ])
                    ).appendTo($ul);
                }
            }

            this.$.append(
                $('<li />').append($node)
            );
        },

        /**
         * Render data
         * @member BaseWidgetRules
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

            this.renderSubscribeRules(data.subscribe);
        },

        /**
         * Add new rule
         * @member BaseWidgetRules
         * @param {string} rule
         * @param {string} type
         * @param $container
         * @returns {boolean}
         */
        addRule: function addRule(rule, type, $container) {

            /**
             * Get $ul
             * @type {*|jQuery|HTMLElement}
             */
            var $ul = $('div.html ul.publish-rules', $container);

            if ($ul.length === 0) {

                /**
                 * Set $ul
                 * @type {*|jQuery}
                 */
                $ul = $('<ul />').addClass('publish-rules');

                /**
                 * Define title
                 * @type {string}
                 */
                var title = 'Published events';

                $('div.html', $container).append(
                    $('<fieldset />').append([
                        $('<legend />').text(title).
                            on('click.toggle', this.toggleFieldset).attr({
                                title: title
                            }),
                        $ul
                    ])
                );
            }

            if (!this.base.isDefined(rule)) {
                this.view.scope.logger.warn('Select rule');
                return false;
            }

            /**
             * Set value
             * @type {string}
             */
            var value = [type.toLowerCase(), rule].join(':');

            if ($('li[value="' + value + '"]', $ul).length > 0) {
                this.view.scope.logger.warn('Duplicate rule', value);
                return false;
            }

            $ul.append(
                $('<li />').attr({
                    value: value
                }).append([
                    $('<span />').text(type + ': '),
                    rule
                ])
            );
        }

    }, BaseRules.prototype);
});