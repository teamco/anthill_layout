/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:03 PM
 */

define([], function defineDebuggerPage() {

    /**
     * Define Debugger Page
     * @constructor
     */
    var DebuggerPage = function DebuggerPage() {
    };

    return DebuggerPage.extend({

        /**
         * Render page widgets actions
         * @returns {string}
         */
        renderPageWidgetsActions: function renderPageWidgetsActions() {
            return [
                '<ul class="page-widget-actions">',
                this._renderAddWidget(),
                this._renderRemoveWidget(),
                this._renderRemoveWidgets(),
                this._locateWidget(),
                this._enableEditMode(),
                '</ul>'
            ].join('');

        },

        /**
         * Render add new widget button
         * @returns {string}
         * @private
         */
        _renderAddWidget: function _renderAddWidget() {
            return '<li rel="disabled" class="add-widget disabled" title="Add widget">Add widget</li>';
        },

        /**
         * Render remove widget button
         * @returns {string}
         * @private
         */
        _renderRemoveWidget: function _renderRemoveWidget() {
            return '<li rel="disabled" class="remove-widget disabled select" title="Remove widget">Remove widget</li>';
        },

        /**
         * Render remove widgets button
         * @returns {string}
         * @private
         */
        _renderRemoveWidgets: function _renderRemoveWidgets() {
            return '<li rel="disabled" class="remove-widgets disabled  select" title="Remove widgets">Remove widgets</li>';
        },

        /**
         * Render locate widget button
         * @returns {string}
         * @private
         */
        _locateWidget: function _locateWidget() {
            return '<li rel="disabled" class="locate-widget disabled select" title="Locate widget">Locate widget</li>';
        },

        /**
         * Render enable edit mode
         * @returns {string}
         * @private
         */
        _enableEditMode: function _enableEditMode() {
            return '<li class="edit-mode" title="Edit mode">Edit mode</li>';
        },

        /**
         * Render page widgets info
         * @param {*} page
         * @returns {string}
         */
        renderPageWidgets: function renderPageWidgets(page) {
            var html = ['<li class="extend">', this.renderBlock('Widgets', [
                this.renderPageWidgetsActions(),
                this.renderInlineOf('Count', page),
                this.renderPageWidgetsList(page)
            ], true), '</li>'].join(' ');

            return html;
        },

        /**
         * Render page widgets list
         * @param page
         * @returns {string}
         */
        renderPageWidgetsList: function renderPageWidgetsList(page) {
            var html = ['<ul class="widgets-info">'];
            $.each(page.items, function each(uuid, widget) {
                html.push('<li class="' + widget.model.getConfig('type') + '">' + uuid + '</li>');
            });
            html.push('</ul>');
            return html.join('');
        },

        /**
         * Get page widget action button
         * @param {String} action
         * @returns {*|jQuery|HTMLElement}
         * @private
         */
        _getWidgetAction: function _getWidgetAction(action) {
            return $('ul.page-widget-actions li.' + action);
        },

        /**
         * Bind enable page widget edit mode,
         * @param {*} page
         */
        bindEnablePageWidgetsEditMode: function bindEnablePageWidgetsEditMode(page) {
            $('.edit-mode').on('click.edit', function edit(e) {
                this._enablePageWidgetsEditMode(e, page);
            }.bind(this));
        },

        _bindWidgetsList: function _bindWidgetsList() {
            $('ul.widgets-info li').on('click.select', function select(e) {
                var $li = $(e.target);
                if ($li.hasClass('select')) {
                    $li.removeClass('select');
                } else {
                    $li.addClass('select');
                }
            });
        },

        _unbindWidgetsList: function _unbindWidgetsList() {
            $('ul.widgets-info li').unbind('click.select');
        },

        /**
         * Enable page widget edit mode
         * @param {*} e
         * @param {*} page
         * @private
         */
        _enablePageWidgetsEditMode: function _enablePageWidgetsEditMode(e, page) {
            var $this = $(e.target),
                $disabled = $this.parent('ul').find('li[rel="disabled"]');
            if ($disabled.hasClass('disabled')) {
                $disabled.removeClass('disabled');
                $this.addClass('active');
                this._bindWidgetsList();
                this._bindAddNewWidget(page);
                this._bindRemoveWidget(page);
            } else {
                this._disablePageWidgetsEditMode($this, page);
            }
        },

        /**
         * Disable page widget edit mode
         * @param {*} $this
         * @param {*} page
         * @private
         */
        _disablePageWidgetsEditMode: function _disablePageWidgetsEditMode($this, page) {
            var $disabled = $this.parent('ul').find('li[rel="disabled"]');

            this.scope.logger.debug('Deactivate edit mode', page);
            $disabled.addClass('disabled');
            $this.removeClass('active');
            this._unbindAddNewWidget(page);
            this._unbindRemoveWidget(page);
            this._unbindWidgetsList();
        },

        /**
         * Bind add new widget
         * @param {*} page
         * @private
         */
        _bindAddNewWidget: function _bindAddNewWidget(page) {
            page.logger.debug('Bind edit mode');
            this._getWidgetAction('add-widget').on('click.add', function (e) {
                page.api.createWidget([], true)
            }.bind(this));
        },

        /**
         * Unbind add new widget
         * @param {*} page
         * @private
         */
        _unbindAddNewWidget: function _unbindAddNewWidget(page) {
            page.logger.debug('Unbind Add widget');
            this._getWidgetAction('add-widget').unbind('click.add');
        },

        /**
         * Bind remove widgets
         * @param page
         * @private
         */
        _bindRemoveWidget: function _bindRemoveWidget(page) {
            page.logger.debug('Bind remove widget');
            this._getWidgetAction('remove-widget').on('click.remove', function remove(e) {
                if (!$('ul.widgets-info li').hasClass('select')) {
                    page.logger.warn('Select widget before remove');
                    return false;
                }

                this._removeWidgets(page);
            }.bind(this));

        },

        /**
         * Unbind remove widgets
         * @param {*} page
         * @private
         */
        _unbindRemoveWidget: function _unbindRemoveWidget(page) {
            page.logger.debug('Unbind remove widget');
            this._getWidgetAction('remove-widget').unbind('click.remove');
            $('.widgets-info li').removeClass('select');
        },

        /**
         * Remove widgets
         * @param {*} page
         * @private
         */
        _removeWidgets: function _removeWidgets(page) {
            $.each($('ul.widgets-info li.select'), function each(i, v) {
                var uuid = $(v).text();

                if (page.items.hasOwnProperty(uuid)) {
                    var widget = page.items[uuid];
                    page.logger.debug('Start remove widget', widget);
                    page.api.destroyWidget(widget);
                } else {
                    console.log(1)
                    page.logger.warn('Undefined widget', uuid);
                }

            });

        }

    });
});
