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
         * @property PanelModel
         * @type {Array}
         */
        this.modules = [];

        /**
         * Define packages
         * @property PanelModel
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
         * Get all modules
         * @memberOf PanelModel
         * @returns {Array}
         */
        getAllModules: function getAllModules() {
            return this.modules;
        },

        /**
         * Get all packages
         * @memberOf PanelModel
         * @returns {Array}
         */
        getAllPackages: function getAllPackages() {
            return this.packages;
        },

        /**
         * Get module by index
         * @memberOf PanelModel
         * @param {number} [index]
         * @returns {*}
         */
        getModule: function getModule(index) {
            var modules = this.getAllModules(),
                module = modules[index];
            return module ? module : modules;
        },

        /**
         * Get package by index
         * @memberOf PanelModel
         * @param {number} [index]
         * @returns {*}
         */
        getPackage: function getPackage(index) {
            var packages = this.getAllPackages(),
                packet = packages[index];
            return packet ? packet : packages;
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
                if (resource === modules[i].module.name.toDash()) {
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
         * Get package index
         * @memberOf PanelModel
         * @param resource
         * @returns {number}
         */
        getPackageIndex: function getPackageIndex(resource) {

            /**
             * Define local instance of modules
             * @type {Array}
             */
            var packages = this.packages;

            for (var i = 0, l = packages.length; i < l; i++) {
                if (resource === packages[i].name.toDash()) {
                    return i;
                }
            }

            this.scope.logger.error(
                'Undefined package index',
                resource,
                packages
            );
        }

    }, BaseModel.prototype);
});