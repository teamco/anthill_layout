/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/13/15
 * Time: 8:45 PM
 */

define(function defineWidgetScroll(){

    /**
     * Define WidgetScroll
     * @class WidgetScroll
     * @constructor
     */
    var WidgetScroll = function WidgetScroll() {
    };

    return WidgetScroll.extend('WidgetScroll', {

        /**
         * Define scroll content
         * @memberOf WidgetScroll
         * @param {boolean} scrollable
         */
        scrollContent: function scrollContent(scrollable) {

            /**
             * Define css action
             * @type {string}
             */
            var action = (scrollable ? 'add' : 'remove') + 'Class';

            this.view.get$item().$[action]('scroll');
        }
    });
});