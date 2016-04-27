/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineOumyEventManager(WidgetContentEventManager) {

    /**
     * Define Oumy event manager
     * @class OumyEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var OumyEventManager = function OumyEventManager() {

        this.updateEventList({});
    };

    return OumyEventManager.extend(
        'OumyEventManager', {},
        WidgetContentEventManager.prototype
    );
});
