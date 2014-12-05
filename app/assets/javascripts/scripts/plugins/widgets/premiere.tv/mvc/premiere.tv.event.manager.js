/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePremiereTvEventManager(WidgetContentEventManager) {

    /**
     * Define PremiereTv event manager
     * @class PremiereTvEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PremiereTvEventManager = function PremiereTvEventManager() {

        this.updateEventList({});
    };

    return PremiereTvEventManager.extend('PremiereTvEventManager', {

    }, WidgetContentEventManager.prototype);
});
