/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePageTabsEventManager(WidgetContentEventManager) {

    /**
     * Define PageTabs event manager
     * @class PageTabsEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PageTabsEventManager = function PageTabsEventManager() {

        this.updateEventList({
            switchToPage: 'switch.to.page'
        });

        /**
         * Define onload events
         * @type {*[]}
         */
        this.onLoadEvents = [
            this.eventList.switchToPage
        ];
    };

    return PageTabsEventManager.extend('PageTabsEventManager', {

    }, WidgetContentEventManager.prototype);
});