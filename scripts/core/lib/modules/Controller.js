/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base'
], function defineBaseController(Base) {
    var BaseController = function BaseController() {

    };

    return BaseController.extend({
        getConfigLog: function getConfigLog(log, hash) {
            this.logger.debug(log, hash);
        },
        setOrder: function setOrder(collector) {
            var scope = this.scope,
                base = this.base;
            scope.config.order = base.define(
                scope.config.order,
                base.lib.hash.hashLength(collector)
            );
        },
        extendConfig: function extendConfig(opts) {
            return this.base.lib.hash.extendHash({
                html: {
                    container: [
                        '#', this.scope.model.getUUID(),
                        '-', this.scope.constructor.getConstructorName().toLowerCase()
                    ].join('')
                },
                parent: this.scope
            }, opts);
        },
        createItem: function createItem(opts) {
            var item = this.model.createItem(
                this.controller.extendConfig(opts)
            );
            this.logger.info(
                'Create ' + item.constructor.getConstructorName(),
                this.model.getUUID(item),
                item
            );
        },
        destroyItem: function destroyItem(item) {
            var items = this.model.destroyItem(item);
            this.logger.info(
                'Destroy ' + item.constructor.getConstructorName(),
                item,
                items
            );
        },
        destroyItems: function destroyItems() {
            var items = this.model.destroyItems();
            this.logger.info(
                'Destroy Items',
                items
            );
        },
        setInteraction: function setInteraction(event, callback) {
            this.scope.interactions[event] = callback;
            return this.getInteraction(event);
        },
        getInteraction: function getInteraction(event) {
            return this.scope.interactions[event];
        }
    }, Base);
});