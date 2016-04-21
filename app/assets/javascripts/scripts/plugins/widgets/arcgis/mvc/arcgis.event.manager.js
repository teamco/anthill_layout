/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineArcgisEventManager(WidgetContentEventManager) {

    /**
     * Define Arcgis event manager
     * @class ArcgisEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ArcgisEventManager = function ArcgisEventManager() {

        this.updateEventList({});
    };

    return ArcgisEventManager.extend(
        'ArcgisEventManager', {},
        WidgetContentEventManager.prototype
    );
});
