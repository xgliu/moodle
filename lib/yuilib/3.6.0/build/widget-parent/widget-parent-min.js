/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-parent",function(e){var c=e.Lang,d="rendered",b="boundingBox";function a(f){this.publish("addChild",{defaultTargetOnly:true,defaultFn:this._defAddChildFn});this.publish("removeChild",{defaultTargetOnly:true,defaultFn:this._defRemoveChildFn});this._items=[];var g,h;if(f&&f.children){g=f.children;h=this.after("initializedChange",function(i){this._add(g);h.detach();});}e.after(this._renderChildren,this,"renderUI");e.after(this._bindUIParent,this,"bindUI");this.after("selectionChange",this._afterSelectionChange);this.after("selectedChange",this._afterParentSelectedChange);this.after("activeDescendantChange",this._afterActiveDescendantChange);this._hDestroyChild=this.after("*:destroy",this._afterDestroyChild);this.after("*:focusedChange",this._updateActiveDescendant);}a.ATTRS={defaultChildType:{setter:function(h){var f=e.Attribute.INVALID_VALUE,g=c.isString(h)?e[h]:h;if(c.isFunction(g)){f=g;}return f;}},activeDescendant:{readOnly:true},multiple:{value:false,validator:c.isBoolean,writeOnce:true,getter:function(g){var f=this.get("root");return(f&&f!=this)?f.get("multiple"):g;}},selection:{readOnly:true,setter:"_setSelection",getter:function(g){var f=c.isArray(g)?(new e.ArrayList(g)):g;return f;}},selected:{setter:function(g){var f=g;if(g===1&&!this.get("multiple")){f=e.Attribute.INVALID_VALUE;}return f;}}};a.prototype={destructor:function(){this._destroyChildren();},_afterDestroyChild:function(f){var g=f.target;if(g.get("parent")==this){g.remove();}},_afterSelectionChange:function(h){if(h.target==this&&h.src!=this){var f=h.newVal,g=0;if(f){g=2;if(e.instanceOf(f,e.ArrayList)&&(f.size()===this.size())){g=1;}}this.set("selected",g,{src:this});}},_afterActiveDescendantChange:function(g){var f=this.get("parent");if(f){f._set("activeDescendant",g.newVal);}},_afterParentSelectedChange:function(f){var g=f.newVal;if(this==f.target&&f.src!=this&&(g===0||g===1)){this.each(function(h){h.set("selected",g,{src:this});},this);}},_setSelection:function(h){var g=null,f;if(this.get("multiple")&&!this.isEmpty()){f=[];this.each(function(i){if(i.get("selected")>0){f.push(i);}});if(f.length>0){g=f;}}else{if(h.get("selected")>0){g=h;}}return g;},_updateSelection:function(g){var h=g.target,f;if(h.get("parent")==this){if(g.src!="_updateSelection"){f=this.get("selection");if(!this.get("multiple")&&f&&g.newVal>0){f.set("selected",0,{src:"_updateSelection"});}this._set("selection",h);}if(g.src==this){this._set("selection",h,{src:this});}}},_updateActiveDescendant:function(f){var g=(f.newVal===true)?f.target:null;this._set("activeDescendant",g);},_createChild:function(f){var k=this.get("defaultChildType"),h=f.childType||f.type,j,g,i;if(h){g=c.isString(h)?e[h]:h;}if(c.isFunction(g)){i=g;}else{if(k){i=k;}}if(i){j=new i(f);}else{e.error("Could not create a child instance because its constructor is either undefined or invalid.");}return j;},_defAddChildFn:function(h){var i=h.child,f=h.index,g=this._items;if(i.get("parent")){i.remove();}if(c.isNumber(f)){g.splice(f,0,i);}else{g.push(i);}i._set("parent",this);i.addTarget(this);h.index=i.get("index");i.after("selectedChange",e.bind(this._updateSelection,this));},_defRemoveChildFn:function(h){var i=h.child,f=h.index,g=this._items;if(i.get("focused")){i.blur();}if(i.get("selected")){i.set("selected",0);}g.splice(f,1);i.removeTarget(this);i._oldParent=i.get("parent");i._set("parent",null);},_add:function(j,f){var g,i,h;if(c.isArray(j)){g=[];e.each(j,function(m,l){i=this._add(m,(f+l));if(i){g.push(i);}},this);if(g.length>0){h=g;}}else{if(e.instanceOf(j,e.Widget)){i=j;}else{i=this._createChild(j);}if(i&&this.fire("addChild",{child:i,index:f})){h=i;}}return h;},add:function(){var g=this._add.apply(this,arguments),f=g?(c.isArray(g)?g:[g]):[];return(new e.ArrayList(f));},remove:function(f){var h=this._items[f],g;if(h&&this.fire("removeChild",{child:h,index:f})){g=h;}return g;},removeAll:function(){var f=[],g;e.each(this._items.concat(),function(){g=this.remove(0);if(g){f.push(g);}},this);return(new e.ArrayList(f));},selectChild:function(f){this.item(f).set("selected",1);},selectAll:function(){this.set("selected",1);},deselectAll:function(){this.set("selected",0);},_uiAddChild:function(k,f){k.render(f);var i=k.get("boundingBox"),h,j=k.next(false),g;if(j&&j.get(d)){h=j.get(b);h.insert(i,"before");}else{g=k.previous(false);if(g&&g.get(d)){h=g.get(b);h.insert(i,"after");}else{if(!f.contains(i)){f.appendChild(i);}}}},_uiRemoveChild:function(f){f.get("boundingBox").remove();},_afterAddChild:function(f){var g=f.child;if(g.get("parent")==this){this._uiAddChild(g,this._childrenContainer);}},_afterRemoveChild:function(f){var g=f.child;if(g._oldParent==this){this._uiRemoveChild(g);}},_bindUIParent:function(){this.after("addChild",this._afterAddChild);this.after("removeChild",this._afterRemoveChild);},_renderChildren:function(){var f=this._childrenContainer||this.get("contentBox");this._childrenContainer=f;this.each(function(g){g.render(f);});},_destroyChildren:function(){this._hDestroyChild.detach();this.each(function(f){f.destroy();});}};e.augment(a,e.ArrayList);e.WidgetParent=a;},"3.6.0",{requires:["base-build","arraylist","widget"]});