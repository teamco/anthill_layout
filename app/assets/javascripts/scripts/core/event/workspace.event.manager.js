/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    ['modules/Event'],

    /**
     * Define WorkspaceEventManager
     * @param {BaseEvent} BaseEvent
     * @returns {*}
     */
        function defineWorkspaceEventManager(BaseEvent) {

        /**
         * Define workspace event manager
         * @class EventManager
         * @constructor
         * @extends BaseEvent
         */
        var WorkspaceEventManager = function WorkspaceEventManager() {

            /**
             * Define events
             * @member WorkspaceEventManager
             * @type {{}}
             */
            this.events = {};
        };

        return WorkspaceEventManager.extend('WorkspaceEventManager', {

            /**
             * Define event list
             * @member WorkspaceEventManager
             * @type {{
             *      bindHashChange: string,
             *      createPage: string,
             *      destroyPage: string,
             *      destroyPages: string,
             *      resizePages: string,
             *      resizePage: string,
             *      setPageContainerDimensions: string,
             *      beforeSwitchToPage: string,
             *      switchToPage: string,
             *      afterSwitchToPage: string,
             *      adoptContentWidth: string
             * }}
             */
            eventList: {
                bindHashChange: 'bind.hash.change',
                createPage: 'create.page',
                destroyPage: 'destroy.page',
                destroyPages: 'destroy.pages',
                resizePage: 'resize.page',
                resizePages: 'resize.pages',
                setPageContainerDimensions: 'set.page.container.dimensions',
                beforeSwitchToPage: 'before.switch.to.page',
                switchToPage: 'switch.to.page',
                afterSwitchToPage: 'after.switch.to.page',
                adoptContentWidth: 'adopt.content.width'
            }

        }, BaseEvent.prototype);
    }
);