/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/rules/base.widget.rules'
], function defineYoutubeRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Youtube Rules Element
     * @param view
     * @param opts
     * @returns {YoutubeRulesElement}
     * @constructor
     * @class YoutubeRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var YoutubeRulesElement = function YoutubeRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(
            opts.data,
            opts.rules.widget,
            opts.rules.content
        );

        return this;
    };

    return YoutubeRulesElement.extend('YoutubeRulesElement', {

        /**
         * Add new rule
         * @member YoutubeRulesElement
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
            var $ul = $('div.html ul.add-rules', $container);

            if ($ul.length === 0) {

                /**
                 * Set $ul
                 * @type {*|jQuery}
                 */
                $ul = $('<ul />').addClass('add-rules');

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

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});