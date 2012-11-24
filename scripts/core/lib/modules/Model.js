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
        checkLimit: function checkLimit(constructor, collector, limit) {
            var base = this.base,
                namespace = this.getNameSpace(constructor),
                limit = base.isDefined(limit) ?
                    limit :
                    this.getConfig()[namespace].limit;
            if (!base.isDefined(limit)) {
                return false;
            }
            return base.lib.hash.hashLength(collector) >= limit;

        },
        updateCollector: function updateCollector(constructor, opts, collector) {
            var namespace = this.getNameSpace(constructor),
                limit = this.getConfig()[namespace].limit,
                scope = this.scope,
                cname = constructor.getConstructorName();
            if (this.checkLimit(constructor, collector, limit)) {
                scope.logger.warn(
                     cname + ': Maximum limit reached',
                    limit
                );
                return false;
            }

            var base = this.base,
                component = new constructor(base.define(opts, {}, true));

            if (base.isDefined(component.model)) {
                collector[component.model.getUUID()] = component;
            } else {
                scope.logger.warn(
                    cname + ' was created with some errors',
                    component
                );
            }

            this.scope.config[namespace].counter =
                base.lib.hash.hashLength(collector);
            return component;
        }
    }, Base);

});