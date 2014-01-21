/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/model',
    'modules/setting',
    'config/workspace'
], function (BaseModel, Setting, Workspace) {

    /**
     * Define Application model
     * @mixin BaseModel
     * @extends Base
     * @class Model
     * @constructor
     */
    var Model = function Model() {

        /**
         * Define item
         * @type {Workspace}
         */
        this.item = Workspace;

        /**
         * Application hierarchy
         * @type {string[]}
         */
        this.hierarchy = [
            'workspace',
            'page',
            'widget'
        ];
    };

    return Model.extend({

        /**
         * Define global setting
         */
        defineSetting: function defineSetting() {

            /**
             * Define setting
             * @type {config.setting}
             */
            this.setting = new Setting(
                this.scope.controller.getMode(),
                this.getConfig('appName')
            );

            this.scope.logger.debug('Define setting', this.setting);
        },

        /**
         * Load data
         */
        loadData: function loadData() {

            var data = this.setting.load();

            if (!data.hasOwnProperty('collector')) {
                return false;
            }

            for (var i = 0, l = this.hierarchy.length; i < l; i++) {

                var cname = this.hierarchy[i],
                    collector = this.base.define(data.collector, {}, true);

                if (collector.hasOwnProperty(cname)) {

                    for (var index in collector[cname]) {

                        if (collector[cname].hasOwnProperty(index)) {

                            var node = collector[cname][index];

                            console.log(node)
                        }

                    }
                }
            }

            return data.collector;

        }

    }, BaseModel.prototype);

});