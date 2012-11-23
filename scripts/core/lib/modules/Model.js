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
            return this.scope.config;
        },
        getNameSpace: function getNameSpace(component) {
            var scope = this.base.isDefined(component) ?
                    component : this.scope,
                constructor = this.base.isFunction(scope) ?
                    scope : scope.constructor;

            return constructor.getConstructorName().toLowerCase();
        },
        getUUID: function getUUID() {
            return this.getConfig().uuid;
        },
        getOrder: function getOrder() {
            return this.getConfig().order;
        },
        checkLimit: function checkLimit(constructor, collector) {
            return this.base.lib.hash.hashLength(collector) <
                this.getConfig()[this.getNameSpace(constructor)].limit;
        },
        updateCollector: function updateCollector(constructor, opts, collector) {
            if (!this.checkLimit(constructor, collector)) {
                this.scope.logger.warn(
                    constructor.getConstructorName() + ': Maximum limit reached',
                    this.getConfig()[this.getNameSpace(constructor)].limit
                );
                return false;
            }

            var component = new constructor(this.base.define(opts, {}, true));
            collector[component.model.getUUID()] = component;
            this.scope.config[this.getNameSpace(constructor)].counter =
                this.base.lib.hash.hashLength(collector);
            return component;
        }
    }, Base);

});