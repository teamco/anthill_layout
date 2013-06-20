/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/mvc',
    'controller/layout.controller',
    'event/layout.event.manager',
    'controller/layout/layout.overlapping',
    'controller/layout/layout.empty.rows',
    'controller/layout/layout.empty.columns',
    'permission/layout.permission'
], function defineLayout(Base, MVC, Controller, EventManager, Overlapping, EmptyRows, EmptyColumns, Permission) {

    /**
     * Define Layout
     * @class Layout
     * @extends {Base}
     * @mixin MVC
     */
    var Layout = function Layout(opts, page) {

        /**
         * Define default config
         * @type {{
         *      type: string,
         *      limit: boolean,
         *      parent: Page,
         *      grid: {
         *          columns: number,
         *          widgetsPerRow: number,
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
            parent: page,
            grid: {
                columns: 60,
                widgetsPerRow: 3,
                additionalRows: 1,
                margin: 1,
                padding: {
                    top: 14,
                    right: 0,
                    bottom: 0,
                    left: 14
                }
            }
        };

        /**
         * Define constants
         * @type {{organize: Array, emptySpaces: Array}}
         */
        this.CONSTANTS = {
            organize: ['none', 'row', 'column'],
            emptySpaces: ['none', 'row', 'column']
        };

        /**
         * Define MVC
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
         * @type {Overlapping}
         */
        this.overlapping = new Overlapping(this);

        /**
         * Define empty rows
         * @type {EmptyRows}
         */
        this.emptyRows = new EmptyRows(this);

        /**
         * Define empty columns
         * @type {EmptyColumns}
         */
        this.emptyColumns = new EmptyColumns(this);

        this.observer.publish(this.eventmanager.eventList.successCreated);
    };

    return Layout.extend(Base);
});
