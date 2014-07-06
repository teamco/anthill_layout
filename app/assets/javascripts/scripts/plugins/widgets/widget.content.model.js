/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/29/14
 * Time: 1:09 AM
 */

define([], function defineWidgetContentModel() {

    /**
     * Define Widget content model
     * @class WidgetContentModel
     * @constructor
     */
    var WidgetContentModel = function WidgetContentModel() {

    };

    return WidgetContentModel.extend('WidgetContentModel', {

        /**
         * Set on click Url
         * @member WidgetContentModel
         * @param {string} url
         */
        setOnClickOpenUrl: function setOnClickOpenUrl(url) {

            this.setPrefs('onClickOpenUrl', url);

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope.controller.getContainment();

            if (!scope.controller.isWidgetContent()) {
                return false;
            }

            scope.observer.publish(
                scope.eventmanager.eventList.setOnClickUrl,
                url
            );
        },

        /**
         * Set statistics
         * @member WidgetContentModel
         * @param {boolean} statistics
         */
        setStatistics: function setStatistics(statistics) {
            this.setPrefs('statistics', statistics);
        }
    });
});