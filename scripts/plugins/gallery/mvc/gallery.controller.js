/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'modules/controller'
], function defineGalleryController(BaseController) {

    /**
     * Define gallery controller
     * @class Controller
     * @mixin {BaseController}
     * @constructor
     */
    var Controller = function Controller() {
    };

    Controller.extend({

        /**
         * Check if opened
         * @returns {boolean|*}
         */
        isOpened: function isOpened() {
            return this.scope.opened;
        },

        /**
         * Update opened
         * @param {Boolean} opened
         */
        setBehavior: function setBehavior(opened) {

            /**
             * Update opened instance
             */
            this.scope.opened = !!opened;
        }

    }, BaseController.prototype);

    /**
     * Copy successRendered
     * @type {Function}
     */
    var successRenderedSuper = Controller.prototype.successRendered.clone();

    /**
     * Overwrite success rendered
     */
    Controller.prototype.successRendered = function successRendered() {

        successRenderedSuper.bind(this)();
        this.view.renderGallery();
    };

    return Controller;

});