/**
 * Created by i061485 on 7/3/14.
 */

define([], function defineWidgetStretch(){

    /**
     * Define widget stretch
     * @class WidgetStretch
     * @constructor
     */
    var WidgetStretch = function WidgetStretch() {

    };

    return WidgetStretch.extend('WidgetStretch', {

        /**
         * Stretch height
         * @member WidgetStretch
         * @param {boolean} stretch
         */
        stretchHeight: function stretchHeight(stretch) {

            if (stretch) {

                this.view.get$item().stretchHeight(
                    this.controller.getContainment()
                );

            } else {

                this.view.get$item().restoreHeight();
            }
        },

        /**
         * Stretch width
         * @member WidgetStretch
         * @param {boolean} stretch
         */
        stretchWidth: function stretchWidth(stretch) {

            if (stretch) {

                this.view.get$item().stretchWidth(
                    this.controller.getContainment()
                );

            } else {

                this.view.get$item().restoreWidth();
            }
        }
    });
});