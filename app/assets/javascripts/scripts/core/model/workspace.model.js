/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'config/page'
], function defineWorkspaceModel(BaseModel, Page) {

    /**
     * Define Workspace model
     * @extends BaseModel
     * @class WorkspaceModel
     * @constructor
     */
    var WorkspaceModel = function WorkspaceModel() {

        /**
         * Define Page item
         * @member WorkspaceModel
         * @type {Page}
         */
        this.item = Page;

        /**
         * Skip transfer preferences
         * @member WorkspaceModel
         * @type {string[]}
         */
        this.skipPreferencesOn = [
            'cloneItemContent'
        ];
    };

    return WorkspaceModel.extend('WorkspaceModel', {

        /**
         * Set static width
         * @member WorkspaceModel
         * @param {boolean} width
         */
        setStaticWidth: function setStaticWidth(width) {

            // Define config
            var config = this.scope.config;

            config.preferences.staticWidth = width;
            config.isResized = !width;
        },

        /**
         * Set Site Width Slider
         * @member WorkspaceModel
         * @param {number} width
         */
        setSiteWidthSlider: function setSiteWidthSlider(width) {

            this._setItemInfoPreferences('siteWidthSlider', width);

            /**
             * Set local scope
             * @type {Workspace}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.updatePagesWidth
            );
        },

        /**
         * Set site title
         * @member WorkspaceModel
         * @param {string} title
         */
        setSiteTitle: function setSiteTitle(title) {

            /**
             * Set local scope
             * @type {Workspace}
             */
            var scope = this.scope;

            this._setItemInfoPreferences('siteTitle', title);

            scope.observer.publish(
                scope.eventmanager.eventList.updateSiteTitle
            );
        },

        /**
         * Set site author
         * @member WorkspaceModel
         * @param {string} author
         */
        setSiteAuthor: function setSiteAuthor(author) {

            /**
             * Set local scope
             * @type {Workspace}
             */
            var scope = this.scope;

            this._setItemInfoPreferences('siteAuthor', author);

            scope.observer.publish(
                scope.eventmanager.eventList.updateSiteAuthor
            );
        },

        /**
         * Set site description
         * @member WorkspaceModel
         * @param {string} description
         */
        setSiteDescription: function setSiteDescription(description) {

            /**
             * Set local scope
             * @type {Workspace}
             */
            var scope = this.scope;

            this._setItemInfoPreferences('siteDescription', description);

            scope.observer.publish(
                scope.eventmanager.eventList.updateSiteDescription
            );
        },

        /**
         * Set site keywords
         * @member WorkspaceModel
         * @param {string} keywords
         */
        setSiteKeywords: function setSiteKeywords(keywords) {

            /**
             * Set local scope
             * @type {Workspace}
             */
            var scope = this.scope;

            this._setItemInfoPreferences('siteKeywords', keywords);

            scope.observer.publish(
                scope.eventmanager.eventList.updateSiteKeywords
            );
        },

        /**
         * Set google analytics tracking id
         * @member WorkspaceModel
         * @param {string} trackingId
         */
        setTrackingId: function setTrackingId(trackingId) {

            /**
             * Set local scope
             * @type {Workspace}
             */
            var scope = this.scope;

            scope.config.preferences.trackingId = trackingId;

            scope.observer.publish(
                scope.eventmanager.eventList.loadTrackingSnippet
            );
        },

        /**
         * Define clone item content
         * @member WorkspaceModel
         * @param {string} itemUUID
         */
        setCloneItemContent: function setCloneItemContent(itemUUID) {

            /**
             * Get clone page
             * @type {Page}
             */
            var clonePage = this.getItemByUUID(itemUUID);

            /**
             * Get current page
             * @type {Page}
             */
            var currentPage = this.getCurrentItem();

            // Transfer layout
            currentPage.observer.publish(
                currentPage.eventmanager.eventList.createLayout,
                clonePage.model.getConfig('layout')
            );

            /**
             * Get clone page items
             * @type {{Widget: {}}}
             */
            var cloneWidgets = clonePage.model.getItems(),
                index, cloneMap = {};

            for (index in cloneWidgets) {

                if (cloneWidgets.hasOwnProperty(index)) {

                    /**
                     * Define widget
                     * @type {Widget}
                     */
                    var cloneWidget = cloneWidgets[index],
                        cloneWidgetPrefs = cloneWidget.model.getConfig('preferences');

                    if (typeof(cloneWidgetPrefs.resource) === 'undefined') {

                        cloneWidget.logger.warn('Undefined resource', cloneWidgetPrefs);
                        return false;
                    }

                    // Create without render
                    currentPage.controller.createWidgetFromResource({

                        resource: cloneWidgetPrefs.resource,
                        thumbnail: cloneWidgetPrefs.thumbnail,
                        title: cloneWidgetPrefs.title,
                        description: cloneWidgetPrefs.description,
                        width: cloneWidget.dom.width,
                        height: cloneWidget.dom.height

                    }, false, true);

                    /**
                     * Get current widget
                     * @type {Widget}
                     */
                    var currentWidget = currentPage.widget,
                        key;

                    // Define map
                    cloneMap[cloneWidget.model.getUUID()] = currentWidget.model.getUUID();

                    // Copy dom
                    currentWidget.dom = cloneWidget.dom;

                    // Render widget
                    currentWidget.observer.publish(
                        currentWidget.eventmanager.eventList.successRendered
                    );

                    for (key in cloneWidgetPrefs) {

                        if (cloneWidgetPrefs.hasOwnProperty(key)) {

                            currentWidget.config.preferences[key] =
                                cloneWidgetPrefs[key];
                        }
                    }

                    // Temporary clone rules
                    currentWidget.config.rules = cloneWidget.model.getConfig('rules');
                }
            }

            // Get all page widgets
            var items = currentPage.model.getItems();

            for (var item in items) {

                if (items.hasOwnProperty(item)) {

                    /**
                     * Get widget
                     * @type {Widget}
                     */
                    currentWidget = items[item];

                    var rules = currentWidget.model.getConfig('rules');

                    /**
                     * Get subscribed widgets
                     * @type {Object}
                     */
                    var subscribe = rules.subscribe || {},
                        rs, currentKey, z;

                    if (subscribe) {

                        for (rs in subscribe) {
                            if (subscribe.hasOwnProperty(rs)) {

                                currentKey = cloneMap[rs];

                                if (rs.match(/content/)) {
                                    currentKey = cloneMap[rs.replace(/\-content/, '')] + '-content';
                                }

                                subscribe[currentKey] = {};

                                for (var sk in subscribe[rs]) {
                                    if (subscribe[rs].hasOwnProperty(sk)) {
                                        subscribe[currentKey][sk] = subscribe[currentKey][sk] || [];
                                        for (z = 0; z < subscribe[rs][sk].length; z++) {
                                            subscribe[currentKey][sk].push(subscribe[rs][sk][i]);
                                        }
                                    }
                                }

                                // Delete temp rules
                                delete subscribe[rs];
                            }
                        }
                    }


                }
            }
        }

    }, BaseModel.prototype);
});