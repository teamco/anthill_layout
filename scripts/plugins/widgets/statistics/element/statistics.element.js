/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineStatisticsElement(BaseElement) {

    /**
     * Define Statistics Element
     * @param view
     * @param opts
     * @returns {StatisticsElement}
     * @constructor
     * @class StatisticsElement
     * @extends BaseElement
     */
    var StatisticsElement = function StatisticsElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('statistics', {resource: '/widgets'});

        this.renderStatsTable();

        this.$.append(
            this.$table
        );

        return this;
    };


    return StatisticsElement.extend('StatisticsElement', {

            /**
             * Render Embedded content
             * @member StatisticsElement
             * @param {string} text
             */
            renderEmbeddedContent: function renderEmbeddedContent(text) {

                require([
                    'plugins/widgets/statistics/lib/highcharts'
                ], function defineChart() {

                    require([
                        'plugins/widgets/statistics/lib/data'
                    ], function defineChartData() {

                        $('#container').highcharts({
                            data: {
                                table: document.getElementById('datatable')
                            },
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Analyzing User Experience'
                            },
                            yAxis: {
                                allowDecimals: false,
                                title: {
                                    text: 'Remaining Users'
                                }
                            },
                            tooltip: {
                                formatter: function () {
                                    return '<b>' + this.series.name + '</b><br/>' +
                                        this.point.y + ' ' + this.point.name.toLowerCase();
                                }
                            }
                        });
                    });

                });
            },

            /**
             * Render Statistics Table
             */
            renderStatsTable: function renderStatsTable() {
                this.$.css('background','white');

                this.$head = $('<thead />').append(
                    this.renderStatsCell([
                        '<th></th>',
                        '<th>Athletics</th>',
                        '<th>Marshals</th>',
                        '<th>Women</th>'
                    ])
                );

                this.$body = $('<tbody />');

                this.$table = $('<table />').attr({
                    id: 'datatable'
                }).append([
                    this.$head,
                    this.$body.append(
                        this.renderStatsCell([
                            '<th>Homepage</th>',
                            '<th>100</th>',
                            '<th>100</th>',
                            '<th>100</th>'

                        ])
                    ).append(
                        this.renderStatsCell([
                            '<th>Catalog</th>',
                            '<th>88</th>',
                            '<th>78</th>',
                            '<th>42</th>'

                        ])
                    ).append(
                        this.renderStatsCell([
                            '<th>Check Availability</th>',
                            '<th>75</th>',
                            '<th>61</th>',
                            '<th>31</th>'

                        ])
                    ).append(
                        this.renderStatsCell([
                            '<th>Checkout</th>',
                            '<th>45</th>',
                            '<th>36</th>',
                            '<th>12</th>'

                        ])
                    )
                ]).appendTo(
                    $('<div />').attr({
                        id: 'container'
                    }).appendTo(this.$)
                )
            },

            /**
             * Renders Statistic Table Cells
             * @param cells
             * @returns {TableRow}
             */
            renderStatsCell: function renderStatsCell(cells) {

                var $tr = $('<tr />');

                for (var i = 0, l = cells.length; i < l; i++) {

                    $tr.append(cells[i]);

                }

                return $tr;
            }


        },
        BaseElement.prototype
    )
        ;

})
;