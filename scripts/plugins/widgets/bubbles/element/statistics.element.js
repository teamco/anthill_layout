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

        this.renderBubbles();

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

                var scope = this;

                require([
                    'plugins/widgets/bubbles/lib/highcharts'
                ], function defineChart() {

                    require([
                        'plugins/widgets/bubbles/lib/highcharts-more'
                    ], function defineChartData() {


                        scope.renderData();

                    });

                });
            },

            renderBubbles: function renderBubbles(){
                this.$div = $('<div />').attr(
                    {
                        id:'container'
                    }
                ).appendTo(this.$);

            },

            renderData: function renderData(x,y,z) {
                $('#container').highcharts({

                    chart: {
                        type: 'bubble',
                        zoomType: 'xy'
                    },

                    title: {
                        text: 'Analyzing Coordinate Clicks'
                    },

                    series: [{
                        data: [[51,69,40],[38,23,33],[57,86,31]]
                    }, {
                        data: [[97,3,1],[15,67,48],[54,25,81]]
                    }, {
                        data: [[67,78,75],[64,12,10],[30,77,82]]
                    }]

                });
            }


        },
        BaseElement.prototype
    )
        ;

})
;