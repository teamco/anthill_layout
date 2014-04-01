/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineStatisticsModel(BaseModel) {

    /**
     * Define Statistics model
     * @extends BaseModel
     * @class StatisticsModel
     * @constructor
     */
    var StatisticsModel = function StatisticsModel() {

        /**
         * Define preferences
         * @member StatisticsModel
         */
        this.preferences = {
            statisticsText: {
                type: 'text',
                disabled: false,
                value: undefined
            }
        };

        /**
         * Define rules
         * @member StatisticsModel
         * @type {{}}
         */
        this.rules = {};

        this.stats = {};
    };

    return StatisticsModel.extend('StatisticsModel', {

        /**
         * Set Statistics Text
         * @member StatisticsModel
         * @param {string} text
         */
        setStatisticsText: function setStatisticsText(text) {
            this.setPrefs('statisticsText', text);
        },

        storeData: function storeData(uuid, $element) {

            this.stats[uuid] = this.base.define(this.stats[uuid], {}, true);

            this.stats[uuid][$element] = this.base.define(this.stats[uuid][$element], 0, true);

            this.stats[uuid][$element] += 1;

            console.log(this.stats[uuid]);
        }


    }, BaseModel.prototype);
});