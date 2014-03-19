/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([], function defineBasePreferences() {

    /**
     * Define prefs
     * @class PagesPreferences
     * @extends Renderer
     * @constructor
     */
    var PagesPreferences = function PagesPreferences() {

    };

    return PagesPreferences.extend('PagesPreferences', {

        /**
         * Render data
         * @memberOf PagesPreferences
         * @param opts
         */
        renderData: function renderData(opts) {

            /**
             * Define dom nodes
             * @type {Array}
             */
            var nodes = [];

            for (var index in opts.data) {

                if (opts.data.hasOwnProperty(index)) {

                    /**
                     * Get text field
                     * @type {*[]}
                     */
                    var textField = this.renderTextField({
                        name: index,
                        text: index,
                        placeholder: 'Enter ' + index,
                        value: opts.data[index]
                    });

                    nodes.push(
                        $('<li />').append(textField)
                    );
                }
            }

            this.$.append(
                this.renderLayoutPrefs(opts.page, nodes)
            );
        },

        /**
         * Render Layout prefs
         * @member PagesPreferences
         * @param {Page} page
         * @param {Array} nodes
         * @returns {*}
         */
        renderLayoutPrefs: function renderLayoutPrefs(page, nodes) {

            /**
             * Define layout
             * @type {Layout}
             */
            var layout = page.controller.getLayout(),
                cname = layout.constructor.name;

            /**
             * Define interactions container
             * @type {*|jQuery}
             */
            var $ul = $('<ul />').addClass('layout-prefs');

            /**
             * Define dom prefs
             */
            var cellWidth = layout.controller.minCellWidth();

            nodes.push(
                $('<li />').append(
                    $('<fieldset />').append(
                        $('<legend />').text(cname).
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
                                title: cname
                            }),

                        $ul.append([
                            $('<li />').append(
                                this.renderTextField({
                                    name: 'cell',
                                    text: 'Cell size (px)',
                                    value: cellWidth,
                                    disabled: true
                                })
                            )
                        ])
                    )
                )
            );

            return nodes;
        }

    });
});