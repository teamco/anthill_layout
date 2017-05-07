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
  'plugins/widgets/pizap.photo.editor/element/pizap.photo.editor.element',
  'plugins/widgets/pizap.photo.editor/element/pizap.photo.editor.preferences.element',
  'plugins/widgets/pizap.photo.editor/element/pizap.photo.editor.rules.element'
], function definePizapPhotoEditorView(BaseView, Header, Footer,
    PizapPhotoEditorElement, PizapPhotoEditorPreferencesElement,
    PizapPhotoEditorRulesElement) {

  /**
   * Define view
   * @class PizapPhotoEditorView
   * @extends BaseView
   * @constructor
   */
  var PizapPhotoEditorView = function PizapPhotoEditorView() {
  };

  return PizapPhotoEditorView.extend('PizapPhotoEditorView', {

    /**
     * Render PizapPhotoEditor element
     * @memberOf PizapPhotoEditorView
     */
    renderPizapPhotoEditor: function renderPizapPhotoEditor() {

      this.header(Header, this.get$container());

      /**
       * Define $pizapphotoeditor
       * @type {PizapPhotoEditorElement}
       */
      this.elements.$pizapphotoeditor = new PizapPhotoEditorElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf PizapPhotoEditorView
     * @returns {PizapPhotoEditorPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define PizapPhotoEditor Preferences Element
       * @type {PizapPhotoEditorPreferencesElement}
       */
      this.elements.$preferences =
          new PizapPhotoEditorPreferencesElement(this, {
            data: this.controller.getPreferences()
          });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf PizapPhotoEditorView
     * @param widgetRules
     * @param contentRules
     * @returns {PizapPhotoEditorRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define PizapPhotoEditor Rules Element
       * @type {PizapPhotoEditorRulesElement}
       */
      this.elements.$rules = new PizapPhotoEditorRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render PizapPhotoEditor
     * @memberOf PizapPhotoEditorView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderPizapPhotoEditor.bind(this)
      );
    }

  }, BaseView.prototype);
});
