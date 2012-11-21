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
        getConfig: function getConfig(log, hash) {
            this.logger.debug(log, hash);
        },
        setOrder: function setOrder(collector) {
            var scope = this.scope,
                base = this.base;
            scope.config.order = base.define(
                scope.config.order,
                base.lib.hash.hashLength(collector)
            );
        }
    }, Base);
});