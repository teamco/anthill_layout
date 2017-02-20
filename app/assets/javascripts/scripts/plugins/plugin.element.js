define(['modules/Element'], function definePluginElement(BaseElement) {

  /**
   * Define Plugin element
   * @class PluginElement
   * @extends BaseElement
   * @extends Renderer
   * @constructor
   */
  var PluginElement = function PluginElement() {
  };

  return PluginElement.extend(
      'PluginElement', {

        /**
         * Bind show modal data
         * @memberOf PluginElement
         * @param {Widget} widget
         * @param {function} [callback]
         */
        bindShowModalData: function bindShowModalData(widget, callback) {

          /**
           * Click on
           * @param {Event} event
           * @private
           */
          function _clickOn(event) {

            event.preventDefault();

            scope.observer.publish(
                scope.eventmanager.eventList.prepareActiveComponent,
                [config, true, event, callback]
            );
          }

          /**
           * Get config
           * @type {*}
           */
          var config = widget.model.getConfig();

          // Get scope
          var scope = this.view.scope,
              clickOn = 'click.' + scope.name.toLowerCase();

          this.$.off(clickOn).on(clickOn, _clickOn);
          $('.popover').remove();
        },

        /**
         * Define trigger click Show Modal Data
         * @memberOf PluginElement
         */
        triggerShowModalData: function triggerShowModalData() {

          // Get scope
          var scope = this.view.scope,
              clickOn = 'click.' + scope.name.toLowerCase();

          this.$.trigger(clickOn);
        },

        /**
         * Locate widget before
         * @memberOf PluginElement
         * @param data
         */
        bindLocate: function bindLocate(data) {

          /**
           * Define scope
           * @type {WidgetRules}
           */
          var scope = this.view.scope;

          // Get location event
          var locateOn = 'mouseenter.rules mouseleave.rules';

          this.$.off(locateOn).on(
              locateOn,
              scope.controller.locateElementItem.bind({
                scope: scope,
                uuid: data.model.getUUID()
              })
          );
        },

        /**
         * Fetch External Resource Thumbnail
         * @memberOf PluginElement
         * @param {{is_external: boolean, external_resource: string, resource:
         *     string}} item
         * @returns {string}
         */
        fetchExternalResourceThumbnail: function fetchExternalResourceThumbnail(item) {

          var thumbnail = item.is_external ?
              item.external_resource :
              '/assets/scripts/plugins/stylesheets/';

          thumbnail += 'images/' + item.resource + '.png';

          return thumbnail;
        }

      }, BaseElement.prototype
  );
});
