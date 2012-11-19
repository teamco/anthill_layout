/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */

define(['modules/base'], function initModel(Base) {
    var BaseModel = function BaseModel() {

    };

    return BaseModel.extend({
        getConfig: function getConfig() {
            return this[this.scope].config;
        },
        getUUID: function getUUID() {
            return this.getConfig().uuid;
        },
        getOrder: function getOrder() {
            return this.getConfig().order;
        },
        updateCounter: function updateCounter(collector) {
            var index,
                length = this.base.lib.hash.hashLength(collector);
            for (index in collector) {
                if(collector.hasOwnProperty(index)) {
                    var component = collector[index];
                    component.config.counter = length;
                }
            }
            return length;
        },
        updateCollector: function updateCollector(component, collector) {
            collector[component.model.getUUID()] = component;
            this.updateCounter(collector);
            return component;
        }
    }, Base);

});