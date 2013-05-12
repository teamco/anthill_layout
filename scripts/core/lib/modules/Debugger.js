/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 11:34 PM
 */

define([
    'modules/base',
    'modules/debugger/config',
    'modules/debugger/component',
    'modules/debugger/tabs',
    'modules/debugger/grid',
    'modules/debugger/page',
    'modules/debugger/layout',
    'modules/debugger/widget'
], function defineDebugger(Base, Config, Component, Tabs, Grid, Page, Layout, Widget) {

    require(['jqueryui']);

    /**
     * Define Debugger
     * @param scope
     * @constructor
     */
    var Debugger = function Debugger(scope) {

        this.scope = scope;

        this.placeholders = '#placeholders';
        this.info = '#debug-mode';

        this.links = [
            'Logger',
            'Application',
            'Workspace',
            'Page',
            'Template',
            'Widget'
        ];

        this.showTab = 5;

        this.rows = 25;
        this.scopes = {};

        this.config.defineScope(this);
        this.renderInfo();
    };

    return Debugger.extend({

            /**
             * Destroy debugger
             */
            destroy: function destroy() {
                this.grid.destroyGrid();
                this.destroyInfo();
                this.scope.debugger = undefined;
                delete this.scope.debugger;
            },

            /**
             * Destroy info window
             */
            destroyInfo: function destroyInfo() {
                $(this.info).stop().fadeOut('slow', function fadeOt() {
                    $(this).unbind().remove();
                });
            },

            /**
             * Render Info window
             * @param {{type, timeStamp}} [event]
             * @param {{originalPosition, offset, position, helper}} [ui]
             */
            renderInfo: function renderInfo(event, ui) {

                var $div = $(this.info),
                    opacityOff = 0.8;

                if ($div.length === 0) {
                    $div = $('<div />');
                    $div.attr({
                        id: this.info.replace(/#/, '')
                    }).css({
                            opacity: opacityOff
                        }).draggable({
                            handle: '.handler',
                            cancel: '.plus, .minus'
                        });
                    $(this.scope.config.html.container).append($div);
                }

                var workspace = this.scopes.workspace,
                    page = this.scopes.page,
                    layout = page.layout,
                    logger = this.scope.config.logger;

                event = this.base.define(event, {}, true);
                ui = this.base.define(ui, {}, true);

                $div.html(
                    [
                        '<ul class="handler">',
                        this.component.renderInput('Show Grid', false),
                        this.component.renderInput('Expand the Content', false),
                        '</ul>',
                        '<div class="debug-container">',

                        this.component.renderBlock('Widget', [
                            this.widget.renderWidgetInfo(event, ui)
                        ], false),

                        this.component.renderBlock('Page', [
                            this.component.renderInline('UUID', page.config.uuid),
                            this.layout.renderPageLayout(layout),
                            this.page.renderPageWidgets(page)
                        ], false),

                        this.component.renderBlock('Workspace', [
                            this.component.renderInline('UUID', workspace.config.uuid),
                            this.component.renderInlineOf('Pages', workspace)
                        ], false),

                        this.component.renderBlock('Application', [
                            this.component.renderInline('UUID', this.scope.config.uuid),
                            this.component.renderInlineOf('Workspaces', this.scope),
                            this.component.renderInline('Mode', this.scope.config.mode)
                        ], false),

                        this.component.renderBlock('Logger', [
                            this.component.renderInline('Namespaces', logger.namespaces),
                            this.component.renderInput('Show', logger.show),
                            this.component.renderInput('console.debug', logger.type.debug),
                            this.component.renderInput('console.log', logger.type.log),
                            this.component.renderInput('console.info', logger.type.info),
                            this.component.renderInput('console.error', logger.type.error),
                            this.component.renderInput('console.warn', logger.type.warn)
                        ], false),

                        '</div><div class="debug-close">Hide</div>'

                    ].join('')
                ).show();

                this.tabs.renderTabs($div);
                this.tabs.bindHover(opacityOff);

                this.component.bindCollapse();
                this.component.bindShowHideAll();
                this.component.bindDebugClose();

                this.layout.bindToggleGrid();
                this.layout.bindChangeOverlappingMode();
                this.layout.bindAllowOverlapping();

                this.page.bindEnablePageWidgetsEditMode(page);

                this.tabs.openTab({
                    target: $div.find('li[title="' + this.links[this.showTab - 2] + '"]')
                });

            }

        },
        Base,
        Config,
        Component,
        Tabs,
        Grid,
        Page,
        Layout,
        Widget
    );
});