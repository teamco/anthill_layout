/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/pet.passport/mvc/pet.passport.controller',
    'plugins/widgets/pet.passport/mvc/pet.passport.model',
    'plugins/widgets/pet.passport/mvc/pet.passport.view',
    'plugins/widgets/pet.passport/mvc/pet.passport.event.manager',
    'plugins/widgets/pet.passport/mvc/pet.passport.permission'
], function definePetPassport(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define PetPassport
     * @param containment
     * @param [opts]
     * @constructor
     * @class PetPassport
     * @extends AntHill
     */
    var PetPassport = function PetPassport(containment, opts) {

        /**
         * Define containment
         * @memberOf PetPassport
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf PetPassport
         * @type {*}
         */
        this.referrer = undefined;

        /**
         * Define defaults
         * @type {{
         *      plugin: boolean,
         *      html: {
         *          style: string,
         *          header: boolean,
         *          footer: boolean,
         *          floating: boolean,
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
            plugin: true,
            html: {
                style: 'default',
                header: false,
                footer: false,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        };

        /**
         * Define MVC
         * @memberOf PetPassport
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {uuid: this.containment.model.getContentUUID()},
                DEFAULTS
            ],
            components: [
                Controller,
                Model,
                View,
                EventManager,
                Permission
            ],
            render: true
        });

        this.observer.publish(
            this.eventmanager.eventList.initWidget,
            opts
        );
    };

    return PetPassport.extend('PetPassport', {

    }, AntHill.prototype);
});