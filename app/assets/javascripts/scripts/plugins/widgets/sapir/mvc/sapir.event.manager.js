/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineSapirEventManager(WidgetContentEventManager) {

    /**
     * Define Sapir event manager
     * @class SapirEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var SapirEventManager = function SapirEventManager() {

        this.updateEventList({});
    };

    return SapirEventManager.extend(
        'SapirEventManager', {},
        WidgetContentEventManager.prototype
    );
});
