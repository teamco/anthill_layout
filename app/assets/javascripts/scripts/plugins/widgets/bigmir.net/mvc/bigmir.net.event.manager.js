/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineBigmirNetEventManager(WidgetContentEventManager) {

    /**
     * Define BigmirNet event manager
     * @class BigmirNetEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var BigmirNetEventManager = function BigmirNetEventManager() {

        this.updateEventList({});
    };

    return BigmirNetEventManager.extend('BigmirNetEventManager', {

    }, WidgetContentEventManager.prototype);
});
