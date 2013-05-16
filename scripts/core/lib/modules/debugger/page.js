/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:03 PM
 */

define([
    'modules/debugger/actions'
], function defineDebuggerPage(Actions) {

    /**
     * Define Debugger Page
     * @param {*} debug
     * @constructor
     */
    var Page = function Page(debug) {

        /**
         * Define debugger
         * @type {*}
         */
        this.debugger = debug;
        /**
         * Define edit mode
         * @type {page.editMode: Boolean}
         */
        this.editMode = false;

        this.actions = [
            'add-item',
            'remove-items',
            'remove-all-items',
            'locate-item'
        ];

        this.extendSelectors({
            edit: 'li.edit-mode',
            actions: 'ul.page-widget-actions',
            widgets: 'ul.widgets-info',
            count: 'li.items-count'
        });

    };

    return Page.extend({

//        /**
//         * Define selectors
//         */
//        defineSelectors: function defineSelectors() {
//            this.selectors = {
//                edit: this.debugger.info + ' li.edit-mode',
//                actions: this.debugger.info + ' ul.page-widget-actions',
//                widgets: this.debugger.info + ' ul.widgets-info',
//                count: this.debugger.info + ' li.items-count'
//            };
//        },
//
//        /**
//         * Render page widgets actions
//         * @returns {string}
//         */
//        renderPageWidgetsActions: function renderPageWidgetsActions() {
//            return [
//                '<li class="extend"><ul class="page-widget-actions">',
//                this._renderAddWidget(),
//                this._renderRemoveWidget(),
//                this._renderRemoveWidgets(),
//                this._renderLocateWidget(),
//                this._renderEnableEditMode(),
//                '</ul></li>'
//            ].join('');
//        },

//        /**
//         * Render add new widget button
//         * @returns {string}
//         * @private
//         */
//        _renderAddWidget: function _renderAddWidget() {
//            return '<li rel="disabled" class="add-widget disabled" title="Add widget">Add widget</li>';
//        },
//
//        /**
//         * Render remove widget button
//         * @returns {string}
//         * @private
//         */
//        _renderRemoveWidget: function _renderRemoveWidget() {
//            return '<li rel="disabled" class="remove-widget disabled select" title="Remove widgets">Remove widgets</li>';
//        },
//
//        /**
//         * Render remove widgets button
//         * @returns {string}
//         * @private
//         */
//        _renderRemoveWidgets: function _renderRemoveWidgets() {
//            return '<li rel="disabled" class="remove-widgets disabled" title="Remove all widgets">Remove all widgets</li>';
//        },
//
//        /**
//         * Render locate widget button
//         * @returns {string}
//         * @private
//         */
//        _renderLocateWidget: function _renderLocateWidget() {
//            return '<li rel="disabled" class="locate-widget disabled select" title="Locate widget">Locate widget</li>';
//        },
//
//        /**
//         * Render enable edit mode
//         * @returns {string}
//         * @private
//         */
//        _renderEnableEditMode: function _renderEnableEditMode() {
//            return '<li class="edit-mode" title="Edit mode">Edit mode</li>';
//        },

        /**
         * Render page widgets info
         * @param {*} page
         * @returns {string}
         */
        renderPageWidgets: function renderPageWidgets(page) {
            return [
                '<li class="extend">',
                this.debugger.component.renderBlock('Widgets', [
                    this.renderItemsActions(),
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

                    var $select = $('li.select', this.selectors.widgets),
                        $locate = this._getWidgetAction('locate-widget');

                    $select.length === 1 ?
                        $locate.removeClass('disabled select') :
                        $locate.addClass('disabled select');

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
                this._bindRemoveAllWidgets(page);
                this._bindLocateWidget(page);
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
            this._unbindRemoveAllWidgets(page);
            this._unbindLocateWidget(page);
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
                page.api.createWidget([], true);
                this._getWidgetAction('remove-widgets').removeClass('disabled');
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
            page.logger.debug('Bind remove widgets');
            this._getWidgetAction('remove-widget').on('click.remove', function remove(e) {
                if ($('li.select', this.selectors.widgets).length === 0) {
                    page.logger.warn('Select widgets before remove');
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
            page.logger.debug('Unbind remove widgets');
            this._getWidgetAction('remove-widget').unbind('click.remove');
            $('li', this.selectors.widgets).removeClass('select');
        },

        /**
         * Bind remove all widgets
         * @param page
         * @private
         */
        _bindRemoveAllWidgets: function _bindRemoveAllWidgets(page) {
            var $lis = $('li', this.selectors.widgets),
                $action = this._getWidgetAction('remove-widgets');
            page.logger.debug('Bind remove all widgets');

            if ($lis.length === 0) {
                $action.addClass('disabled');
            }

            $action.on('click.remove', function remove(e) {
                if ($lis.length === 0) {
                    page.logger.warn('Add widgets before remove');
                    return false;
                }
                this._removeAllWidgets(page);
            }.bind(this));
        },

        /**
         * Unbind remove all widgets
         * @param {*} page
         * @private
         */
        _unbindRemoveAllWidgets: function _unbindRemoveAllWidgets(page) {
            page.logger.debug('Unbind remove all widgets');
            this._getWidgetAction('remove-widgets').unbind('click.remove');
            $('li', this.selectors.widgets).removeClass('select');
        },

        /**
         * Bind locate widget
         * @param page
         * @private
         */
        _bindLocateWidget: function _bindLocateWidget(page) {
            page.logger.debug('Bind locate widget');

            this._getWidgetAction('locate-widget').on('click.locate', function locate(e) {
                this._locateWidget(page);
            }.bind(this));
        },

        /**
         * Unbind remove all widgets
         * @param {*} page
         * @private
         */
        _unbindLocateWidget: function _unbindLocateWidget(page) {
            page.logger.debug('Unbind locate widget');
            this._getWidgetAction('locate-widget').unbind('click.locate');
            $('li', this.selectors.widgets).removeClass('select');
        },

        _locateWidget: function _locateWidget(page) {
            var $li = $('li.select', this.selectors.widgets);

            if ($li.length !== 1) {
                page.logger.warn('Select one widget before locate');
                return false;
            }

            var uuid = $li.text(),
                widget = page.model.getItemByUUID(uuid);

            if (!this.debugger.base.isDefined(widget)) {
                page.logger.warn('Undefined widget', uuid);
                return false;
            }

            page.logger.warn('Locate', widget);

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

        },

        /**
         * Remove widgets
         * @param {*} page
         * @private
         */
        _removeAllWidgets: function _removeAllWidgets(page) {
            $('li', this.selectors.widgets).addClass('select');
            this._getWidgetAction('remove-widgets').addClass('disabled');
            page.logger.debug('Start remove all widgets');
            this._removeWidgets(page);
        }

    }, Actions.prototype);
});
