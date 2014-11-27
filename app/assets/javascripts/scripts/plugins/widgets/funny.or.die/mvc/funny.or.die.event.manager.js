/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineFunnyOrDieEventManager(WidgetContentEventManager) {

    /**
     * Define FunnyOrDie event manager
     * @class FunnyOrDieEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var FunnyOrDieEventManager = function FunnyOrDieEventManager() {

        this.updateEventList({});
    };

    return FunnyOrDieEventManager.extend('FunnyOrDieEventManager', {

    }, WidgetContentEventManager.prototype);
});
