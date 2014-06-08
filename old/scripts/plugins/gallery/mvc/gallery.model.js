/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'config/anthill',
    'modules/model'
], function defineGalleryModel(AntHill, BaseModel) {

    /**
     * Define Gallery model
     * @extends AntHill
     * @extends BaseModel
     * @class GalleryModel
     * @constructor
     */
    var GalleryModel = function GalleryModel() {

        /**
         * Define static data
         * @member GalleryModel
         * @type {*[]}
         */
        this.staticData = [
            {
                name: 'Page Tabs',
                description: 'Show page tabs',
                thumbnail: '',
                dimensions: {
                    width: 4,
                    height: 2
                },
                resource: 'page.tabs'
            },
            {
                name: 'Empty',
                description: 'Empty widget',
                thumbnail: '',
                dimensions: {
                    width: 4,
                    height: 2
                },
                resource: 'empty'
            },
            {
                name: 'Text Editor',
                description: 'Text Editor',
                thumbnail: '',
                dimensions: {
                    width: 4,
                    height: 2
                },
                resource: 'text.editor'
            },
            {
                name: 'Dropbox',
                description: 'Dropbox is a free service that lets you bring your photos, docs, and videos anywhere and share them easily.',
                thumbnail: '',
                dimensions: {
                    width: 1,
                    height: 1
                },
                resource: 'dropbox'
            },
            {
                name: 'JW Player',
                description: 'JW Player powers online publishing, with clients ranging in size from Fortune 500 companies to individual bloggers',
                thumbnail: '',
                dimensions: {
                    width: 2,
                    height: 2
                },
                resource: 'jwplayer'
            },
            {
                name: 'Youtube',
                description: 'YouTube provides a forum for people to connect, inform, and inspire others across the globe and acts as a distribution platform for original content creators and advertisers large and small',
                thumbnail: '',
                dimensions: {
                    width: 2,
                    height: 2
                },
                resource: 'youtube'
            },
            {
                name: 'Vimeo',
                description: 'Vimeo is video + you. We put your videos first and give you the best ways to share, discover, and be inspired',
                thumbnail: '',
                dimensions: {
                    width: 2,
                    height: 2
                },
                resource: 'vimeo'
            },
            {
                name: 'Image',
                description: 'A simple image widget that uses the native media manager to add image widgets to your site',
                thumbnail: '',
                dimensions: {
                    width: 2,
                    height: 2
                },
                resource: 'image'
            },
            {
                name: 'Image Gallery',
                description: 'Image gallery provides an image viewer',
                thumbnail: '',
                dimensions: {
                    width: 2,
                    height: 2
                },
                resource: 'image.gallery'
            },
            {
                name: 'RSS',
                description: 'Subscribing to a website RSS removes the need for the user to manually check the web site for new content',
                thumbnail: '',
                dimensions: {
                    width: 2,
                    height: 2
                },
                resource: 'rss'
            },
            {
                name: 'Twits',
                description: 'Show unique twitter thread',
                thumbnail: '',
                dimensions: {
                    width: 2,
                    height: 2
                },
                resource: 'twits'
            },
            {
                name: 'Geolocation',
                description: 'Geolocation is the identification of the real-world geographic location of an object, such as a radar, mobile phone or an Internet-connected computer terminal',
                thumbnail: '',
                dimensions: {
                    width: 2,
                    height: 2
                },
                resource: 'geolocation'
            },
            {
                name: 'Open Weather Map',
                description: 'The OpenWeatherMap service provides free weather data and forecast API suitable for any cartographic services like web and smartphones applications',
                thumbnail: '',
                dimensions: {
                    width: 2,
                    height: 2
                },
                resource: 'open.weather.map'
            },
            {
                name: 'Login',
                description: 'Login to your page',
                thumbnail: '',
                dimensions: {
                    width: 2,
                    height: 2
                },
                resource: 'login'
            }
        ];

        /**
         * Define providers
         * @member GalleryModel
         * @type {{indoor: {name: string, data: *[]}}}
         */
        this.providers = {
            all: {
                name: 'All',
                data: []
            },
            indoor: {
                name: 'Indoor',
                data: this.staticData
            }
        };

        /**
         * Define default provider
         * @member GalleryModel
         * @type {{name: string, data: *[]}[]}
         */
        this.defaultProvider = this.getProvidersList().indoor;

        /**
         * Define current provider
         * @member GalleryModel
         */
        this.currentProvider = undefined;
    };

    return GalleryModel.extend('GalleryModel', {

        /**
         * Get data provider
         * @member GalleryModel
         * @param provider
         * @returns {*}
         */
        getDataProvider: function getDataProvider(provider) {
            return provider.data;
        },

        /**
         * Get providers list
         * @member GalleryModel
         * @returns {*}
         */
        getProvidersList: function getProvidersList() {
            return this.providers;
        },

        /**
         * Set provider as current
         * @member GalleryModel
         * @param {string} name
         */
        setProviderAsCurrent: function setProviderAsCurrent(name) {

            /**
             * Define provider
             * @type {*}
             */
            var provider = this.providers[name];

            if (provider) {
                this.scope.logger.debug('Current provider', provider);
            } else {
                provider = this.defaultProvider;
                this.scope.logger.debug('Undefined provider, set default', provider);
            }

            this.currentProvider = provider;
        },

        /**
         * Set provider
         * @member GalleryModel
         * @param provider
         */
        setProvider: function setProvider(provider) {

            /**
             * Define hash
             * @type {{}}
             */
            var merge = {};

            /**
             * Merge provider data
             */
            this.providers = $.extend(true, merge, this.providers, provider);
        }

    }, AntHill.prototype, BaseModel.prototype);
});