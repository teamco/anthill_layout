/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineSportExpressEventManager(WidgetContentEventManager) {

    /**
     * Define SportExpress event manager
     * @class SportExpressEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var SportExpressEventManager = function SportExpressEventManager() {

        this.updateEventList({});
    };

    return SportExpressEventManager.extend('SportExpressEventManager', {

    }, WidgetContentEventManager.prototype);
});
