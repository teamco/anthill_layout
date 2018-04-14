/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'config/anthill',
  'modules/MVC',
  'controller/layout.controller',
  'event/layout.event.manager',
  'controller/layout/layout.overlapping',
  'controller/layout/layout.empty.rows',
  'controller/layout/layout.empty.columns',
  'controller/layout/layout.expand',
  'controller/layout/layout.grid',
  'permission/layout.permission'
], function defineLayout(AntHill, MVC, Controller, EventManager, Overlapping,
    LayoutEmptyRows, LayoutEmptyColumns, LayoutExpand, LayoutGrid, Permission) {

  /**
   * Define Layout
   * @class Layout
   * @extends AntHill
   */
  var Layout = function Layout(opts, containment) {

    /**
     * Define default config
     * @type {{
     *      type: string,
     *      limit: boolean,
     *      containment: Page|Widget,
     *      grid: {
     *          columns: number,
     *          additionalRows: number,
     *          margin: number,
     *          padding: {
     *              top: number,
     *              right: number,
     *              bottom: number,
     *              left: number
     *          }
     *      }
     * }}
     */
    var DEFAULTS = {
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
     * @type {MVCJs}
     */
    this.mvc = new MVC({
      scope: this,
      config: [opts, DEFAULTS],
      components: [
        Controller,
        EventManager,
        Permission
      ],
      render: false
    });

    /**
     * Define overlapping
     * @property Layout
     * @type {Overlapping}
     */
    this.overlapping = new Overlapping(this);

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
     * @type {LayoutExpand}
     */
    this.grid = new LayoutGrid(this);

    this.observer.publish(
        this.eventManager.eventList.successCreated
    );
  };

  return Layout.extend('Layout', {}, AntHill.prototype);
});
