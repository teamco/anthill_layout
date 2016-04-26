/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePaypalButtonEventManager(WidgetContentEventManager) {

    /**
     * Define PaypalButton event manager
     * @class PaypalButtonEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PaypalButtonEventManager = function PaypalButtonEventManager() {

        this.updateEventList({});
    };

    return PaypalButtonEventManager.extend(
        'PaypalButtonEventManager', {},
        WidgetContentEventManager.prototype
    );
});
