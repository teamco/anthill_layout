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
     * @class Model
     * @constructor
     */
    var Model = function Model() {

        /**
         * Define default providers
         * @member Model
         */
        this.defaultProviders = [];

        /**
         * Define static data
         * @member Model
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

    return Model.extend({

        /**
         * Set default providers
         * @member Model
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
         * @member Model
         */
        getDataProvider: function getDataProvider() {

        },

        /**
         * Get providers list
         * @member Model
         */
        getProvidersList: function getProvidersList() {
            return this.staticData;
        }

    }, AntHill.prototype, BaseModel.prototype);
});