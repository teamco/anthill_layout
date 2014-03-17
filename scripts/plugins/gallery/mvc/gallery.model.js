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
         * Define default providers
         * @member GalleryModel
         */
        this.defaultProviders = [];

        /**
         * Define static data
         * @member GalleryModel
         * @type {*[]}
         */
        this.staticData = [
            {
                name: 'Test name1',
                description: 'Test description',
                thumbnail: '',
                dimensions: {
                    width: 4,
                    height: 2
                },
                resource: 'empty'
            },
            {
                name: 'Test name2',
                description: 'Test description',
                thumbnail: '',
                dimensions: {
                    width: 2,
                    height: 2
                },
                src: '',
                resource: 'youtube',
                group: 'test'
            }
        ];
    };

    return GalleryModel.extend('GalleryModel', {

        /**
         * Set default providers
         * @member GalleryModel
         */
        setDefaultProviders: function getDefaultProviders() {

            /**
             * Set providers
             * @type {*[]}
             */
            this.defaultProviders = [
                this.i18n.t('gallery.providers.all'),
                this.i18n.t('gallery.providers.favorites')
            ]
        },

        /**
         * Get data provider
         * @member GalleryModel
         */
        getDataProvider: function getDataProvider() {

        },

        /**
         * Get providers list
         * @member GalleryModel
         */
        getProvidersList: function getProvidersList() {
            return this.staticData;
        }

    }, AntHill.prototype, BaseModel.prototype);
});