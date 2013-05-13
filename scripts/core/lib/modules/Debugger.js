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
                    logger = this.scope.config.logger,
                    c = this.component;

                event = this.base.define(event, {}, true);
                ui = this.base.define(ui, {}, true);

                $div.html(
                    [
                        '<ul class="handler">',
                        c.renderInput('Show Grid', false),
                        c.renderInput('Expand the Content', false),
                        '</ul>',
                        '<div class="debug-container">',

//                        c.renderBlock('Widget', [
//                            this.widget.renderWidgetInfo(event, ui)
//                        ], false),

                        c.renderBlock('Page', [
                            c.renderInline('UUID', page.config.uuid),
                            this.layout.renderPageLayout(layout),
                            this.page.renderPageWidgets(page)
                        ], false),

//                        c.renderBlock('Workspace', [
//                            c.renderInline('UUID', workspace.config.uuid),
//                            c.renderInlineOf('Pages', workspace)
//                        ], false),
//
//                        c.renderBlock('Application', [
//                            c.renderInline('UUID', this.scope.config.uuid),
//                            c.renderInlineOf('Workspaces', this.scope),
//                            c.renderInline('Mode', this.scope.config.mode)
//                        ], false),
//
//                        c.renderBlock('Logger', [
//                            c.renderInline('Namespaces', logger.namespaces),
//                            c.renderInput('Show', logger.show),
//                            c.renderInput('console.debug', logger.type.debug),
//                            c.renderInput('console.log', logger.type.log),
//                            c.renderInput('console.info', logger.type.info),
//                            c.renderInput('console.error', logger.type.error),
//                            c.renderInput('console.warn', logger.type.warn)
//                        ], false),

                        '</div><div class="debug-close">Hide</div>'

                    ].join('')
                ).show();

                this.tabs.renderTabs($div);
                this.tabs.bindHover(opacityOff);

                c.bindCollapse();
                c.bindShowHideAll();
                c.bindDebugClose();

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