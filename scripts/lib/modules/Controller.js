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
        setOrder: function setOrder(collector) {
            this[this.scope].config.order = this.base.define(
                this[this.scope].config.order,
                this.base.lib.hash.hashLength(collector)
            );
        }
    }, Base);
});