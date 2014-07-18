Ext.data.JsonP.PanelController({"tagname":"class","name":"PanelController","autodetected":{},"files":[{"filename":"panel.controller.js","href":"panel.controller.html#PanelController"}],"members":[{"name":"$bar","tagname":"property","owner":"PanelController","id":"property-S-bar","meta":{}},{"name":"$panel","tagname":"property","owner":"PanelController","id":"property-S-panel","meta":{}},{"name":"activated","tagname":"property","owner":"PanelController","id":"property-activated","meta":{}},{"name":"active","tagname":"property","owner":"PanelController","id":"property-active","meta":{}},{"name":"data","tagname":"property","owner":"PanelController","id":"property-data","meta":{}},{"name":"index","tagname":"property","owner":"PanelController","id":"property-index","meta":{}},{"name":"model","tagname":"property","owner":"PanelController","id":"property-model","meta":{}},{"name":"module","tagname":"property","owner":"PanelController","id":"property-module","meta":{}},{"name":"opened","tagname":"property","owner":"PanelController","id":"property-opened","meta":{}},{"name":"packages","tagname":"property","owner":"PanelController","id":"property-packages","meta":{}},{"name":"panels","tagname":"property","owner":"PanelController","id":"property-panels","meta":{}},{"name":"wsEventManager","tagname":"property","owner":"PanelController","id":"property-wsEventManager","meta":{}},{"name":"constructor","tagname":"method","owner":"PanelController","id":"method-constructor","meta":{}},{"name":"activateModule","tagname":"method","owner":"PanelController","id":"method-activateModule","meta":{}},{"name":"closePanel","tagname":"method","owner":"PanelController","id":"method-closePanel","meta":{}},{"name":"closePanels","tagname":"method","owner":"PanelController","id":"method-closePanels","meta":{}},{"name":"defineModules","tagname":"method","owner":"PanelController","id":"method-defineModules","meta":{}},{"name":"definePackages","tagname":"method","owner":"PanelController","id":"method-definePackages","meta":{}},{"name":"executeGenericEvent","tagname":"method","owner":"PanelController","id":"method-executeGenericEvent","meta":{}},{"name":"getActiveResource","tagname":"method","owner":"PanelController","id":"method-getActiveResource","meta":{}},{"name":"getRenderAt","tagname":"method","owner":"PanelController","id":"method-getRenderAt","meta":{}},{"name":"isActive","tagname":"method","owner":"PanelController","id":"method-isActive","meta":{}},{"name":"isOpened","tagname":"method","owner":"PanelController","id":"method-isOpened","meta":{}},{"name":"isResizable","tagname":"method","owner":"PanelController","id":"method-isResizable","meta":{}},{"name":"openPanel","tagname":"method","owner":"PanelController","id":"method-openPanel","meta":{}},{"name":"refreshModulesContent","tagname":"method","owner":"PanelController","id":"method-refreshModulesContent","meta":{}},{"name":"renderPackages","tagname":"method","owner":"PanelController","id":"method-renderPackages","meta":{}},{"name":"setBehavior","tagname":"method","owner":"PanelController","id":"method-setBehavior","meta":{}},{"name":"showContent","tagname":"method","owner":"PanelController","id":"method-showContent","meta":{}},{"name":"subscribeGenericEvent","tagname":"method","owner":"PanelController","id":"method-subscribeGenericEvent","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-PanelController","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/panel.controller.html#PanelController' target='_blank'>panel.controller.js</a></div></pre><div class='doc-contents'><p>Define panel controller</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-S-bar' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-property-S-bar' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-property-S-bar' class='name expandable'>$bar</a> : <a href=\"#!/api/PanelContentElement\" rel=\"PanelContentElement\" class=\"docClass\">PanelContentElement</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define $bar</p>\n</div><div class='long'><p>Define $bar</p>\n</div></div></div><div id='property-S-panel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-property-S-panel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-property-S-panel' class='name expandable'>$panel</a> : <a href=\"#!/api/PanelElement\" rel=\"PanelElement\" class=\"docClass\">PanelElement</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define $panel</p>\n</div><div class='long'><p>Define $panel</p>\n</div></div></div><div id='property-activated' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-property-activated' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-property-activated' class='name expandable'>activated</a> : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Activate module ...</div><div class='long'><p>Activate module</p>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='property-active' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-property-active' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-property-active' class='name expandable'>active</a> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define active panel</p>\n</div><div class='long'><p>Define active panel</p>\n</div></div></div><div id='property-data' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-property-data' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-property-data' class='name expandable'>data</a> : {activated: Boolean, module}<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define module config</p>\n</div><div class='long'><p>Define module config</p>\n</div></div></div><div id='property-index' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-property-index' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-property-index' class='name expandable'>index</a> : number<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define module index</p>\n</div><div class='long'><p>Define module index</p>\n</div></div></div><div id='property-model' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-property-model' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-property-model' class='name expandable'>model</a> : <a href=\"#!/api/PanelModel\" rel=\"PanelModel\" class=\"docClass\">PanelModel</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define model</p>\n</div><div class='long'><p>Define model</p>\n</div></div></div><div id='property-module' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-property-module' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-property-module' class='name expandable'>module</a> : *<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define package local instance</p>\n</div><div class='long'><p>Define package local instance</p>\n</div></div></div><div id='property-opened' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-property-opened' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-property-opened' class='name expandable'>opened</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Update opened instance</p>\n</div><div class='long'><p>Update opened instance</p>\n</div></div></div><div id='property-packages' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-property-packages' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-property-packages' class='name expandable'>packages</a> : *<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Init packages</p>\n</div><div class='long'><p>Init packages</p>\n</div></div></div><div id='property-panels' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-property-panels' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-property-panels' class='name expandable'>panels</a> : App.panels<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Get panels</p>\n</div><div class='long'><p>Get panels</p>\n</div></div></div><div id='property-wsEventManager' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-property-wsEventManager' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-property-wsEventManager' class='name expandable'>wsEventManager</a> : <a href=\"#!/api/WorkspaceEventManager\" rel=\"WorkspaceEventManager\" class=\"docClass\">WorkspaceEventManager</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Get workspace</p>\n</div><div class='long'><p>Get workspace</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/PanelController-method-constructor' class='name expandable'>PanelController</a>( <span class='pre'></span> ) : <a href=\"#!/api/PanelController\" rel=\"PanelController\" class=\"docClass\">PanelController</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/PanelController\" rel=\"PanelController\" class=\"docClass\">PanelController</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-activateModule' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-activateModule' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-activateModule' class='name expandable'>activateModule</a>( <span class='pre'>opened, index</span> ) : *<span class=\"signature\"></span></div><div class='description'><div class='short'>Activate module ...</div><div class='long'><p>Activate module</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>opened</span> : Boolean<div class='sub-desc'>\n</div></li><li><span class='pre'>index</span> : Number<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-closePanel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-closePanel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-closePanel' class='name expandable'>closePanel</a>( <span class='pre'>resource</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Close panel ...</div><div class='long'><p>Close panel</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resource</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">string</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-closePanels' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-closePanels' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-closePanels' class='name expandable'>closePanels</a>( <span class='pre'>[except]</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Close panels [except this] ...</div><div class='long'><p>Close panels [except this]</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>except</span> : <a href=\"#!/api/Panel\" rel=\"Panel\" class=\"docClass\">Panel</a> (optional)<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-defineModules' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-defineModules' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-defineModules' class='name expandable'>defineModules</a>( <span class='pre'>modules</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Define modules ...</div><div class='long'><p>Define modules</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>modules</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-definePackages' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-definePackages' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-definePackages' class='name expandable'>definePackages</a>( <span class='pre'>packages</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Define packages ...</div><div class='long'><p>Define packages</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>packages</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-executeGenericEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-executeGenericEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-executeGenericEvent' class='name expandable'>executeGenericEvent</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Execute generic event ...</div><div class='long'><p>Execute generic event</p>\n</div></div></div><div id='method-getActiveResource' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-getActiveResource' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-getActiveResource' class='name expandable'>getActiveResource</a>( <span class='pre'></span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">string</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Get active resource ...</div><div class='long'><p>Get active resource</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">string</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getRenderAt' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-getRenderAt' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-getRenderAt' class='name expandable'>getRenderAt</a>( <span class='pre'></span> ) : *<span class=\"signature\"></span></div><div class='description'><div class='short'>Get render at ...</div><div class='long'><p>Get render at</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isActive' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-isActive' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-isActive' class='name expandable'>isActive</a>( <span class='pre'>resource</span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Check if panel active ...</div><div class='long'><p>Check if panel active</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resource</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">string</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isOpened' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-isOpened' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-isOpened' class='name expandable'>isOpened</a>( <span class='pre'></span> ) : boolean|*<span class=\"signature\"></span></div><div class='description'><div class='short'>Check if opened ...</div><div class='long'><p>Check if opened</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean|*</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isResizable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-isResizable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-isResizable' class='name expandable'>isResizable</a>( <span class='pre'></span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Check if panel resizable ...</div><div class='long'><p>Check if panel resizable</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-openPanel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-openPanel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-openPanel' class='name expandable'>openPanel</a>( <span class='pre'>resource, [event], [callback]</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Open panel ...</div><div class='long'><p>Open panel</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resource</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">string</a><div class='sub-desc'>\n</div></li><li><span class='pre'>event</span> : * (optional)<div class='sub-desc'>\n</div></li><li><span class='pre'>callback</span> : function (optional)<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-refreshModulesContent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-refreshModulesContent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-refreshModulesContent' class='name expandable'>refreshModulesContent</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Refresh modules content ...</div><div class='long'><p>Refresh modules content</p>\n</div></div></div><div id='method-renderPackages' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-renderPackages' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-renderPackages' class='name expandable'>renderPackages</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Render packages ...</div><div class='long'><p>Render packages</p>\n</div></div></div><div id='method-setBehavior' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-setBehavior' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-setBehavior' class='name expandable'>setBehavior</a>( <span class='pre'>resource, opened</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Update opened ...</div><div class='long'><p>Update opened</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resource</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li><li><span class='pre'>opened</span> : Boolean<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-showContent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-showContent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-showContent' class='name expandable'>showContent</a>( <span class='pre'>opened, [resource]</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Show content ...</div><div class='long'><p>Show content</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>opened</span> : Boolean<div class='sub-desc'>\n</div></li><li><span class='pre'>resource</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">string</a> (optional)<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-subscribeGenericEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='PanelController'>PanelController</span><br/><a href='source/panel.controller.html#PanelController-method-subscribeGenericEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/PanelController-method-subscribeGenericEvent' class='name expandable'>subscribeGenericEvent</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Subscribe to generic event ...</div><div class='long'><p>Subscribe to generic event</p>\n</div></div></div></div></div></div></div>","meta":{}});