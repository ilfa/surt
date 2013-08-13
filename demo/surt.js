/*! surt 13-08-2013 */
!function(a,b){function c(a){var b=new RegExp(f,"g");return a.replace(b," ")}function d(a,b){var c=!0;if(a=a||[],b=b||[],!a.length||!b.length)return!(a.length||b.length);if(a.length==b.length){for(var d=0;d<a.length;d++)c=c&&a[d].text==b[d].text&&a[d].type==b[d].type;return c&&a.length==b.length}}var e,f=String.fromCharCode(160),g={input:".surt__input",suggest:".surt__suggests",suggestItemCls:"surt__suggests-item"},h=function(b){function c(a,b){if(!a||1!=a.nodeType)throw new Error("Surt: html element "+b+" not found or it has wrong nodeType")}b=b||{};for(var d in g)b[d]||(b[d]=g[d]);if(e=a.jQuery||b.$){b&&b.root||!this||!this[0]||1!=this[0].nodeType||(b.root=this[0]);try{if(b.root=e(b.root)[0],c(b.root,"params.root"),b.input&&(b.input=e(b.input,b.root)[0]),b.input||(b.input=e('[contenteditable="true"]',b.root)),c(b.input,"params.input"),"true"==e(b.root).attr("data-surt-inited"))throw new Error("Surt: already initialized");ret=new h.fn.constructor(b,e)}catch(f){return console.warn(f.name+": ",f.message),void 0}return ret}};h.fn={constructor:function(a,b){function c(){clearTimeout(f._upTimer),f._upTimer=setTimeout(function(){f._pressedKeys=0},300)}function d(){var a=f.args();a.kit=f.suggest[f._activeSuggest],f.set(a),f.restoreCursor(f.text().length)}function e(a){return 37==a||39==a||16==a||17==a||18==a||91==a||35==a||36==a||13==a}var f=this,g=a.root;a=a||{},this.$=b,this.params=a,this.parser=h.parser,this.inputNode=b(a.input,g)[0],this.root=b(a.root,g)[0],this.suggestNode=b(a.suggest,g)[0],this.cloneNode=b(a.clone,g)[0],this.autocompleteNode=b(a.autocomplete,g)[0],this._pressedKeys=0,this._time=(new Date).getTime(),this._events={},this.kit=[],this._activeSuggest=-1,b(this.root).attr("data-surt-inited",!0),b(this.inputNode).on("keyup",function(c){var d=c.keyCode;if(f._pressedKeys--,e(d))return!0;if(40==d&&b(".surt").hasClass(a.suggestCls),38==d||40==d||32==d&&f.getCursor()>=f.text().length)return!1;var g=f.parse(),h=f.args();h.kit=g,a.change&&a.change(c,h)}).on("keydown input paste",function(g){var h,i,j=g.keyCode;if(32==j&&f.getCursor()>=f.text().length){if(!f.trailingSpace){b(f.inputNode).append("&nbsp;");var k=f.parse();i=f.args(),i.kit=k,a.change&&a.change(g,i),f.restoreCursor(f.getCursor()+1)}return!1}if("keydown"!=g.type||e(j)||(f._pressedKeys++,c()),e(j)&&(f._pressedKeys=0),13==j)return b(f.root).hasClass(a.suggestCls)&&b("."+a.suggestItemCurrentCls).length&&d(),!1;if(40==j)return h=0,f._activeSuggest>=0&&(h=f._activeSuggest<f.suggest.length-1?f._activeSuggest+1:0),f.markSuggest(h),!1;if(38==j)return h=f.suggest.length-1,f._activeSuggest>=0&&(h=f._activeSuggest>0?f._activeSuggest-1:f.suggest.length-1),f.markSuggest(h),!1;if(39==j){var l=f.text().length;b(f.root).hasClass(a.suggestCls)&&b(f.root).hasClass(a.autocompleteCls)&&f.getCursor()>=l&&(i=f.args(),i.kit=f.suggest[0],f.set(i),f.restoreCursor(f.text().length))}}).on("paste",function(){setTimeout(function(){f.parse()},0)}).on("focus",function(){b(f.root).addClass(f.params.stateFocusCls)}).on("blur",function(){b(f.root).removeClass(f.params.stateFocusCls)}),this._events.click=function(){var c=b("."+a.suggestItemCls),d=c.index(b(this)),e=f.args();e.kit=f.suggest[d],f.set(e)},b(this.root).on("click",function(a){b(a.target).closest(f.root).length||b(f.root).removeClass(f.params.suggestCls).removeClass(f.params.autocompleteCls),a.stopPropagation()}).on("click","."+f.params.suggestItemCls,f._events.click)},get:function(){return this.kit},set:function(a){if(a=a||{},!(this._pressedKeys>0)){a.kit&&a.kit.length===b&&(a.kit=[a.kit]);var c=d(a.kit,this.kit);this.kit=a.kit,this.suggest=a.suggest||[],this.saveCursor(),this.updateSuggest(),c||this.updateKit(),this.updateAutocomplete(),this.restoreCursor()}},update:function(){this.saveCursor(),this.updateKit(),this.updateSuggest(),this.updateAutocomplete(),this.restoreCursor()},updateKit:function(){var a=[],b=this.params.tokenCls,c=this.params.textCls||b;if(this.kit){for(var d=0;d<this.kit.length;d++){var e=this.kit[d].text.trim();if("text"==this.kit[d].type&&"text"!=this.params.inputMode)c&&(e='<div class="'+c+'">'+e+"</div>");else if(b&&"text"!=this.params.inputMode){var g=this.params.tokenCloseCls,h=g?'<div class="'+g+'"></div>':"";e='<div class="'+b+" "+b+"_type_"+this.kit[d].type+'">'+e+h+"</div>"}a.push(e)}a=a.join(" "),this.trailingSpace&&(a+=f),this.inputNode.innerHTML=a}},updateSuggest:function(){var a=[],b=this.params.tokenCls,c=this.params.textCls||b;if(this.suggest){for(var d=0;d<this.suggest.length;d++){for(var f=[],g=0;g<this.suggest[d].length;g++){var h=this.suggest[d][g].text.trim();"text"!=this.suggest[d][g].type?(b&&(h='<div class="'+b+" "+b+"_type_"+this.suggest[d][g].type+'">'+h+"</div>"),f.push(h)):(c&&(h='<div class="'+c+'">'+h+"</div>"),f.push(h))}f=f.join(" "),a.push('<li class="'+this.params.suggestItemCls+'">'+f+"</li>"),this._activeSuggest=-1}a=a.join(""),this.suggestNode&&(a?e(this.root).addClass(this.params.suggestCls):e(this.root).removeClass(this.params.suggestCls),this.suggestNode.innerHTML=a)}},updateAutocomplete:function(){if(this.suggest&&this.suggest.length&&this.suggest[0].length&&this.kit&&this.kit.length&&this.cloneNode){var a,b,c=this.kit[this.kit.length-1].text,d=this.kit.length-1;this.trailingSpace&&d++,a=this.suggest[0].length>d?this.suggest[0][d].text:"",b=!a.toLowerCase().indexOf(c.toLowerCase()),e(this.root).hasClass(this.params.suggestCls)&&b?(this.cloneNode.innerHTML=this.inputNode.innerHTML,this.autocompleteNode.innerHTML=a.slice(c.length),e(this.root).addClass(this.params.autocompleteCls)):e(this.root).removeClass(this.params.autocompleteCls)}else e(this.root).removeClass(this.params.autocompleteCls)},query:function(a){var b="";a=a||this.kit;for(var d=0;d<a.length;d++)d>0&&(b+=" "),b+=a[d].text;return c(b)},text:function(){return c(e(this.inputNode).text())},args:function(){var a={};return a.kit=this.kit,a.suggest=this.suggest,a.text=this.text(),a},parse:function(){var a=this.text();return this.trailingSpace=" "===a[a.length-1],newKit=this.parser(this.kit,a)},markSuggest:function(a){var b=e("."+this.params.suggestItemCls),c=this.params.suggestItemCurrentCls;b.removeClass(c).eq(a).addClass(c),this._activeSuggest=a},minimize:function(){e(this.root).removeClass(this.params.suggestCls)},dispose:function(){e(this.root).attr("data-surt-inited","disposed"),e(this.root).off("click","."+this.params.suggestItemCls,this._events.click),clearTimeout(this._upTimer)}},h.fn.constructor.prototype=h.fn,a.surt=h,"undefined"!=typeof module&&(module.exports=h),h.version="0.2.2"}(this),function(a,b){function c(a){var b="";if(a)for(var c=0;c<a.length;c++)c>0&&(b+=" "),b+=a[c].text;return b}var d=a.surt||{},e=function(a,d){function e(a){"text"==a.type&&f.length&&"text"==f[f.length-1].type?f[f.length-1].text+=" "+a.text:f.push(a),d=d.replace(a.text,"").trim()}var f=[];if(c(a)===d)return a;if(a)for(var g=0;g<a.length;g++){var h=d.indexOf(a[g].text),i=d[h-1],j=d[h+a[g].text.length];if((" "!==j&&j!==b||" "!==i&&i!==b)&&(h=-1),0==h)e(a[g]);else if(h>0){var k=d.substring(0,h).trim();e({text:k,type:"text"}),e(a[g])}}return d&&e({text:d,type:"text"}),f};d.parser=e,"undefined"!=typeof module&&(module.exports=e)}(this),function(a){function b(a,b){for(var c=0,d=0;d<a.childNodes.length;d++){var e=$(a.childNodes[d]).text().length;if(c+=e,c>=b)return{child:a.childNodes[d],n:b-(c-e)}}return 0>b&&(c=0),{child:a.childNodes[a.childNodes.length-1],n:c}}var c=a.surt||{};c.fn=c.fn||{},c.fn.getCursor=function(){if(a.getSelection){var b=a.getSelection();if(b.anchorNode){for(var c=b.getRangeAt(0),d=c.startContainer,e=c.startOffset,f=d,g=e;f&&f!=this.inputNode;){for(var h,i=f.previousSibling;i;)h=$(i).text(),g+=h.length,i=i.previousSibling;f=f.parentNode}return g}}},c.fn.saveCursor=function(){return this.cursorPos=this.getCursor(),this.cursorPos},c.fn.restoreCursor=function(c){if(a.getSelection){var d=document.createRange(),e=a.getSelection(),f=this.inputNode;for(c=c||this.cursorPos;f&&1==f.nodeType;)obj=b(f,c),f=obj.child,c=obj.n;f&&3==f.nodeType&&(c=Math.min(c,this.$(f).text().length),c=Math.max(c,0),d.setStart(f,c),d.collapse(!0),e.removeAllRanges(),e.addRange(d)),this.inputNode.focus()}}}(this);