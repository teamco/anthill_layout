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
        this.preferences = {};

        /**
         * Define site preferences data
         * @property SiteConfigModel
         * @type {{
         *      preferences: {title: string, description: string, event: string},
         *      publish: {title: string, description: string},
         *      import: {title: string, description: string, event: string},
         *      export: {title: string, description: string, event: string},
         *      cleanup: {title: string, description: string, event: string},
         *      widgetGenerator: {title: string, description: string, event: string}
         * }}
         */
        this.data = {
            preferences: {
                title: 'Preferences',
                description: 'Preferences are the user options for browsing, editing, searching, notifications, and more',
                event: 'loadSitePreferences'
            },
            activate: {
                title: 'Activate version',
                description: 'Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later',
                event: 'activateStorage'
            },
            publish: {
                title: 'Publish version',
                description: 'Publish site in consumption mode',
                event: 'publishStorage'
            },
            widgetGenerator: {
                title: 'Widget Generator',
                description: 'Generate new widget',
                event: 'widgetGenerator'
            },
            import: {
                title: 'Import',
                description: 'Import site data JSON',
                event: 'importSiteData'
            },
            export: {
                title: 'Export',
                description: 'Export site data as a JSON',
                event: 'exportSiteData'
            },
            cleanup: {
                title: 'Clean Up',
                description: 'Clean up local storage',
                event: 'cleanUpLocalStorage'
            }
        };

        /**
         * Define site width values
         * @property SiteConfigModel
         * @type {number[]}
         */
        this.map = [480, 640, 960, 1024, 1040, 1140, 1280, 1920, '100%'];
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