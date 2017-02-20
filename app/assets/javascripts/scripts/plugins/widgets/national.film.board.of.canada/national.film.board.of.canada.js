/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/national.film.board.of.canada/mvc/national.film.board.of.canada.controller',
  'plugins/widgets/national.film.board.of.canada/mvc/national.film.board.of.canada.model',
  'plugins/widgets/national.film.board.of.canada/mvc/national.film.board.of.canada.view',
  'plugins/widgets/national.film.board.of.canada/mvc/national.film.board.of.canada.event.manager',
  'plugins/widgets/national.film.board.of.canada/mvc/national.film.board.of.canada.permission'
], function defineNationalFilmBoardOfCanada(AntHill, MVC, Controller, Model,
    View, EventManager, Permission) {

  /**
   * Define NationalFilmBoardOfCanada
   * @param containment
   * @param [opts]
   * @constructor
   * @class NationalFilmBoardOfCanada
   * @extends AntHill
   */
  var NationalFilmBoardOfCanada = function NationalFilmBoardOfCanada(containment,
      opts) {

    /**
     * Define containment
     * @property NationalFilmBoardOfCanada
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property NationalFilmBoardOfCanada
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
     * @property NationalFilmBoardOfCanada
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

  return NationalFilmBoardOfCanada.extend('NationalFilmBoardOfCanada', {},
      AntHill.prototype);
});
