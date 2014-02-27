/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineGalleryModel(BaseModel) {

    /**
     * Define Gallery model
     * @mixin BaseModel
     * @class Model
     * @constructor
     */
    var Model = function Model() {

        this.staticData = [
            {
                name: 'Test name1',
                description: 'Test description',
                thumbnail: '',
                dimensions: {
                    width: 4,
                    height: 2
                },
                src: 'empty/empty.js'
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
                group: 'test'
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
                group: 'test'
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
                group: 'test'
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
                group: 'test'
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
                group: 'test'
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
                group: 'test'
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
                group: 'test'
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
                group: 'test'
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
                group: 'test'
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
                group: 'test'
            }
        ];
    };

    return Model.extend({

        /**
         * Define default providers
         */
        defaultProviders: [
//            anthill.i18n.t('gallery.providers.all'),
//            anthill.i18n.t('gallery.providers.favorites')
        ],

        providers: ['test'],

        /**
         * Get data provider
         */
        getDataProvider: function getDataProvider() {

        },

        /**
         * Get providers list
         */
        getProvidersList: function getProvidersList() {
            return this.staticData;
        }

    }, BaseModel.prototype);
});