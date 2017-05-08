/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define(
    ['plugins/plugin.element'],

    /**
     * Define WorkspaceDataAddPageElement
     * @param {PluginElement} PluginElement
     * @returns {*}
     */
    function defineWorkspaceDataAddPageElement(PluginElement) {

      /**
       * Define WorkspaceData AddPage Element
       * @constructor
       * @class WorkspaceDataAddPageElement
       * @extends Renderer
       * @extends PluginElement
       * @param {WorkspaceDataView} view
       * @param opts
       * @returns {WorkspaceDataAddPageElement}
       */
      var WorkspaceDataAddPageElement = function WorkspaceDataAddPageElement(view,
          opts) {

        this._config(view, opts, $('<li class="content" />')).build({
          $container: opts.$container,
          destroy: false
        });

        /**
         * Define title
         * @memberOf WorkspaceDataAddPageElement
         * @type {string}
         */
        this.title = 'Create new page';

        /**
         * Define description
         * @memberOf WorkspaceDataAddPageElement
         * @type {string}
         */
        this.description =
            'Clicking a button will take you to the edit page for the new widgets';

        return this.init();
      };

      return WorkspaceDataAddPageElement.extend(
          'WorkspaceDataAddPageElement', {

            /**
             * Define inner content
             * @memberOf WorkspaceDataContentElement
             */
            getTemplate: function getTemplate() {
              $('<a class="page add" />').appendTo(this.$);
            },

            /**
             * Define Init
             * @memberOf WorkspaceDataAddPageElement
             * @returns {WorkspaceDataAddPageElement}
             */
            init: function init() {

              this.setTitle(this.title);
              this.renderTooltip({
                title: this.title,
                description: this.description,
                selector: this.$
              });

              this.getTemplate();

              return this;
            },

            /**
             * Render add wizard
             * @memberOf WorkspaceDataAddPageElement
             * @param {Workspace} workspace
             * @returns {*|jQuery|HTMLElement}
             */
            renderWizard: function renderWizard(workspace) {

              /**
               * Define element
               * @type {WorkspaceDataAddPageElement}
               */
              var element = this;

              /**
               * Define _selectPageItems
               * @param {string} puuid
               * @private
               */
              function _selectPageItems(puuid) {

                /**
                 * Fetch page
                 * @type {Page}
                 */
                var page = workspace.model.getItemByUUID(puuid);

                // Clean container
                $items.empty();

                if (!page) {
                  element.view.scope.logger.debug('Empty page selected');
                  return false;
                }

                var items = page.model.getItems(),
                    index;

                var list = [];

                for (index in items) {
                  if (items.hasOwnProperty(index)) {
                    list.push(
                        $.extend(
                            {uuid: items[index].model.getUUID()},
                            items[index].model.getConfig('preferences')
                        )
                    );
                  }
                }

                $items.append(
                    element.renderListBox({
                      name: index,
                      text: text.trim(),
                      list: list,
                      disabled: false,
                      visible: true,
                      tooltip: true,
                      label: true,
                      multiple: true,
                      monitor: {
                        events: ['select.preview'],
                        callback: function _updateSelected() {
                          debugger
                        }
                      }
                    })
                );
              }

              var $ul = $('<ul />');

              var items = workspace.model.getItems();

              /**
               * Define clone pages
               * @type {Array}
               */
              var clonePages = $.map(items, function map(page) {

                var uuid = page.model.getUUID(),
                    title = page.model.getItemTitle(),
                    counter = page.model.getConfig('widget/counter'),
                    description = (uuid === title ? '' : title) + '<br />',
                    pluralize = 'items: ' + counter;

                return {
                  type: 'text',
                  value: uuid,
                  tooltip: description + pluralize
                };
              });

              // Add empty page
              clonePages.unshift({
                type: 'text',
                value: 'Empty page'
              });

              /**
               * Define title
               * @type {*|jQuery}
               */
              var $title = $('<li class="page-title-prefs" />').append(
                  element.renderTextField({
                    name: 'title',
                    text: 'Page title',
                    placeholder: 'Enter title',
                    disabled: false,
                    visible: true
                  })
              );

              var text = 'Clone from',
                  $cloneTemplate = $([
                    '<div class="input-group input-group-sm">',
                    '<span class="input-group-addon">', text, '</span>',
                    '</div>'
                  ].join(''));

              /**
               * Define clone from
               * @type {*|jQuery}
               */
              var $clone = $('<li />').append(
                  $cloneTemplate.append(
                      element.renderCombobox(
                          clonePages,
                          clonePages[0].value,
                          text,
                          'cloneItemContent', {
                            type: 'click.selectItems',
                            callback: _selectPageItems
                          },
                          true
                      )
                  )
              );

              var $items = $('<div class="page-items-prefs" />');

              return $ul.append([$clone, $title, $items]);
            }
          },
          PluginElement.prototype
      );
    }
);