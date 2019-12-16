/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseEvent} from '../../modules/Event';

/**
 * @class LayoutEventManager
 * @extends BaseEvent
 */
export class LayoutEventManager extends BaseEvent {

  /**
   * Define LayoutEvent Manager
   * @constructor
   * @param {string} name
   * @param {Layout} scope
   */
  constructor(name, scope) {
    super(name || 'LayoutEventManager', scope);

    /**
     * Define events
     * @property LayoutEventManager
     * @type {{}}
     */
    this.events = {};

    /**
     * Define event list
     * @property LayoutEventManager
     * @type {{
     *  updateNumberOfColumns: string,
     *  updateMinCellWidth: string,
     *  beforeNestedOrganizer: string,
     *  afterNestedOrganizer: string,
     *  beforeExpand: string,
     *  onExpand: string,
     *  afterExpand: string,
     *  setOrganizeMode: string,
     *  setBehaviorMode: string,
     *  setEmptySpacesMode: string,
     *  toggleGrid: string
     * }}
     */
    this.eventList = {
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
    };
  }
}