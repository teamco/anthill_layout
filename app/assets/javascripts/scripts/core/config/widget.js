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
 * @class Widget
 * @extends AntHill
 */
module.exports = class Widget extends AntHill {

  /**
   * @param opts
   * @constructor
   */
  constructor(opts) {
    super('Widget', null, true);

    (require('./permissions/widget.permissions.js'))();
    (require('./listeners/widget.listeners.js'))();

    /**
     * @constant WidgetAPI
     * @type {module.WidgetAPI}
     */
    const WidgetAPI = require('../api/widget.api.js');

    /**
     * @constant WidgetController
     * @type {module.WidgetController}
     */
    const WidgetController = require('../controller/widget.controller.js');

    /**
     * @constant WidgetModel
     * @type {module.WidgetModel}
     */
    const WidgetModel = require('../model/widget.model.js');

    /**
     * @constant WidgetView
     * @type {module.WidgetView}
     */
    const WidgetView = require('../view/widget.view.js');

    /**
     * @constant WidgetEventManager
     * @type {module.WidgetEventManager}
     */
    const WidgetEventManager = require('../event/widget.event.manager.js');

    /**
     * @constant WidgetPermission
     * @type {module.WidgetPermission}
     */
    const WidgetPermission = require('../permission/widget.permission.js');

    /**
     * @constant MVC
     * @type {module.MVC}
     */
    const MVC = require('../lib/modules/MVC.js');
    
    /**
     * Define dom
     * @property Widget
     * @type {*}
     */
    this.dom = opts.dom || {};

    /**
     * @constant DEFAULTS
     * @type {{
     *  preferences: (*|{}),
     *  rules: (*|{}),
     *  limit: boolean,
     *  metamorphic: boolean,
     *  order: number,
     *  html: {
     *    header: boolean,
     *    footer: boolean,
     *    frameLess: boolean,
     *    style: string,
     *    zIndex: number,
     *    dimensions: {width: number, height: number}
     *  },
     *  type: string,
     *  maximize: boolean,
     *  attributes: {magnet: string, freeze: boolean},
     *  events: {
     *    draggable: {
     *      snap: boolean,
     *      axis: boolean,
     *      scroll: boolean,
     *      connectToSortable: boolean,
     *      delay: number,
     *      distance: number,
     *      scrollSensitivity: number,
     *      scrollSpeed: number,
     *      cursor: string,
     *      appendTo: string,
     *      cancel: string,
     *      containment: string
     *    },
     *    resizable: {handles: string, containment: string},
     *    droppable: {activeClass: string, hoverClass: string, greedy: boolean, tolerance: string}
     *  }
     * }}
     */
    const DEFAULTS = {
      preferences: opts.preferences || {},
      rules: opts.rules || {},
      limit: false,
      metamorphic: false,
      order: 1,
      html: {
        header: false,
        footer: false,
        frameLess: false,
        style: '',
        zIndex: 0,
        dimensions: {
          width: 5,
          height: 5
        }
      },
      type: 'default',
      maximize: false,
      attributes: {
        magnet: 'none', // {none|+|-}
        freeze: false
      },
      events: {
        draggable: {
          snap: false,
          axis: false,
          scroll: true,
          connectToSortable: false,
          delay: 300,
          distance: 20,
          scrollSensitivity: 100,
          scrollSpeed: 100,
          cursor: 'move',
          appendTo: 'parent',
          cancel: '.ui-resizable-handle',
          containment: 'parent'
        },
        resizable: {
          handles: 'all',
          containment: 'parent'
        },
        droppable: {
          activeClass: 'widget-ui-hover',
          hoverClass: 'widget-ui-active',
          greedy: true,
          tolerance: 'pointer'
        }
      }
    };

    /**
     * Define constants
     * @property Widget
     * @type {{magnet: Array}}
     */
    this.CONSTANTS = {
      magnet: ['none', '+', '-']
    };

    /**
     * Transfer content events
     * @property Widget
     * @type {{}}
     */
    this.contentEvents = {};

    /**
     * Transfer content rules
     * @property Widget
     * @type {{}}
     */
    this.contentRules = {};

    /**
     * Define MVC
     * @property Widget
     * @type {MVC}
     */
    new MVC({
      scope: this,
      config: [opts.config, DEFAULTS],
      components: [
        WidgetController,
        WidgetAPI,
        WidgetModel,
        WidgetView,
        WidgetEventManager,
        WidgetPermission
      ],
      render: true
    });

    /**
     * @constant WidgetMap
     * @type {module.WidgetMap}
     */
    const WidgetMap = require('../controller/widget/widget.map.js');

    /**
     * Define map
     * @property Widget
     * @type {module.WidgetMap}
     */
    this.map = new WidgetMap(this);

    /**
     * @constant Wireframe
     * @type {module.Wireframe}
     */
    const Wireframe = require('../controller/widget/widget.wireframe.js');

    /**
     * @property Widget
     * @type {module.Wireframe}
     */
    this.wireframe = new Wireframe(this);

    /**
     * Define interactions: Drag/Resize/Drop
     * @property Widget
     * @type {{
     *  draggable: module.WidgetDrag,
     *  resizable: module.WidgetResize,
     *  droppable: undefined
     * }}
     */
    this.interactions = {};

    /**
     * Define draggable interaction
     * @property Widget.interactions
     * @type {module.WidgetDrag}
     */
    this.interactions.widgetdrag = undefined;

    /**
     * Define resizable interaction
     * @property Widget.interactions
     * @type {module.WidgetResize}
     */
    this.interactions.widgetresize = undefined;

    /**
     * Init content
     * @property Widget
     * @type {WidgetContent}
     */
    this.content = undefined;

    /**
     * Init expanded
     * @property Widget
     * @type {boolean}
     */
    this.expanded = false;

    this.observer.publish(this.eventManager.eventList.successCreated);
  };
};