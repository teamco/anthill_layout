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
            return '<li rel="disabled" class="remove-widget disabled" title="Remove widget">Remove widget</li>';
        },

        /**
         * Render remove widgets button
         * @returns {string}
         * @private
         */
        _renderRemoveWidgets: function _renderRemoveWidgets() {
            return '<li rel="disabled" class="remove-widgets disabled" title="Remove widgets">Remove widgets</li>';
        },

        /**
         * Render locate widget button
         * @returns {string}
         * @private
         */
        _locateWidget: function _locateWidget() {
            return '<li rel="disabled" class="locate-widget disabled" title="Locate widget">Locate widget</li>';
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
         * Bind enable page widget edit mode,
         * @param {*} page
         */
        bindEnablePageWidgetsEditMode: function bindEnablePageWidgetsEditMode(page) {
            $('.edit-mode').on('click.edit', function edit(e) {
                var $this = $(e.target),
                    $disabled = $this.parent('ul').find('li[rel="disabled"]');
                if ($disabled.hasClass('disabled')) {
                    $disabled.removeClass('disabled');
                    $this.addClass('active');
                    this.scope.logger.debug('Activate edit mode', page);
                    this._bindAddNewWidget(true, page);
                } else {
                    $disabled.addClass('disabled');
                    $this.removeClass('active');
                    this.scope.logger.debug('Deactivate edit mode', page);
                    this._bindAddNewWidget(false, page);
                }
            }.bind(this));
        },

        /**
         * Bind/Unbind add new widget
         * @param {Boolean} bind
         * @param {*} page
         * @private
         */
        _bindAddNewWidget: function _bindAddNewWidget(bind, page) {
            var $li = $('ul.page-widget-actions li.add-widget');
            if (!!bind) {
                this.scope.logger.debug('Bind Add widget');
                $li.on('click.add', function (e) {
                    page.api.createWidget([], true)
                }.bind(this));
            } else {
                this.scope.logger.debug('Unbind Add widget');
                $li.unbind('click.add')
            }

        }

    });
});
