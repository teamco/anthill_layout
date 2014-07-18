Ext.data.JsonP.LayoutPermission({"tagname":"class","name":"LayoutPermission","autodetected":{},"files":[{"filename":"layout.permission.js","href":"layout.permission.html#LayoutPermission"}],"extends":"BasePermission","members":[{"name":"constructor","tagname":"method","owner":"LayoutPermission","id":"method-constructor","meta":{}},{"name":"authorizedFunctionCall","tagname":"method","owner":"BasePermission","id":"method-authorizedFunctionCall","meta":{}},{"name":"check","tagname":"method","owner":"BasePermission","id":"method-check","meta":{}},{"name":"config","tagname":"method","owner":"BasePermission","id":"method-config","meta":{}},{"name":"eventTunnelFunctionCall","tagname":"method","owner":"BasePermission","id":"method-eventTunnelFunctionCall","meta":{}},{"name":"getCapability","tagname":"method","owner":"BasePermission","id":"method-getCapability","meta":{}},{"name":"setCapability","tagname":"method","owner":"BasePermission","id":"method-setCapability","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-LayoutPermission","component":false,"superclasses":["BasePermission"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/BasePermission' rel='BasePermission' class='docClass'>BasePermission</a><div class='subclass '><strong>LayoutPermission</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/layout.permission.html#LayoutPermission' target='_blank'>layout.permission.js</a></div></pre><div class='doc-contents'><p>Define Permissions</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LayoutPermission'>LayoutPermission</span><br/><a href='source/layout.permission.html#LayoutPermission-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/LayoutPermission-method-constructor' class='name expandable'>LayoutPermission</a>( <span class='pre'></span> ) : <a href=\"#!/api/LayoutPermission\" rel=\"LayoutPermission\" class=\"docClass\">LayoutPermission</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/LayoutPermission\" rel=\"LayoutPermission\" class=\"docClass\">LayoutPermission</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-authorizedFunctionCall' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/BasePermission' rel='BasePermission' class='defined-in docClass'>BasePermission</a><br/><a href='source/Permission2.html#BasePermission-method-authorizedFunctionCall' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BasePermission-method-authorizedFunctionCall' class='name expandable'>authorizedFunctionCall</a>( <span class='pre'>fn</span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Check if function call is defined as authorized (via permissions) ...</div><div class='long'><p>Check if function call is defined as authorized (via permissions)</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-check' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/BasePermission' rel='BasePermission' class='defined-in docClass'>BasePermission</a><br/><a href='source/Permission2.html#BasePermission-method-check' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BasePermission-method-check' class='name expandable'>check</a>( <span class='pre'>opts</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Check permission rules ...</div><div class='long'><p>Check permission rules</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>opts</span> : {[callback]: function, [fallback]: function, args: *|Array, capability: String}<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-config' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/BasePermission' rel='BasePermission' class='defined-in docClass'>BasePermission</a><br/><a href='source/Permission2.html#BasePermission-method-config' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BasePermission-method-config' class='name expandable'>config</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Config capabilities ...</div><div class='long'><p>Config capabilities</p>\n</div></div></div><div id='method-eventTunnelFunctionCall' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/BasePermission' rel='BasePermission' class='defined-in docClass'>BasePermission</a><br/><a href='source/Permission2.html#BasePermission-method-eventTunnelFunctionCall' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BasePermission-method-eventTunnelFunctionCall' class='name expandable'>eventTunnelFunctionCall</a>( <span class='pre'>fn</span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Check if function called via tunnel ...</div><div class='long'><p>Check if function called via tunnel</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getCapability' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/BasePermission' rel='BasePermission' class='defined-in docClass'>BasePermission</a><br/><a href='source/Permission2.html#BasePermission-method-getCapability' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BasePermission-method-getCapability' class='name expandable'>getCapability</a>( <span class='pre'>key</span> ) : *<span class=\"signature\"></span></div><div class='description'><div class='short'>Get capabilities ...</div><div class='long'><p>Get capabilities</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setCapability' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/BasePermission' rel='BasePermission' class='defined-in docClass'>BasePermission</a><br/><a href='source/Permission2.html#BasePermission-method-setCapability' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BasePermission-method-setCapability' class='name expandable'>setCapability</a>( <span class='pre'>key, value</span> ) : *<span class=\"signature\"></span></div><div class='description'><div class='short'>Set capabilities ...</div><div class='long'><p>Set capabilities</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li><li><span class='pre'>value</span> : *<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});