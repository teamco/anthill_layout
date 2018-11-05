/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant AntHill
 * @type {module.AntHill}
 */
const AntHill = require('./anthill.js');

/**
 * Define Layout
 * @class Layout
 * @extends AntHill
 */
module.exports = class Layout extends AntHill {

  /**
   * @constructor
   * @param opts
   * @param {Page} containment
   */
  constructor(opts, containment) {
    super('Layout', null, true);

    (require('./permissions/layout.permissions.js'))();
    (require('./listeners/layout.listeners.js'))();

    /**
     * @constant LayoutController
     * @type {module.LayoutController}
     */
    const LayoutController = require('../controller/layout.controller.js');

    /**
     * @constant LayoutEventManager
     * @type {module.LayoutEventManager}
     */
    const LayoutEventManager = require('../event/layout.event.manager.js');

    /**
     * @constant LayoutPermission
     * @type {module.LayoutPermission}
     */
    const LayoutPermission = require('../permission/layout.permission.js');

    /**
     * @constant MVC
     * @type {module.MVC}
     */
    const MVC = require('../lib/modules/MVC.js');

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
     * @constant LayoutOverlapping
     * @type {module.LayoutOverlapping|*}
     */
    const LayoutOverlapping = require('../controller/layout/layout.overlapping.js');

    /**
     * Define overlapping
     * @property Layout
     * @type {module.LayoutOverlapping}
     */
    this.overlapping = new LayoutOverlapping(this);

    /**
     * @constant LayoutEmptyRows
     * @type {module.LayoutEmptyRows|*}
     */
    const LayoutEmptyRows = require('../controller/layout/layout.empty.rows.js');

    /**
     * Define empty rows
     * @property Layout
     * @type {module.LayoutEmptyRows}
     */
    this.emptyRows = new LayoutEmptyRows(this);

    /**
     * @constant LayoutEmptyColumns
     * @type {module.LayoutEmptyColumns|*}
     */
    const LayoutEmptyColumns = require('../controller/layout/layout.empty.columns.js');

    /**
     * Define empty columns
     * @property Layout
     * @type {module.LayoutEmptyColumns}
     */
    this.emptyColumns = new LayoutEmptyColumns(this);

    /**
     * @constant LayoutExpand
     * @type {module.LayoutExpand|*}
     */
    const LayoutExpand = require('../controller/layout/layout.expand.js');

    /**
     * Define expand
     * @property Layout
     * @type {module.LayoutExpand}
     */
    this.expand = new LayoutExpand(this);

    /**
     * @constant LayoutGrid
     * @type {module.LayoutGrid|*}
     */
    const LayoutGrid = require('../controller/layout/layout.grid.js');

    /**
     * Define grid
     * @property Layout
     * @type {module.LayoutGrid}
     */
    this.grid = new LayoutGrid(this);

    this.observer.publish(this.eventManager.eventList.successCreated);
  }
};