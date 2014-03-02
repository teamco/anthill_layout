/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget'
], function defineYoutubeController(PluginBase, WidgetBase) {

    /**
     * Define youtube controller
     * @class Controller
     * @mixin {BaseController}
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend({

        /**
         * Set embedded content
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$youtube.renderEmbeddedContent(
                this.model.getUrl()
            );
        },

        /**
         * Get preferences
         * @returns {{}|{url: string}}
         */
        getPreferences: function getPreferences() {
            return this.model.preferences;
        },

        /**
         * Update prefs
         * @param $input
         */
        updatePreferences: function updatePreferences($modal) {

            this.model.setUrl(
                $('input', $modal.$).val()
            );

            this.scope.view.renderYoutube();

            $modal.selfDestroy();
        }

    }, PluginBase.prototype, WidgetBase.prototype);
});