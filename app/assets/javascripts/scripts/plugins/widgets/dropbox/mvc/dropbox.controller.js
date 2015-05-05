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
         * @memberOf DropboxController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$dropbox.renderEmbeddedContent({
                url: this.model.getPrefs('dropboxUrl'),
                download: this.model.getPrefs('dropboxDownload')
            });
        },

        /**
         * Set hidden preferences
         * @memberOf DropboxController
         * @param {string} preference
         * @param value
         */
        setHiddenPreferences: function setHiddenPreferences(preference, value) {
            this.model.setPrefs(preference, value);

            this.scope.observer.publish(
                this.scope.eventManager.eventList.transferContentPreferences,
                [preference, value]
            );
        },

        /**
         * Add Dropbox rule
         * @memberOf DropboxController
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
                scope.eventManager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});