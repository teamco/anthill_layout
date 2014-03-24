/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/mvc',
    'controller/layout.controller',
    'event/layout.event.manager',
    'controller/layout/layout.overlapping',
    'controller/layout/layout.empty.rows',
    'controller/layout/layout.empty.columns',
    'permission/layout.permission'
], function defineLayout(AntHill, MVC, Controller, EventManager, Overlapping, EmptyRows, EmptyColumns, Permission) {

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
                columns: 20,
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
         * @member Layout
         * @type {*}
         */
        this.containment = containment;

        /**
         * Define constants
         * @member Layout
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
         * Init observer
         * @member Layout
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Layout
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Define controller
         * @member Layout
         * @type {*}
         */
        this.controller = undefined;

        /**
         * Define permissions
         * @member Layout
         * @type {*}
         */
        this.permission = undefined;
        
        /**
         * Define MVC
         * @member Layout
         * @type {MVC}
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
         * @member Layout
         * @type {Overlapping}
         */
        this.overlapping = new Overlapping(this);

        /**
         * Define empty rows
         * @member Layout
         * @type {EmptyRows}
         */
        this.emptyRows = new EmptyRows(this);

        /**
         * Define empty columns
         * @member Layout
         * @type {EmptyColumns}
         */
        this.emptyColumns = new EmptyColumns(this);

        this.observer.publish(
            this.eventmanager.eventList.successCreated
        );
    };

    return Layout.extend('Layout', {

    }, AntHill.prototype);
});
