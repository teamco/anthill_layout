/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineSiteConfigModel(BaseModel) {

    /**
     * Define SiteConfig model
     * @class SiteConfigModel
     * @constructor
     * @extends BaseModel
     */
    var SiteConfigModel = function SiteConfigModel() {

        /**
         * Define preferences
         * @memberOf SiteConfigModel
         * @type {{url: string}}
         */
        this.preferences = {
        };

        /**
         * Define site preferences data
         * @memberOf SiteConfigModel
         * @type {{preferences: {title: string, description: string}}}
         */
        this.data = {
            preferences: {
                title: 'Preferences',
                description: 'Preferences are the user options for browsing, editing, searching, notifications, and more',
                event:'loadSitePreferences'
            },
            publish: {
                title: 'Publish',
                description: 'Publishing involves the process of producing and distributing literature so that the public can have access to it'
            },
            cleanup: {
                title: 'Clean Up',
                description: 'Clean up local storage',
                event:'cleanUpLocalStorage'
            }
        };

        /**
         * Define site width values
         * @memberOf SiteConfigModel
         * @type {number[]}
         */
        this.map = [960, 1024, 1040, 1140, 1280, 1920, '100%'];
    };

    return SiteConfigModel.extend('SiteConfigModel', {

        /**
         * Get DataItems
         * @memberOf SiteConfigModel
         * @returns {{preferences: {title: string, description: string}}}
         */
        getDataItems: function getDataItems() {
            return this.data;
        },

        /**
         * Get site width range
         * @memberOf SiteConfigModel
         * @returns {number[]}
         */
        getSiteWidthRange: function getSiteWidthRange() {
            return this.map;
        }

    }, BaseModel.prototype);
});