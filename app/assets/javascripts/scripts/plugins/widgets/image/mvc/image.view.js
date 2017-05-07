/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/View',
  'element/header.element',
  'element/footer.element',
  'plugins/widgets/image/element/image.element',
  'plugins/widgets/image/element/image.preferences.element',
  'plugins/widgets/image/element/image.rules.element'
], function defineImageView(BaseView, Header, Footer, ImageElement,
    ImagePreferencesElement, ImageRulesElement) {

  /**
   * Define view
   * @class ImageView
   * @extends BaseView
   * @constructor
   */
  var ImageView = function ImageView() {
  };

  return ImageView.extend('ImageView', {

    /**
     * Render image element
     * @memberOf ImageView
     */
    renderImage: function renderImage() {

      this.header(Header, this.get$container());

      /**
       * Define $image
       * @type {ImageElement}
       */
      this.elements.$image = new ImageElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.checkEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf ImageView
     * @returns {ImagePreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Image Preferences Element
       * @type {ImagePreferencesElement}
       */
      this.elements.$preferences = new ImagePreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf ImageView
     * @param widgetRules
     * @param contentRules
     * @returns {ImageRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Image Rules Element
       * @type {ImageRulesElement}
       */
      this.elements.$rules = new ImageRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render image
     * @memberOf ImageView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderImage.bind(this)
      );
    }

  }, BaseView.prototype)

});