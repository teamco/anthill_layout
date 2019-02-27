/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

import {AntHill} from './anthill';
import {LayoutController} from '../controller/layout.controller';
import {LayoutEventManager} from '../event/layout.event.manager';
import {LayoutPermission} from '../permission/layout.permission';
import {LayoutEmptyRows} from '../controller/layout/layout.empty.rows';
import {LayoutEmptyColumns} from '../controller/layout/layout.empty.columns';
import {LayoutOverlapping} from '../controller/layout/layout.overlapping';
import {LayoutExpand} from '../controller/layout/layout.expand';
import {LayoutGrid} from '../controller/layout/layout.grid';
import {layoutLocalPermission} from './permissions/layout.permissions';
import {layoutLocalListeners} from './listeners/layout.listeners';
import {MVC} from '../../modules/MVC';

/**
 * Define Layout
 * @class Layout
 * @extends AntHill
 */
export class Layout extends AntHill {

  /**
   * @constructor
   * @param opts
   * @param {Page} containment
   */
  constructor(opts, containment) {
    super('Layout', null, true);

    layoutLocalPermission();
    layoutLocalListeners();

    /**
     * Define default config
     * @type {{
     *  type: string,
     *  limit: boolean,
     *  containment: Page|Widget,
     *  grid: {
     *    columns: number,
     *    additionalRows: number,
     *    margin: number,
     *    padding: {top: number, right: number, bottom: number, left: number}
     *  }
     * }}
     */
    const DEFAULTS = {
      type: 'default',
      limit: true,
      containment: containment,
      grid: {
        columns: 256,
        additionalRows: 1,
        margin: 1,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    };

    /**
     * Define containment
     * @property Layout
     * @type {Page}
     */
    this.containment = containment;

    /**
     * Define constants
     * @property Layout
     * @type {{organize: *[], emptySpaces: *[]}}
     */
    this.CONSTANTS = {
      organize: [
        containment.ORGANIZE_MODES.none,
        containment.ORGANIZE_MODES.row,
        containment.ORGANIZE_MODES.column
      ],
      emptySpaces: [
        containment.ORGANIZE_MODES.none,
        containment.ORGANIZE_MODES.row,
        containment.ORGANIZE_MODES.column
      ]
    };

    /**
     * Define MVC
     * @property Layout
     * @type {MVC}
     */
    new MVC({
      scope: this,
      config: [opts, DEFAULTS],
      components: [
        LayoutController,
        LayoutEventManager,
        LayoutPermission
      ],
      render: false
    });

    /**
     * Define overlapping
     * @property Layout
     * @type {LayoutOverlapping}
     */
    this.overlapping = new LayoutOverlapping(this);

    /**
     * Define empty rows
     * @property Layout
     * @type {LayoutEmptyRows}
     */
    this.emptyRows = new LayoutEmptyRows(this);

    /**
     * Define empty columns
     * @property Layout
     * @type {LayoutEmptyColumns}
     */
    this.emptyColumns = new LayoutEmptyColumns(this);

    /**
     * Define expand
     * @property Layout
     * @type {LayoutExpand}
     */
    this.expand = new LayoutExpand(this);

    /**
     * Define grid
     * @property Layout
     * @type {LayoutGrid}
     */
    this.grid = new LayoutGrid(this);

    this.observer.publish(this.eventManager.eventList.successCreated);
  }
}