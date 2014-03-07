/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([], function defineBasePreferences() {

    var Preferences = function Preferences() {

    };

    return Preferences.extend({

        /**
         * Render data
         * @param data
         */
        renderData: function renderData(data) {

            /**
             * Define dom nodes
             * @type {Array}
             */
            var nodes = [];

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Get text field
                     * @type {*[]}
                     */
                    var textField = this.renderTextField({
                        name: index,
                        text: index,
                        placeholder: 'Enter ' + index,
                        value: data[index]
                    });

                    nodes.push(
                        $('<li />').append(textField)
                    );
                }
            }

            this.$.append(
                this.renderInteractions(nodes)
            );
        },

        /**
         * Render Interactions
         * @param {Array} nodes
         * @returns {*}
         */
        renderInteractions: function renderInteractions(nodes) {

            /**
             * Define interactions container
             * @type {*|jQuery}
             */
            var $ul = $('<ul />').addClass('interactions');

            nodes.push(
                $('<li />').append(
                    $('<fieldset />').append(
                        $('<legend />').text('Interactions').
                            on('click.toggle', function click() {

                                /**
                                 * Define $li
                                 * @type {*|jQuery|HTMLElement}
                                 */
                                var $li = $(this);

                                $li.hasClass('open') ?
                                    $li.removeClass('open') :
                                    $li.addClass('open');
                            }).attr({
                                title: 'Interactions'
                            }),

                        $ul.append([
                            this.renderPrefs('Cell', 0),
                            this.renderPrefs('Row', 0),
                            this.renderPrefs('Width', 0),
                            this.renderPrefs('Height', 0)
                        ])
                    )
                )
            );

            return nodes;
        },

        /**
         * Render move
         * @param {string} side
         * @param value
         * @returns {*|jQuery}
         */
        renderPrefs: function renderPrefs(side, value) {

            /**
             * Define move
             * @type {*[]}
             */
            var $move = this.renderTextField({
                name: side.toLowerCase(),
                text: side,
                placeholder: side,
                value: value
            });

            return $('<li />').append($move);
        },

        renderResize: function renderResize() {

        }

    });

});