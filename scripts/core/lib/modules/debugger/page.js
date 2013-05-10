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
    var Page = function Page() {

        /**
         * Define edit mode
         * @type {page.editMode: Boolean}
         */
        this.editMode = false;
    };

    return Page.extend({

        /**
         * Define selectors
         */
        defineSelectors: function defineSelectors() {
            this.selectors = {
                edit: this.debugger.info + ' li.edit-mode',
                actions: this.debugger.info + ' ul.page-widget-actions',
                widgets: this.debugger.info + ' ul.widgets-info',
                count: this.debugger.info + ' li.items-count'
            };
        },

        /**
         * Render page widgets actions
         * @returns {string}
         */
        renderPageWidgetsActions: function renderPageWidgetsActions() {
            return [
                '<li class="extend"><ul class="page-widget-actions">',
                this._renderAddWidget(),
                this._renderRemoveWidget(),
                this._renderRemoveWidgets(),
                this._locateWidget(),
                this._enableEditMode(),
                '</ul></li>'
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
            return '<li rel="disabled" class="remove-widgets disabled select" title="Remove widgets">Remove widgets</li>';
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
            return [
                '<li class="extend">',
                this.debugger.component.renderBlock('Widgets', [
                    this.renderPageWidgetsActions(),
                    this._getItemsCount(page),
                    this.renderPageWidgetsList(page)
                ], true),
                '</li>'
            ].join(' ');
        },

        /**
         * Render page widgets list
         * @param page
         * @returns {string}
         */
        renderPageWidgetsList: function renderPageWidgetsList(page) {
            var html = ['<li class="extend"><ul class="widgets-info">'];
            html.push(this.getPageWidgetsList(page));
            html.push('</ul></li>');
            return html.join('');
        },

        /**
         * Get page widget list
         * @param page
         * @returns {string}
         */
        getPageWidgetsList: function getPageWidgetsList(page) {
            var html = [];
            $.each(page.items, function each(uuid, widget) {
                html.push([
                    '<li class="', widget.model.getConfig('type'), '">', uuid , '</li>'
                ].join(''));
            });

            return html.join('');
        },

        /**
         * Update page widget list
         * @param page
         */
        updateItems: function updateItems(page) {
            $(this.selectors.widgets).html(
                this.getPageWidgetsList(page)
            );

            var $count = $(this.selectors.count);

            $count.before(
                this._getItemsCount(page)
            ).remove();

            this._bindWidgetsList(page);
            this.$select.addClass('select');
        },

        /**
         * Get items count
         * @param {*} page
         * @returns {string}
         * @private
         */
        _getItemsCount: function _getItemsCount(page) {
            return this.debugger.component.renderInlineOf('Count', page);
        },

        /**
         * Get page widget action button
         * @param {String} action
         * @returns {*|jQuery|HTMLElement}
         * @private
         */
        _getWidgetAction: function _getWidgetAction(action) {
            return $('li.' + action, this.selectors.actions);
        },

        /**
         * Bind enable page widget edit mode,
         * @param {*} page
         */
        bindEnablePageWidgetsEditMode: function bindEnablePageWidgetsEditMode(page) {
            $(this.selectors.edit).on('click.edit', function edit(e) {
                this._enablePageWidgetsEditMode(e, page);
            }.bind(this));
        },

        /**
         * Bind widget list
         * @param page
         * @private
         */
        _bindWidgetsList: function _bindWidgetsList(page) {
            this.$select = this.debugger.base.define(
                this.$select,
                $('.select', this.selectors.actions)
            );

            if (this.editMode) {
                $('li', this.selectors.widgets).on('click.select', function select(e) {
                    var $li = $(e.target),
                        widget = page.items[$li.text()];
                    if ($li.hasClass('select')) {
                        page.logger.debug('Unselect', widget);
                        $li.removeClass('select');
                        this.$select.addClass('select');
                    } else {
                        page.logger.debug('Select', widget);
                        $li.addClass('select');
                        this.$select.removeClass('select');
                    }
                }.bind(this));
            }
        },

        /**
         * Unbind widget list
         * @private
         */
        _unbindWidgetsList: function _unbindWidgetsList() {
            $('li', this.selectors.widgets).unbind('click.select');
        },

        /**
         * Enable page widget edit mode
         * @param {*} e
         * @param {*} page
         * @private
         */
        _enablePageWidgetsEditMode: function _enablePageWidgetsEditMode(e, page) {
            var $this = $(e.target),
                $disabled = $('li[rel="disabled"]', $this.parent('ul'));
            if ($disabled.hasClass('disabled')) {
                page.logger.debug('Activate edit mode');
                $disabled.removeClass('disabled');
                $this.addClass('active');
                this.editMode = true;
                this._bindWidgetsList(page);
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
            var $disabled = $('li[rel="disabled"]', $this.parent('ul'));

            page.logger.debug('Deactivate edit mode');
            $disabled.addClass('disabled');
            $this.removeClass('active');
            this._unbindAddNewWidget(page);
            this._unbindRemoveWidget(page);
            this._unbindWidgetsList();
            this.editMode = false;
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
                if ($('li.select', this.selectors.widgets).length === 0) {
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
            $('li', this.selectors.widgets).removeClass('select');
        },

        /**
         * Remove widgets
         * @param {*} page
         * @private
         */
        _removeWidgets: function _removeWidgets(page) {
            var items = {};
            $.each($('li.select', this.selectors.widgets), function each(i, v) {
                var uuid = $(v).text();
                items[uuid] = page.model.getItemByUUID(uuid);
            });

            page.logger.debug('Start remove widgets', items);
            page.api.destroyWidgets(items);

        }

    });
});
