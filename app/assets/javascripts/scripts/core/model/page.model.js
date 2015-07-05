/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'config/widget'
], function definePageModel(BaseModel, Widget) {

    /**
     * Define Page model
     * @extends BaseModel
     * @class PageModel
     * @constructor
     */
    var PageModel = function PageModel() {

        /**
         * Define item
         * @property PageModel
         * @type {Widget}
         */
        this.item = Widget;

        /**
         * Define on destroy dependencies
         * @property PageModel
         * @type {Array}
         */
        this.onDestroy = [
            'Layout'
        ];
    };

    return PageModel.extend('PageModel', {

        /**
         * Get widget by content uuid
         * @memberOf PageModel
         * @param {string} id
         * @returns {*}
         */
        getWidgetByContentUUID: function getWidgetByContentUUID(id) {

            /**
             * Split uuid
             * @type {Array}
             */
            var split = id.split('-'),
                uuidArr = id.split('-'),
                uuid;

            for (var i = 0, l = uuidArr.length; i < l; i++) {

                split.pop();

                uuid = split.join('-');

                if (this.scope.base.isUUID(uuid)) {
                    return this.getItemByUUID(uuid);
                }
            }
        },

        /**
         * Set layout mode
         * @memberOf PageModel
         * @param {string} layout
         */
        setLayoutMode: function setLayoutMode(layout) {
            this._setItemInfoPreferences('layoutMode', layout);
        },

        /**
         * Set layout columns
         * @memberOf PageModel
         * @param {number} columns
         */
        setLayoutColumns: function setLayoutColumns(columns) {

            this._setItemInfoPreferences('layoutColumns', columns);

            /**
             * Get scope
             * @type {Page}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.updateLayoutConfig
            );
        },

        /**
         * Set global widgets overlapping
         * @memberOf PageModel
         * @param {boolean} overlapping
         */
        setOverlapping: function setOverlapping(overlapping) {
            this._setItemInfoPreferences('overlapping', overlapping);
            this.getConfig('widget').overlapping = overlapping;
        },

        /**
         * Set page/site description
         * @memberOf PageModel
         * @param {string} description
         */
        setSiteDescription: function setSiteDescription(description) {

            /**
             * Set local scope
             * @type {Page}
             */
            var scope = this.scope;

            this._setItemInfoPreferences('siteDescription', description);

            scope.observer.publish(
                scope.eventmanager.eventList.updateSiteDescription
            );
        },

        /**
         * Set page/site keywords
         * @memberOf PageModel
         * @param {string} keywords
         */
        setSiteKeywords: function setSiteKeywords(keywords) {

            /**
             * Set local scope
             * @type {Page}
             */
            var scope = this.scope;

            this._setItemInfoPreferences('siteKeywords', keywords);

            scope.observer.publish(
                scope.eventmanager.eventList.updateSiteKeywords
            );
        },

        /**
         * Set show in tabs
         * @memberOf PageModel
         * @param {boolean} show
         */
        setShowInTabs: function setShowInTabs(show) {
            this._setItemInfoPreferences('showInTabs', show);
        },

        /**
         * Set page header
         * @memberOf PageModel
         * @param {boolean} header
         */
        setPageHeader: function setPageHeader(header) {
            this._setItemInfoPreferences('pageHeader', header);
            this.getConfig('html').header = header;
        },

        /**
         * Set page footer
         * @memberOf PageModel
         * @param {boolean} footer
         */
        setPageFooter: function setPageFooter(footer) {
            this._setItemInfoPreferences('pageFooter', footer);
            this.getConfig('html').footer = footer;
        },

        /**
         * Set page animation on swipe
         * @memberOf PageModel
         * @param {boolean} animate
         */
        setAnimateSwipe: function setAnimateSwipe(animate) {
            this._setItemInfoPreferences('animateSwipe', animate);
        },

        /**
         * Set page lazy loading
         * @memberOf PageModel
         * @param {boolean} lazy
         */
        setLazyLoading: function setLazyLoading(lazy) {
            this._setItemInfoPreferences('lazyLoading', lazy);
        },

        /**
         * Set page outline containment
         * @memberOf PageModel
         * @param {boolean} outline
         */
        setOutlineContainment: function setOutlineContainment(outline) {

            this._setItemInfoPreferences('outlineContainment', outline);

            if (this.scope.controller.isLoading()) {
                return false;
            }

            /**
             * Get scope
             * @type {Page}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.updateItemInteractions,
                outline
            );
        },

        /**
         * Define load widgets
         * @memberOf PageModel
         */
        loadWidgets: function loadWidgets() {

            this.scope.controller.setAsLoading(true);

            /**
             * Get collector
             * @type {object}
             */
            var collector = this.getCollector(this.item);

            this.loadData(this.item, collector);
        }

    }, BaseModel.prototype);
});