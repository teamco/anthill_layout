/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/24/15
 * Time: 7:31 PM
 */

/**
 * Created by teamco on 7/10/14.
 */

define([], function defineFilterRenderer() {

    /**
     * Define FilterRenderer
     * @class FilterRenderer
     * @extends LabelRenderer
     * @constructor
     */
    var FilterRenderer = function FilterRenderer() {

    };

    return FilterRenderer.extend('FilterRenderer', {

        /**
         * Render iframe
         * @memberOf FilterRenderer
         * @param {{
         *      text: string,
         *      name: string,
         *      placeholder: string,
         *      visible: boolean,
         *      [enter]: boolean,
         *      callback: function,
         *      [items]
         * }} opts
         * @returns {*|jQuery}
         */
        renderFilter: function renderFilter(opts) {

            // Get scope
            var scope = this.view.scope,
                filterEvent = 'keyup.' +
                    scope.name.toLowerCase() +
                    '-search';

            // Define items setter
            this.items = opts.items;

            /**
             * Define $search
             * @type {TextFieldRenderer}
             */
            var $search = this.renderTextField({
                text: opts.text,
                name: opts.name,
                placeholder: opts.placeholder,
                monitor: {
                    events: [filterEvent],
                    callback: this.filterResults.bind({
                        callback: opts.callback,
                        enter: opts.enter,
                        $element: this
                    })
                },
                visible: opts.visible
            });

            scope.logger.debug('Search field params', opts);

            /**
             * Define $reset
             * @type {*|jQuery}
             */
            var $reset = $('<div />').addClass('reset-filter').
                attr({
                    title: 'Reset filter'
                }).
                on('click.reset', function reset() {

                    /**
                     * Get $node
                     * @type {*|jQuery|HTMLElement}
                     */
                    var $node = $(this);

                    $node.prev().val('').trigger(filterEvent).focus();
                    $node.parent().removeClass('reset');
                }
            );

            $search.push($reset);

            return $search;
        },

        /**
         * Update items
         * @memberOf FilterRenderer
         * @param {{items, [focusOn]}} opts
         */
        updateData: function updateData(opts) {
            this.items = opts.items;
            this.focusOn(opts.focusOn);
        },

        /**
         * Filter search results
         * @memberOf FilterRenderer
         * @param e
         */
        filterResults: function filterResults(e) {

            e.preventDefault();

            var input = e.target,
                $parent = $(input).parent();

            $parent.addClass('reset');

            /**
             * Define $filter
             * @type {$element}
             */
            var $filter = this.$element;

            /**
             * Get item elements
             * @type {{}}
             */
            var items = $filter.items,
                index, $item,
                value = input.value,
                regex;

            /**
             * Get logger
             * @type {Logger}
             */
            var logger = $filter.view.scope.logger;

            /**
             * Define filter
             * @returns {boolean}
             * @private
             */
            function _filter() {

                for (index in items) {

                    if (items.hasOwnProperty(index)) {

                        /**
                         * Define item
                         * @type {{
                         *      name: string,
                         *      description:string,
                         *      [type]: string
                         * }}
                         */
                        $item = items[index];

                        if (value.length === 0) {

                            $item.$.removeClass('hide');

                        } else {

                            /**
                             * Define regex
                             * @type {RegExp}
                             */
                            regex = new RegExp(value, 'ig');

                            if (typeof($item.data) === 'undefined') {

                                logger.warn(
                                    'Item has no data',
                                    $item
                                );

                                return false;
                            }

                            // Define matchers
                            var nameMatch = ($item.data.name || '').match(regex),
                                typeMatch = ($item.data.type || '').match(regex),
                                descriptionMatch = ($item.data.description || '').match(regex);

                            $item.$[(
                                (nameMatch ||
                                typeMatch ||
                                descriptionMatch) ? 'remove' : 'add'
                            ) + 'Class']('hide');
                        }
                    }
                }
            }

            if (e.which === 13) {

                if (this.enter) {
                    logger.debug('Filter results on enter');
                    _filter();
                } else {
                    logger.debug('Do nothing on enter');
                    return false;
                }

            } else {

                if (e.which === 27) {
                    input.value = '';
                    $parent.removeClass('reset');
                    logger.debug('Clear results on escape');
                }

                logger.debug('Filter results');

                if (this.enter) {
                    logger.debug('Do nothing on key up');
                    return false;
                }

                _filter();
            }

            if (typeof(this.callback) === 'function') {

                // Execute callback
                this.callback();
            }
        }
    });
});