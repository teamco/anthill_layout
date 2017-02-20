/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/speaker.deck/mvc/speaker.deck.controller',
  'plugins/widgets/speaker.deck/mvc/speaker.deck.model',
  'plugins/widgets/speaker.deck/mvc/speaker.deck.view',
  'plugins/widgets/speaker.deck/mvc/speaker.deck.event.manager',
  'plugins/widgets/speaker.deck/mvc/speaker.deck.permission'
], function defineSpeakerDeck(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define SpeakerDeck
   * @param containment
   * @param [opts]
   * @constructor
   * @class SpeakerDeck
   * @extends AntHill
   */
  var SpeakerDeck = function SpeakerDeck(containment, opts) {

    /**
     * Define containment
     * @property SpeakerDeck
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property SpeakerDeck
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
     * @property SpeakerDeck
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

  return SpeakerDeck.extend('SpeakerDeck', {}, AntHill.prototype);
});
