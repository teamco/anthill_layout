/**
 * Created by i061485 on 10/1/14.
 */

define([], function defineGalleryWidgets() {

    /**
     * Define gallery widgets
     * @class GalleryWidgets
     * @constructor
     */
    var GalleryWidgets = function GalleryWidgets() {

        /**
         * Define static gallery content
         * @type {{name: string, description: string, thumbnail: string, dimensions: {width: number, height: number}, type: string, resource: string}[]}
         */
        this.defaultData = [
            {
                name: 'Page Tabs',
                description: 'Show page tabs',
                thumbnail: '',
                dimensions: {
                    width: 30,
                    height: 5
                },
                type: 'template',
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
                name: 'Pet Radar',
                description: 'Shows online pets arround you',
                thumbnail: '',
                dimensions: {
                    width: 30,
                    height: 30
                },
                type: 'map',
                resource: 'pet.radar'
            },
            {
                name: 'Avatar',
                description: 'Pick a photo and put it as your Avatar',
                thumbnail: '',
                dimensions: {
                    width: 6,
                    height: 7
                },
                type: 'image',
                resource: 'avatar'
            },
            {
                name: 'Pet Passport',
                description: 'Shows all information about your pet',
                thumbnail: '',
                dimensions: {
                    width: 12,
                    height: 13
                },
                type: 'social',
                resource: 'pet.passport'
            },
            {
                name: 'Post Tool',
                description: 'Post news, images, videos etc. on your wall',
                thumbnail: '',
                dimensions: {
                    width: 35,
                    height: 5
                },
                type: 'social',
                resource: 'post.tool'
            },
            {
                name: 'Friends Online',
                description: 'Shows all your friends which are currently online',
                thumbnail: '',
                dimensions: {
                    width: 12,
                    height: 11
                },
                type: 'social',
                resource: 'online.friends'
            },
            {
                name: 'Multiple Icons',
                description: 'Widget with multiple usable tools and features',
                thumbnail: '',
                dimensions: {
                    width: 3,
                    height: 30
                },
                type: 'template',
                resource: 'multiple.icons'
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
                    width: 10,
                    height: 3
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
            },
            {
                name: 'Header',
                description: 'Header widget',
                thumbnail: '',
                dimensions: {
                    width: 33,
                    height: 2
                },
                type: 'template',
                resource: 'header'
            },
            {
                name: 'Ice Floe',
                description: 'White base container for several widgets',
                thumbnail: '',
                dimensions: {
                    width: 8,
                    height: 20
                },
                type: 'template',
                resource: 'ice.floe'
            },
            {
                name: 'Login Facebook',
                description: 'Login with your Facebook account',
                thumbnail: '',
                dimensions: {
                    width: 5,
                    height: 5
                },
                type: 'social',
                resource: 'login.facebook'
            },
            {
                name: 'Login Google',
                description: 'Login with your Google account',
                thumbnail: '',
                dimensions: {
                    width: 5,
                    height: 5
                },
                type: 'social',
                resource: 'login.google'
            },
            {
                name: 'Post Template',
                description: 'Visual layout of posted note on the wall',
                thumbnail: '',
                dimensions: {
                    width: 34,
                    height: 10
                },
                type: 'template',
                resource: 'post.template'
            },
            {
                name: 'Events Diary',
                description: 'Events reminder tool',
                thumbnail: '',
                dimensions: {
                    width: 9,
                    height: 12
                },
                type: 'social',
                resource: 'events'
            },
            {
                name: 'FilmOn',
                description: 'LiveTV HDi. Anytime. Anywhere',
                thumbnail: '',
                dimensions: {
                    width: 9,
                    height: 12
                },
                type: 'video',
                resource: 'film.on'
            }
        ];
    };

    return GalleryWidgets.extend('GalleryWidgets', {

        /**
         * Get Default Data
         * @member GalleryWidgets
         * @param {string} [key]
         * @param {string} [type]
         * @param {boolean} [reverse]
         * @returns {{name: string, description: string, thumbnail: string, dimensions: {width: number, height: number}, type: string, resource: string}[]}
         */
        getDefaultData: function getDefaultData(key, type, reverse) {

            return typeof(key) === 'string' && typeof(type) === 'string' ?
                this.defaultData.sortByValue(key, type, reverse) :
                this.defaultData;
        }
    });
});