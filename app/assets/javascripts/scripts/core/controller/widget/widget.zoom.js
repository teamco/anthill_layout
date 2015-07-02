/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/22/14
 * Time: 9:15 PM
 */

define(function defineWidgetZoom() {

    /**
     * Define WidgetZoom
     * @class WidgetZoom
     * @constructor
     * @extends AntHill
     */
    var WidgetZoom = function WidgetZoom() {
    };

    return WidgetZoom.extend('WidgetZoom', {

        /**
         * Define set zoom
         * @memberOf WidgetZoom
         */
        setZoomable: function setZoomable() {
            this.view.get$item().setZoom(true);
        },

        /**
         * Define unset zoom
         * @memberOf WidgetZoom
         */
        unsetZoomable: function unsetZoomable() {
            this.view.get$item().setZoom(false);
        }
    });
});