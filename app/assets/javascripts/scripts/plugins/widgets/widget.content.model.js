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
         * Set on top
         * @member WidgetContentModel
         * @param {boolean} ontop
         */
        setAlwaysOnTop: function setAlwaysOnTop(ontop) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope.controller.getContainment();

            if (!scope.controller.isWidgetContent()) {
                return false;
            }

            this.setPrefs('alwaysOnTop', ontop);

            scope.observer.publish(
                scope.eventmanager.eventList.setAlwaysOnTop,
                ontop
            );
        },

        /**
         * Save widget layer
         * @member WidgetContentModel,
         * @param {string} eventName
         */
        setLayerUp: function setLayerUp(eventName) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope.controller.getContainment();

            if (scope.controller.isWidgetContent()) {
                return false;
            }

            scope.observer.publish(
                scope.eventmanager.eventList[eventName],
                true
            );
        },

        /**
         * Save widget layer
         * @member WidgetContentModel,
         * @param {string} eventName
         */
        setLayerDown: function setLayerDown(eventName) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope.controller.getContainment();

            if (scope.controller.isWidgetContent()) {
                return false;
            }

            scope.observer.publish(
                scope.eventmanager.eventList[eventName],
                true
            );
        },

        /**
         * Set overlapping
         * @member WidgetContentModel
         * @param {boolean} overlapping
         */
        setOverlapping: function setOverlapping(overlapping) {
            this.setPrefs('overlapping', overlapping);
        },

        /**
         * Set statistics
         * @member WidgetContentModel
         * @param {boolean} statistics
         */
        setStatistics: function setStatistics(statistics) {
            this.setPrefs('statistics', statistics);
        },

        /**
         * Set stretch width
         * Adopt to container width
         * @param {boolean} stretch
         */
        setStretchWidth: function setStretchWidth(stretch) {
            this.setPrefs('stretchWidth', stretch);

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope.controller.getContainment();

            if (scope.controller.isWidgetContent()) {
                return false;
            }

            scope.observer.publish(
                scope.eventmanager.eventList.stretchWidth,
                stretch
            );
        },

        /**
         * Set stretch height
         * Adopt to container height
         * @param {boolean} stretch
         */
        setStretchHeight: function setStretchHeight(stretch) {
            this.setPrefs('stretchHeight', stretch);

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope.controller.getContainment();

            if (scope.controller.isWidgetContent()) {
                return false;
            }

            scope.observer.publish(
                scope.eventmanager.eventList.stretchHeight,
                stretch
            );
        },

        /**
         * Set stick to
         * @param {string} eventName
         * @returns {boolean}
         * @private
         */
        _setStickTo: function _setStickTo(eventName) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope.controller.getContainment();

            if (scope.controller.isWidgetContent()) {
                return false;
            }

            scope.observer.publish(
                scope.eventmanager.eventList[eventName]
            );
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToCenterLeft: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToCenterTop: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToCenter: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToCenterBottom: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToCenterRight: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToTopLeft: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToBottomLeft: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToTopRight: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToBottomRight: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        }
    });
});