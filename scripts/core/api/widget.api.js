/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/base',
    'modules/api'
], function defineWidgetAPI(Base, BaseAPI) {

    /**
     * Define Widget API
     * @constructor
     */
    var API = function API() {

    };

    return API.extend({
        destroyDrag: function destroyDrag() {
            var scope = this.scope;
            scope.observer.publish(
                scope.eventmanager.eventList.destroyDrag
            );
        },
        initDrag: function initDrag() {
            var scope = this.scope;
            scope.observer.publish(
                scope.eventmanager.eventList.initDrag
            );
        },
        destroyResize: function destroyResize() {
            var scope = this.scope;
            scope.observer.publish(
                scope.eventmanager.eventList.destroyResize
            );
        },
        initResize: function initResize() {
            var scope = this.scope;
            scope.observer.publish(
                scope.eventmanager.eventList.initResize
            );
        }


    }, Base, BaseAPI.prototype);
});