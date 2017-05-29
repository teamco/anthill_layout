/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Event'
], function defineLayoutEventManager(BaseEvent) {

  /**
   * Define layout event manager
   * @class LayoutEventManager
   * @extends BaseEvent
   * @constructor
   */
  var LayoutEventManager = function LayoutEventManager() {

    /**
     * Define events
     * @memberOf LayoutEventManager
     * @type {{}}
     */
    this.events = {};
  };

  return LayoutEventManager.extend('LayoutEventManager', {

    /**
     * Define event list
     * @memberOf LayoutEventManager
     * @type {{
     *      updateNumberOfColumns: string,
     *      updateMinCellWidth: string,
     *      beforeNestedOrganizer: string,
     *      afterNestedOrganizer: string,
     *      beforeExpand: string,
     *      onExpand: string,
     *      afterExpand: string,
     *      setOrganizeMode: string,
     *      setBehaviorMode: string,
     *      setEmptySpacesMode: string,
     *      toggleGrid: string
     * }}
     */
    eventList: {
      updateNumberOfColumns: 'update.number.of.columns',
      updateMinCellWidth: 'update.min.cell.width',
      beforeNestedOrganizer: 'before.nested.organizer',
      afterNestedOrganizer: 'after.nested.organizer',
      beforeExpand: 'before.expand',
      onExpand: 'on.expand',
      afterExpand: 'after.expand',
      setOrganizeMode: 'set.organize.mode',
      setBehaviorMode: 'set.behavior.mode',
      setEmptySpacesMode: 'set.empty.spaces.mode',
      toggleGrid: 'toggle.grid'
    }

  }, BaseEvent.prototype);
});