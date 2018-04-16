/**
 * Define Production mode
 * @class ProductionController
 */
module.exports = class ProductionController {

  /**
   * Define is production checker
   * @property Production
   */
  isProduction() {

    // TODO until production
    return window.location.hostname !== 'localhost' || this.getEnvironment() === 'production';
  }

  /**
   * Define load production mode
   * @property Production
   */
  loadProduction() {
    // TODO
  }
};