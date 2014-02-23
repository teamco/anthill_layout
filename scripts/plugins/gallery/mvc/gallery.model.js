/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function definePageModel(BaseModel) {

    /**
     * Define Page model
     * @mixin BaseModel
     * @class Model
     * @constructor
     */
    var Model = function Model() {
    };

    return Model.extend({

        /**
         * Define providers
         */
        providers: [
            anthill.i18n.t('gallery.providers.all'),
            anthill.i18n.t('gallery.providers.favorites')
        ],

        /**
         * Get data provider
         */
        getDataProvider: function getDataProvider() {

        },

        /**
         * Get providers list
         */
        getProvidersList: function getProvidersList() {

        }

    }, BaseModel.prototype);
});