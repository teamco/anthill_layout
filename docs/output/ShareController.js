Ext.data.JsonP.ShareController({"tagname":"class","name":"ShareController","autodetected":{},"files":[{"filename":"share.controller.js","href":"share.controller.html#ShareController"}],"extends":"PluginController","members":[{"name":"$button","tagname":"property","owner":"ShareController","id":"property-S-button","meta":{}},{"name":"api","tagname":"property","owner":"AntHill","id":"property-api","meta":{}},{"name":"base","tagname":"property","owner":"AntHill","id":"property-base","meta":{}},{"name":"config","tagname":"property","owner":"AntHill","id":"property-config","meta":{}},{"name":"content","tagname":"property","owner":"PluginController","id":"property-content","meta":{}},{"name":"controller","tagname":"property","owner":"AntHill","id":"property-controller","meta":{}},{"name":"eventmanager","tagname":"property","owner":"AntHill","id":"property-eventmanager","meta":{}},{"name":"i18n","tagname":"property","owner":"AntHill","id":"property-i18n","meta":{}},{"name":"model","tagname":"property","owner":"AntHill","id":"property-model","meta":{}},{"name":"observer","tagname":"property","owner":"AntHill","id":"property-observer","meta":{}},{"name":"panel","tagname":"property","owner":"PluginController","id":"property-panel","meta":{}},{"name":"permission","tagname":"property","owner":"AntHill","id":"property-permission","meta":{}},{"name":"plugin","tagname":"property","owner":"PluginController","id":"property-plugin","meta":{}},{"name":"successRenderedSuper","tagname":"property","owner":"PluginController","id":"property-successRenderedSuper","meta":{}},{"name":"view","tagname":"property","owner":"AntHill","id":"property-view","meta":{}},{"name":"constructor","tagname":"method","owner":"ShareController","id":"method-constructor","meta":{}},{"name":"_hideBorder","tagname":"method","owner":"PluginController","id":"method-_hideBorder","meta":{"private":true}},{"name":"addShareRule","tagname":"method","owner":"ShareController","id":"method-addShareRule","meta":{}},{"name":"defineContentReferrer","tagname":"method","owner":"PluginController","id":"method-defineContentReferrer","meta":{}},{"name":"getAuthorPanel","tagname":"method","owner":"PluginController","id":"method-getAuthorPanel","meta":{}},{"name":"getModuleByName","tagname":"method","owner":"PluginController","id":"method-getModuleByName","meta":{}},{"name":"getResourceClassName","tagname":"method","owner":"PluginController","id":"method-getResourceClassName","meta":{}},{"name":"getWidgetRules","tagname":"method","owner":"PluginController","id":"method-getWidgetRules","meta":{}},{"name":"isDataNotExist","tagname":"method","owner":"PluginController","id":"method-isDataNotExist","meta":{}},{"name":"locateElement","tagname":"method","owner":"PluginController","id":"method-locateElement","meta":{}},{"name":"setEmbeddedContent","tagname":"method","owner":"ShareController","id":"method-setEmbeddedContent","meta":{}},{"name":"successRendered","tagname":"method","owner":"PluginController","id":"method-successRendered","meta":{}},{"name":"updateTranslations","tagname":"method","owner":"PluginController","id":"method-updateTranslations","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-ShareController","component":false,"superclasses":["AntHill","PluginController"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/AntHill' rel='AntHill' class='docClass'>AntHill</a><div class='subclass '><a href='#!/api/PluginController' rel='PluginController' class='docClass'>PluginController</a><div class='subclass '><strong>ShareController</strong></div></div></div><h4>Files</h4><div class='dependency'><a href='source/share.controller.html#ShareController' target='_blank'>share.controller.js</a></div></pre><div class='doc-contents'><p>Define share controller</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-S-button' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ShareController'>ShareController</span><br/><a href='source/share.controller.html#ShareController-property-S-button' target='_blank' class='view-source'>view source</a></div><a href='#!/api/ShareController-property-S-button' class='name expandable'>$button</a> : *|jQuery|HTMLElement<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define $button</p>\n</div><div class='long'><p>Define $button</p>\n</div></div></div><div id='property-api' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-api' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-api' class='name expandable'>api</a> : <a href=\"#!/api/BaseAPI\" rel=\"BaseAPI\" class=\"docClass\">BaseAPI</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Init API</p>\n</div><div class='long'><p>Init API</p>\n</div></div></div><div id='property-base' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-base' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-base' class='name expandable'>base</a> : <a href=\"#!/api/Base\" rel=\"Base\" class=\"docClass\">Base</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define base</p>\n</div><div class='long'><p>Define base</p>\n</div></div></div><div id='property-config' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-config' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-config' class='name expandable'>config</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Init config ...</div><div class='long'><p>Init config</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-content' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-property-content' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-property-content' class='name expandable'>content</a> : *<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define content</p>\n</div><div class='long'><p>Define content</p>\n</div></div></div><div id='property-controller' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-controller' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-controller' class='name expandable'>controller</a> : <a href=\"#!/api/BaseController\" rel=\"BaseController\" class=\"docClass\">BaseController</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Init controller</p>\n</div><div class='long'><p>Init controller</p>\n</div></div></div><div id='property-eventmanager' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-eventmanager' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-eventmanager' class='name expandable'>eventmanager</a> : *<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Init event manager</p>\n</div><div class='long'><p>Init event manager</p>\n</div></div></div><div id='property-i18n' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-i18n' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-i18n' class='name expandable'>i18n</a> : <a href=\"#!/api/i18n\" rel=\"i18n\" class=\"docClass\">i18n</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define translations</p>\n</div><div class='long'><p>Define translations</p>\n</div></div></div><div id='property-model' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-model' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-model' class='name expandable'>model</a> : <a href=\"#!/api/BaseModel\" rel=\"BaseModel\" class=\"docClass\">BaseModel</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Init model</p>\n</div><div class='long'><p>Init model</p>\n</div></div></div><div id='property-observer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-observer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-observer' class='name expandable'>observer</a> : <a href=\"#!/api/Observer\" rel=\"Observer\" class=\"docClass\">Observer</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Init observer</p>\n</div><div class='long'><p>Init observer</p>\n</div></div></div><div id='property-panel' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-property-panel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-property-panel' class='name expandable'>panel</a> : <a href=\"#!/api/Panel\" rel=\"Panel\" class=\"docClass\">Panel</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define panel</p>\n</div><div class='long'><p>Define panel</p>\n</div></div></div><div id='property-permission' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-permission' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-permission' class='name expandable'>permission</a> : <a href=\"#!/api/BasePermission\" rel=\"BasePermission\" class=\"docClass\">BasePermission</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define permissions</p>\n</div><div class='long'><p>Define permissions</p>\n</div></div></div><div id='property-plugin' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-property-plugin' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-property-plugin' class='name expandable'>plugin</a> : *<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define this reference</p>\n</div><div class='long'><p>Define this reference</p>\n</div></div></div><div id='property-successRenderedSuper' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-property-successRenderedSuper' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-property-successRenderedSuper' class='name expandable'>successRenderedSuper</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Copy successRendered</p>\n</div><div class='long'><p>Copy successRendered</p>\n</div></div></div><div id='property-view' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-view' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-view' class='name expandable'>view</a> : <a href=\"#!/api/BaseView\" rel=\"BaseView\" class=\"docClass\">BaseView</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Init view</p>\n</div><div class='long'><p>Init view</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ShareController'>ShareController</span><br/><a href='source/share.controller.html#ShareController-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/ShareController-method-constructor' class='name expandable'>ShareController</a>( <span class='pre'></span> ) : <a href=\"#!/api/ShareController\" rel=\"ShareController\" class=\"docClass\">ShareController</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/ShareController\" rel=\"ShareController\" class=\"docClass\">ShareController</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/PluginController-method-constructor\" rel=\"PluginController-method-constructor\" class=\"docClass\">PluginController.constructor</a></p></div></div></div><div id='method-_hideBorder' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-method-_hideBorder' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-method-_hideBorder' class='name expandable'>_hideBorder</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Hide border on locate element ...</div><div class='long'><p>Hide border on locate element</p>\n</div></div></div><div id='method-addShareRule' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ShareController'>ShareController</span><br/><a href='source/share.controller.html#ShareController-method-addShareRule' target='_blank' class='view-source'>view source</a></div><a href='#!/api/ShareController-method-addShareRule' class='name expandable'>addShareRule</a>( <span class='pre'>e</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Add Share rule ...</div><div class='long'><p>Add Share rule</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-defineContentReferrer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-method-defineContentReferrer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-method-defineContentReferrer' class='name expandable'>defineContentReferrer</a>( <span class='pre'>widget</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Define content referrer ...</div><div class='long'><p>Define content referrer</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>widget</span> : <a href=\"#!/api/Widget\" rel=\"Widget\" class=\"docClass\">Widget</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getAuthorPanel' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-method-getAuthorPanel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-method-getAuthorPanel' class='name expandable'>getAuthorPanel</a>( <span class='pre'></span> ) : <a href=\"#!/api/Panel\" rel=\"Panel\" class=\"docClass\">Panel</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Get page data ...</div><div class='long'><p>Get page data</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Panel\" rel=\"Panel\" class=\"docClass\">Panel</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getModuleByName' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-method-getModuleByName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-method-getModuleByName' class='name expandable'>getModuleByName</a>( <span class='pre'>name</span> ) : *<span class=\"signature\"></span></div><div class='description'><div class='short'>Get module by name ...</div><div class='long'><p>Get module by name</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getResourceClassName' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-method-getResourceClassName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-method-getResourceClassName' class='name expandable'>getResourceClassName</a>( <span class='pre'>resource</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Get resource class name ...</div><div class='long'><p>Get resource class name</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resource</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">string</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getWidgetRules' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-method-getWidgetRules' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-method-getWidgetRules' class='name expandable'>getWidgetRules</a>( <span class='pre'></span> ) : <a href=\"#!/api/WidgetRules\" rel=\"WidgetRules\" class=\"docClass\">WidgetRules</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Get widget rules ...</div><div class='long'><p>Get widget rules</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/WidgetRules\" rel=\"WidgetRules\" class=\"docClass\">WidgetRules</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isDataNotExist' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-method-isDataNotExist' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-method-isDataNotExist' class='name expandable'>isDataNotExist</a>( <span class='pre'></span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Check if data was existing ...</div><div class='long'><p>Check if data was existing</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-locateElement' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-method-locateElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-method-locateElement' class='name expandable'>locateElement</a>( <span class='pre'>$element, e</span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Locate element ...</div><div class='long'><p>Locate element</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>$element</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>e</span> : *<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setEmbeddedContent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ShareController'>ShareController</span><br/><a href='source/share.controller.html#ShareController-method-setEmbeddedContent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/ShareController-method-setEmbeddedContent' class='name expandable'>setEmbeddedContent</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Set embedded content ...</div><div class='long'><p>Set embedded content</p>\n</div></div></div><div id='method-successRendered' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-method-successRendered' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-method-successRendered' class='name expandable'>successRendered</a>( <span class='pre'>[callback]</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Overwrite success rendered ...</div><div class='long'><p>Overwrite success rendered</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callback</span> : function (optional)<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-updateTranslations' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/PluginController' rel='PluginController' class='defined-in docClass'>PluginController</a><br/><a href='source/plugin.html#PluginController-method-updateTranslations' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PluginController-method-updateTranslations' class='name expandable'>updateTranslations</a>( <span class='pre'>data</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Update translations ...</div><div class='long'><p>Update translations</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});