/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'config/anthill',
    'modules/Model'
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
         * Define provider types
         * @type {{regular: string, text: string, video: string, map: string, files: string, image: string, social: string}}
         */
        this.dataTypes = {
            regular: 'Regular widgets',
            text: 'Text editor',
            video: 'Video player',
            map: 'Map widgets',
            files: 'Show file',
            image: 'Image gallery',
            social: 'Social data'
        };

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
                    width: 10,
                    height: 5
                },
                type: 'regular',
                resource: 'page.tabs'
            },
            {
                name: 'Empty',
                description: 'Empty widget',
                thumbnail: '',
                dimensions: {
                    width: 5,
                    height: 5
                },
                type: 'regular',
                resource: 'empty'
            },
            {
                name: 'Text Editor',
                description: 'Text Editor',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 7
                },
                type: 'text',
                resource: 'text.editor'
            },
            {
                name: 'Dropbox',
                description: 'Dropbox is a free service that lets you bring your photos, docs, and videos anywhere and share them easily.',
                thumbnail: '',
                dimensions: {
                    width: 5,
                    height: 5
                },
                type: 'files',
                resource: 'dropbox'
            },
            {
                name: 'Map Locator',
                description: 'Map locator',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 10
                },
                type: 'map',
                resource: 'map.locator'
            },
            {
                name: 'Avatar',
                description: 'Pick a photo and put it as your Avatar',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 10
                },
                type: 'image',
                resource: 'avatar'
            },
            {
                name: 'JW Player',
                description: 'JW Player powers online publishing, with clients ranging in size from Fortune 500 companies to individual bloggers',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 10
                },
                type: 'video',
                resource: 'jwplayer'
            },
            {
                name: 'Youtube',
                description: 'YouTube provides a forum for people to connect, inform, and inspire others across the globe and acts as a distribution platform for original content creators and advertisers large and small',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 10
                },
                type: 'video',
                resource: 'youtube'
            },
            {
                name: 'Quicktime',
                description: 'A powerful multimedia technology with a built-in media player, QuickTime lets you view internet video, HD movie trailers, and personal media in a wide range of file formats',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 10
                },
                type: 'video',
                resource: 'quicktime'
            },
            {
                name: 'Vimeo',
                description: 'Vimeo is video + you. We put your videos first and give you the best ways to share, discover, and be inspired',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 10
                },
                type: 'video',
                resource: 'vimeo'
            },
            {
                name: 'Image',
                description: 'A simple image widget that uses the native media manager to add image widgets to your site',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 10
                },
                type: 'image',
                resource: 'image'
            },
            {
                name: 'Image Gallery',
                description: 'Image gallery provides an image viewer',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 10
                },
                type: 'image',
                resource: 'image.gallery'
            },
            {
                name: 'RSS',
                description: 'Subscribing to a website RSS removes the need for the user to manually check the web site for new content',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 5
                },
                type: 'social',
                resource: 'rss'
            },
            {
                name: 'Twits',
                description: 'Show unique twitter thread',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 5
                },
                type: 'social',
                resource: 'twits'
            },
            {
                name: 'Pdf',
                description: 'Portable Document Format (PDF) is a file format used to present documents in a manner independent of application software, hardware, and operating systems',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 10
                },
                type: 'files',
                resource: 'pdf'
            },
            {
                name: 'Geolocation',
                description: 'Geolocation is the identification of the real-world geographic location of an object, such as a radar, mobile phone or an Internet-connected computer terminal',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 10
                },
                type: 'map',
                resource: 'geolocation'
            },
            {
                name: 'Open Weather Map',
                description: 'The OpenWeatherMap service provides free weather data and forecast API suitable for any cartographic services like web and smartphones applications',
                thumbnail: '',
                dimensions: {
                    width: 10,
                    height: 10
                },
                type: 'map',
                resource: 'open.weather.map'
            },
            {
                name: 'Login',
                description: 'Login to your page',
                thumbnail: '',
                dimensions: {
                    width: 5,
                    height: 5
                },
                type: 'social',
                resource: 'login'
            },
            {
                name: 'Share',
                description: 'Share your page with your friends',
                thumbnail: '',
                dimensions: {
                    width: 5,
                    height: 10
                },
                type: 'social',
                resource: 'share'
            },
            {
                name: 'Adobe Flash player',
                description: 'Adobe Flash Player is the standard for delivering high-impact, rich Web content. Designs, animation, and application user interfaces are deployed immediately across all browsers and platforms, attracting and engaging users with a rich Web experience.',
                thumbnail: '',
                dimensions: {
                    width: 15,
                    height: 15
                },
                type: 'video',
                resource: 'swf'
            },
            {
                name: 'Rutube',
                description: 'Rutube is a web video streaming service targeted at Russian speakers',
                thumbnail: '',
                dimensions: {
                    width: 15,
                    height: 15
                },
                type: 'video',
                resource: 'rutube'
            }

        ];

        /**
         * Define providers
         * @member GalleryModel
         * @type {{indoor: {name: string, data: *[]}}}
         */
        this.providers = {
            all: {
                name: 'All widgets',
                key: 'all',
                data: this.staticData
            }
        };

        /**
         * Define default provider
         * @member GalleryModel
         * @type {{name: string, data: *[]}[]}
         */
        this.defaultProvider = this.getProvidersList().all;

        /**
         * Define current provider
         * @member GalleryModel
         */
        this.currentProvider = this.defaultProvider;
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
         * @param {string} key
         */
        setProviderAsCurrent: function setProviderAsCurrent(key) {

            /**
             * Define provider
             * @type {*}
             */
            var provider = this.providers[key];

            if (!provider) {
                provider = this.defaultProvider;
                this.scope.logger.warn('Undefined provider, set default', provider);
            }

            this.currentProvider = provider;
            this.scope.logger.debug('Current provider', provider);
        },

        /**
         * Set widget to provider
         * @member GalleryModel
         * @param {{}} meta
         */
        setProvider: function setProvider(meta) {

            /**
             * Get providers list
             * @type {*}
             */
            var providers = this.getProvidersList();

            /**
             * Get data types
             * @type {{regular: string, text: string, video: string, map: string, files: string, image: string, social: string}}
             */
            var dataTypes = this.dataTypes;

            if (meta.type) {

                providers[meta.type] = this.base.define(
                    providers[meta.type], {
                        name: dataTypes[meta.type] || meta.type,
                        key: meta.type,
                        data: []
                    },
                    true
                );

                providers[meta.type].data.push(meta);

            } else {

                providers.all.data.push(meta);
            }
        }

    }, AntHill.prototype, BaseModel.prototype);
});