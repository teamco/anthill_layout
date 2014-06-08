/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineDropboxController(PluginBase, WidgetContentController) {

    /**
     * Define Dropbox controller
     * @class DropboxController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var DropboxController = function DropboxController() {
    };

    return DropboxController.extend('DropboxController', {

        /**
         * Set embedded content
         * @member DropboxController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$dropbox.renderEmbeddedContent({
                url: this.model.getPrefs('dropboxUrl'),
                download: this.model.getPrefs('dropboxDownload')
            });
        },

        /**
         * Set hidden preferences
         * @member DropboxController
         * @param {string} preference
         * @param value
         */
        setHiddenPreferences: function setHiddenPreferences(preference, value) {
            this.model.setPrefs(preference, value);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.transferPreferences,
                [preference, value]
            );
        },

        /**
         * Add Dropbox rule
         * @member DropboxController
         * @param e
         */
        addDropboxRule: function addDropboxRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});