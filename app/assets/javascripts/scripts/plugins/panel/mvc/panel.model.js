/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function definePanelModel(BaseModel) {

    /**
     * Define Panel model
     * @extends BaseModel
     * @class PanelModel
     * @constructor
     */
    var PanelModel = function PanelModel() {

        /**
         * Init modules
         * @memberOf PanelModel
         * @type {Array}
         */
        this.modules = [];

        /**
         * Define packages
         * @memberOf PanelModel
         * @type {Array}
         */
        this.packages = [];
    };

    return PanelModel.extend('PanelModel', {

        /**
         * Init module
         * @memberOf PanelModel
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
         * @memberOf PanelModel
         * @param Package
         */
        definePackage: function definePackage(Package) {
            this.packages.push(
                new Package(this.scope)
            );
        },

        /**
         * Get module by index
         * @memberOf PanelModel
         * @param {number} [index]
         * @returns {*}
         */
        getModule: function getModule(index) {
            return this.modules[index] || this.modules;
        },

        /**
         * Get module index
         * @memberOf PanelModel
         * @param resource
         * @returns {number}
         */
        getModuleIndex: function getModuleIndex(resource) {

            /**
             * Define local instance of modules
             * @type {Array}
             */
            var modules = this.modules;

            for (var i = 0, l = modules.length; i < l; i++) {
                if (resource === modules[i].module.constructor.prototype.name.toDash()) {
                    return i;
                }
            }

            this.scope.logger.error(
                'Undefined module index',
                resource,
                modules
            );
        },

        /**
         * Get package by index
         * @memberOf PanelModel
         * @param {number} [index]
         * @returns {*}
         */
        getPackage: function getPackage(index) {
            return this.packages[index] || this.packages;
        }

    }, BaseModel.prototype);
});