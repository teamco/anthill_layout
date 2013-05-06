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

        this.tabs = [
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

        this.defineScope();
        this.renderInfo();
    };

    return Debugger.extend({

            /**
             * Destroy debugger
             */
            destroy: function destroy() {
                this.destroyGrid();
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
                        this.renderInput('Show Grid', false),
                        this.renderInput('Expand the Content', false),
                        '</ul>',
                        '<div class="debug-container">',

//                    this.renderBlock('Widget', [
//                        this.renderWidgetInfo(event, ui)
//                    ], false),

                        this.renderBlock('Page', [
                            this.renderInline('UUID', page.config.uuid),
//                        this.renderPageLayout(layout),
                            this.renderPageWidgets(page)
                        ], false),

//                    this.renderBlock('Workspace', [
//                        this.renderInline('UUID', workspace.config.uuid),
//                        this.renderInlineOf('Pages', workspace)
//                    ], false),

//                    this.renderBlock('Application', [
//                        this.renderInline('UUID', this.scope.config.uuid),
//                        this.renderInlineOf('Workspaces', this.scope),
//                        this.renderInline('Mode', this.scope.config.mode)
//                    ], false),

//                    this.renderBlock('Logger', [
//                        this.renderInline('Namespaces', logger.namespaces),
//                        this.renderInput('Show', logger.show),
//                        this.renderInput('console.debug', logger.type.debug),
//                        this.renderInput('console.log', logger.type.log),
//                        this.renderInput('console.info', logger.type.info),
//                        this.renderInput('console.error', logger.type.error),
//                        this.renderInput('console.warn', logger.type.warn)
//                    ], false),

                        '</div><div class="debug-close">Hide</div>'

                    ].join('')
                ).show();

                this.renderTabs($div);

                this.bindHover(opacityOff);
                this.bindCollapse();
                this.bindToggleGrid();
                this.bindShowHideAll();
                this.bindDebugClose();

                this.bindChangeOverlappingMode();
                this.bindAllowOverlapping();

                this.bindEnablePageWidgetsEditMode();

                this.openTab({
                    target: $div.find('li[title="' + this.tabs[this.showTab - 2] + '"]')
                });

            }

        },
        Base,
        Config.prototype,
        Component.prototype,
        Tabs.prototype,
        Grid.prototype,
        Page.prototype,
        Layout.prototype,
        Widget.prototype
    );
});