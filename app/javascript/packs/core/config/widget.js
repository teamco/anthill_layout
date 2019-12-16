/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

import {AntHill} from './anthill';
import {widgetLocalListeners} from './listeners/widget.listeners';
import {widgetLocalPermission} from './permissions/widget.permissions';
import {MVC} from '../../modules/MVC';
import {WidgetController} from '../controller/widget.controller';
import {WidgetAPI} from '../api/widget.api';
import {WidgetModel} from '../model/widget.model';
import {WidgetView} from '../view/widget.view';
import {WidgetEventManager} from '../event/widget.event.manager';
import {WidgetPermission} from '../permission/widget.permission';
import {WidgetMap} from '../controller/widget/widget.map';
import {Wireframe} from '../controller/widget/widget.wireframe';

/**
 * @class Widget
 * @extends AntHill
 */
export class Widget extends AntHill {

  /**
   * @param opts
   * @constructor
   */
  constructor(opts) {
    super('Widget', null, true);

    widgetLocalListeners();
    widgetLocalPermission();

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
      order: 0,
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
     * Define map
     * @property Widget
     * @type {WidgetMap}
     */
    this.map = new WidgetMap(this);

    /**
     * @property Widget
     * @type {Wireframe}
     */
    this.wireframe = new Wireframe(this);

    /**
     * Define interactions: Drag/Resize/Drop
     * @property Widget
     * @type {{
     *  draggable: WidgetDrag,
     *  resizable: WidgetResize,
     *  droppable: undefined
     * }}
     */
    this.interactions = {};

    /**
     * Define draggable interaction
     * @property Widget.interactions
     * @type {WidgetDrag}
     */
    this.interactions.widgetdrag = undefined;

    /**
     * Define resizable interaction
     * @property Widget.interactions
     * @type {WidgetResize}
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
  }
}