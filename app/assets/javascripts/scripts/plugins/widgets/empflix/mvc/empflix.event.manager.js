/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineEmpflixEventManager(WidgetContentEventManager) {

    /**
     * Define Empflix event manager
     * @class EmpflixEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var EmpflixEventManager = function EmpflixEventManager() {

        this.updateEventList({});
    };

    return EmpflixEventManager.extend('EmpflixEventManager', {

    }, WidgetContentEventManager.prototype);
});
