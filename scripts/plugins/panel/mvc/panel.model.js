/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function definePanelModel(BaseModel) {

    /**
     * Define Panel model
     * @extends BaseModel
     * @class Model
     * @constructor
     */
    var Model = function Model() {

        /**
         * Init modules
         * @member Model
         * @type {Array}
         */
        this.modules = [];

        /**
         * Define packages
         * @member Model
         * @type {Array}
         */
        this.packages = [];
    };

    return Model.extend({

        /**
         * Init module
         * @member Model
         * @param Module
         */
        defineModule: function defineModule(Module) {
            this.modules.push({
                activated: false,
                module: new Module(this.scope)
            });
        },

        /**
         * Init package
         * @member Model
         * @param Package
         */
        definePackage: function definePackage(Package) {
            this.packages.push(new Package(this.scope));
        },

        /**
         * Get module by index
         * @member Model
         * @param {number} [index]
         * @returns {*}
         */
        getModule: function getModule(index) {
            return this.modules[index] || this.modules;
        },

        /**
         * Get module index
         * @member Model
         * @param resource
         * @returns {number}
         */
        getIndex: function getIndex(resource) {

            /**
             * Define local instance of modules
             * @type {Array}
             */
            var modules = this.modules;

            for (var i = 0, l = modules.length; i < l; i++) {
                if (resource.toLowerCase() === modules[i].module.constructor.name.toLowerCase()) {
                    return i;
                }
            }

            this.scope.logger.error('Undefined index');
        },

        /**
         * Get package by index
         * @member Model
         * @param {number} [index]
         * @returns {*}
         */
        getPackage: function getPackage(index) {
            return this.packages[index] || this.packages;
        }

    }, BaseModel.prototype);
});