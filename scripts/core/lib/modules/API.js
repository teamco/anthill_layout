/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/base'
], function defineBaseAPI(Base) {
    var API = function API() {

    };

    return API.extend({
        _createItem: function _createItem(item, args, render, where) {
            var scope = this.scope,
                cname = item.name;
            scope.observer.publish(
                scope.eventmanager.eventList['create' + cname],
                args
            );

            this._renderItem(item, render, where);

            return scope[cname.toLowerCase()];
        },

        _renderItem: function _renderItem(item, render, where) {
            var scope = this.scope[item.name.toLowerCase()];
            if (this.base.defineBoolean(render, false, true)) {
                scope.view.render(where);
            }
            return scope;
        }

    }, Base)
});