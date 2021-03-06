
(function($){$.extend($.expr[':'],{icontains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").toLowerCase().indexOf(m[3].toLowerCase())>=0;}});$.iterators={getText:function(){return $(this).text();},parseInt:function(v){return parseInt(v,10);}};$.extend({range:function(){if(!arguments.length){return[];}
var min,max,step;if(arguments.length==1){min=0;max=arguments[0]-1;step=1;}
else{min=arguments[0];max=arguments[1]-1;step=arguments[2]||1;}
if(step<0&&min>=max){step*=-1;var tmp=min;min=max;max=tmp;min+=((max-min)%step);}
var a=[];for(var i=min;i<=max;i+=step){a.push(i);}
return a;},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38},keyIs:function(k,e){return parseInt($.keyCode[k.toUpperCase()],10)==parseInt((typeof(e)=='number')?e:e.keyCode,10);},keys:function(arr){var o=[];for(k in arr){o.push(k);}
return o;},redirect:function(url){window.location.href=url;return url;},stop:function(e,preventDefault,stopPropagation){if(preventDefault){e.preventDefault();}
if(stopPropagation){e.stopPropagation();}
return preventDefault&&false||true;},basename:function(path){var t=path.split('/');return t[t.length]===''&&s||t.slice(0,t.length).join('/');},filename:function(path){return path.split('/').pop();},filesizeformat:function(bytes,suffixes){var b=parseInt(bytes,10);var s=suffixes||['byte','bytes','KB','MB','GB'];if(isNaN(b)||b===0){return'0 '+s[0];}
if(b==1){return'1 '+s[0];}
if(b<1024){return b.toFixed(2)+' '+s[1];}
if(b<1048576){return(b/1024).toFixed(2)+' '+s[2];}
if(b<1073741824){return(b/1048576).toFixed(2)+' '+s[3];}
else{return(b/1073741824).toFixed(2)+' '+s[4];}},fileExtension:function(s){var tokens=s.split('.');return tokens[tokens.length-1]||false;},isString:function(o){return typeof(o)=='string'&&true||false;},isRegExp:function(o){return o&&o.constructor.toString().indexOf('RegExp()')!=-1||false;},isObject:function(o){return(typeof(o)=='object');},toCurrency:function(i){i=parseFloat(i,10).toFixed(2);return(i=='NaN')?'0.00':i;},pxToEm:function(i,settings){settings=jQuery.extend({scope:'body',reverse:false},settings);var pxVal=(i==='')?0:parseFloat(i);var scopeVal;var getWindowWidth=function(){var de=document.documentElement;return self.innerWidth||(de&&de.clientWidth)||document.body.clientWidth;};if(settings.scope=='body'&&$.browser.msie&&(parseFloat($('body').css('font-size'))/getWindowWidth()).toFixed(1)>0.0){var calcFontSize=function(){return(parseFloat($('body').css('font-size'))/getWindowWidth()).toFixed(3)*16;};scopeVal=calcFontSize();}
else{scopeVal=parseFloat(jQuery(settings.scope).css("font-size"));}
var result=(settings.reverse===true)?(pxVal*scopeVal).toFixed(2)+'px':(pxVal/scopeVal).toFixed(2)+'em';return result;}});$.extend($.fn,{type:function(){try{return $(this).get(0).nodeName.toLowerCase();}
catch(e){return false;}},selectRange:function(start,end){if($(this).get(0).createTextRange){var range=$(this).get(0).createTextRange();range.collapse(true);range.moveEnd('character',end);range.moveStart('character',start);range.select();}
else if($(this).get(0).setSelectionRange){$(this).bind('focus',function(e){e.preventDefault();}).get(0).setSelectionRange(start,end);}
return $(this);},equalHeights:function(px){$(this).each(function(){var currentTallest=0;$(this).children().each(function(i){if($(this).height()>currentTallest){currentTallest=$(this).height();}});if(!px||!$.pxToEm){currentTallest=$.pxToEm(currentTallest);}
if($.browser.msie&&$.browser.version==6.0){$(this).children().css({'height':currentTallest});}
$(this).children().css({'min-height':currentTallest});});return this;},delay:function(time,callback){jQuery.fx.step.delay=function(){};return this.animate({delay:1},time,callback);}});})(jQuery);(function($){var strings={strConversion:{__repr:function(i){switch(this.__getType(i)){case'array':case'date':case'number':return i.toString();case'object':var o=[];for(x=0;x<i.length;i++){o.push(i+': '+this.__repr(i[x]));}
return o.join(', ');case'string':return i;default:return i;}},__getType:function(i){if(!i||!i.constructor){return typeof(i);}
var match=i.constructor.toString().match(/Array|Number|String|Object|Date/);return match&&match[0].toLowerCase()||typeof(i);},__pad:function(str,l,s,t){var p=s||' ';var o=str;if(l-str.length>0){o=new Array(Math.ceil(l/p.length)).join(p).substr(0,t=!t?l:t==1?0:Math.ceil(l/2))+str+p.substr(0,l-t);}
return o;},__getInput:function(arg,args){var key=arg.getKey();switch(this.__getType(args)){case'object':var keys=key.split('.');var obj=args;for(var subkey=0;subkey<keys.length;subkey++){obj=obj[keys[subkey]];}
if(typeof(obj)!='undefined'){if(strings.strConversion.__getType(obj)=='array'){return arg.getFormat().match(/\.\*/)&&obj[1]||obj;}
return obj;}
else{}
break;case'array':key=parseInt(key,10);if(arg.getFormat().match(/\.\*/)&&typeof args[key+1]!='undefined'){return args[key+1];}
else if(typeof args[key]!='undefined'){return args[key];}
else{return key;}
break;}
return'{'+key+'}';},__formatToken:function(token,args){var arg=new Argument(token,args);return strings.strConversion[arg.getFormat().slice(-1)](this.__getInput(arg,args),arg);},d:function(input,arg){var o=parseInt(input,10);var p=arg.getPaddingLength();if(p){return this.__pad(o.toString(),p,arg.getPaddingString(),0);}
else{return o;}},i:function(input,args){return this.d(input,args);},o:function(input,arg){var o=input.toString(8);if(arg.isAlternate()){o=this.__pad(o,o.length+1,'0',0);}
return this.__pad(o,arg.getPaddingLength(),arg.getPaddingString(),0);},u:function(input,args){return Math.abs(this.d(input,args));},x:function(input,arg){var o=parseInt(input,10).toString(16);o=this.__pad(o,arg.getPaddingLength(),arg.getPaddingString(),0);return arg.isAlternate()?'0x'+o:o;},X:function(input,arg){return this.x(input,arg).toUpperCase();},e:function(input,arg){return parseFloat(input,10).toExponential(arg.getPrecision());},E:function(input,arg){return this.e(input,arg).toUpperCase();},f:function(input,arg){return this.__pad(parseFloat(input,10).toFixed(arg.getPrecision()),arg.getPaddingLength(),arg.getPaddingString(),0);},F:function(input,args){return this.f(input,args);},g:function(input,arg){var o=parseFloat(input,10);return(o.toString().length>6)?Math.round(o.toExponential(arg.getPrecision())):o;},G:function(input,args){return this.g(input,args);},c:function(input,args){var match=input.match(/\w|\d/);return match&&match[0]||'';},r:function(input,args){return this.__repr(input);},s:function(input,args){return input.toString&&input.toString()||''+input;}},format:function(str,args){var end=0;var start=0;var match=false;var buffer=[];var token='';var tmp=(str||'').split('');for(start=0;start<tmp.length;start++){if(tmp[start]=='{'&&tmp[start+1]!='{'){end=str.indexOf('}',start);token=tmp.slice(start+1,end).join('');if(tmp[start-1]!='{'&&tmp[end+1]!='}'){var tokenArgs=(typeof arguments[1]!='object')?arguments2Array(arguments,2):args||[];buffer.push(strings.strConversion.__formatToken(token,tokenArgs));}
else{buffer.push(token);}}
else if(start>end||buffer.length<1){buffer.push(tmp[start]);}}
return(buffer.length>1)?buffer.join(''):buffer[0];},calc:function(str,args){return eval(format(str,args));},repeat:function(s,n){return new Array(n+1).join(s);},UTF8encode:function(s){return unescape(encodeURIComponent(s));},UTF8decode:function(s){return decodeURIComponent(escape(s));},tpl:function(){var out='';var render=true;if(arguments.length==2&&$.isArray(arguments[1])){this[arguments[0]]=arguments[1].join('');return $(this[arguments[0]]);}
if(arguments.length==2&&$.isString(arguments[1])){this[arguments[0]]=arguments[1];return $(this[arguments[0]]);}
if(arguments.length==1){return $(this[arguments[0]]);}
if(arguments.length==2&&arguments[1]==false){return this[arguments[0]];}
if(arguments.length==2&&$.isObject(arguments[1])){return $($.format(this[arguments[0]],arguments[1]));}
if(arguments.length==3&&$.isObject(arguments[1])){return(arguments[2]==true)?$.format(this[arguments[0]],arguments[1]):$($.format(this[arguments[0]],arguments[1]));}}};var Argument=function(arg,args){this.__arg=arg;this.__args=args;this.__max_precision=parseFloat('1.'+(new Array(32)).join('1'),10).toString().length-3;this.__def_precision=6;this.getString=function(){return this.__arg;};this.getKey=function(){return this.__arg.split(':')[0];};this.getFormat=function(){var match=this.getString().split(':');return(match&&match[1])?match[1]:'s';};this.getPrecision=function(){var match=this.getFormat().match(/\.(\d+|\*)/g);if(!match){return this.__def_precision;}
else{match=match[0].slice(1);if(match!='*'){return parseInt(match,10);}
else if(strings.strConversion.__getType(this.__args)=='array'){return this.__args[1]&&this.__args[0]||this.__def_precision;}
else if(strings.strConversion.__getType(this.__args)=='object'){return this.__args[this.getKey()]&&this.__args[this.getKey()][0]||this.__def_precision;}
else{return this.__def_precision;}}};this.getPaddingLength=function(){var match=false;if(this.isAlternate()){match=this.getString().match(/0?#0?(\d+)/);if(match&&match[1]){return parseInt(match[1],10);}}
match=this.getString().match(/(0|\.)(\d+|\*)/g);return match&&parseInt(match[0].slice(1),10)||0;};this.getPaddingString=function(){var o='';if(this.isAlternate()){o=' ';}
if(this.getFormat().match(/#0|0#|^0|\.\d+/)){o='0';}
return o;};this.getFlags=function(){var match=this.getString().matc(/^(0|\#|\-|\+|\s)+/);return match&&match[0].split('')||[];};this.isAlternate=function(){return!!this.getFormat().match(/^0?#/);};};var arguments2Array=function(args,shift){var o=[];for(l=args.length,x=(shift||0)-1;x<l;x++){o.push(args[x]);}
return o;};$.extend(strings);})(jQuery);(function($){var hash=window.location.hash;var handlers=[];var opt={};$.extend({anchorHandler:{apply:function(){$.map(handlers,function(handler){var match=hash.match(handler.r)&&hash.match(handler.r)[0]||false;if(match){handler.cb.apply($('a[href*='+match+']').get(0),[handler.r,hash||'']);}});return $.anchorHandler;},add:function(regexp,callback,options){var opt=$.extend({handleClick:true,preserveHash:true},options);if(opt.handleClick){$('a[href*=#]').each(function(i,a){if(a.href.match(regexp)){$(a).bind('click.anchorHandler',function(){if(opt.preserveHash){window.location.hash=a.hash;}
return callback.apply(this,[regexp,a.href]);});}});}
handlers.push({r:regexp,cb:callback});$($.anchorHandler.apply);return $.anchorHandler;}}});})(jQuery);jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1;}
var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}
expires='; expires='+date.toUTCString();}
var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}};(function($){function countdown(el,options){var calc=function(target,current){var current=current||new Date();if(current>=target){return true;}
var o={};var remain=Math.floor((target.getTime()-current.getTime())/1000);o.days=Math.floor(remain/86400);remain%=86400;o.hours=Math.floor(remain/3600);remain%=3600;o.minutes=Math.floor(remain/60);remain%=60;o.seconds=remain;o.years=Math.floor(o.days/365);o.months=Math.floor(o.days/30);o.weeks=Math.floor(o.days/7);return o;};var getWeek=function(date){var onejan=new Date(date.getFullYear(),0,1);return Math.ceil((((date-onejan)/86400000)+onejan.getDay())/7);};var options=$.extend({date:new Date(),modifiers:[],interval:1000,msgFormat:'%d [day|days] %hh %mm %ss',msgNow:'Now !'},options);var tokens={y:new RegExp('\\%y(.+?)\\[(\\w+)\\|(\\w+)\\]','g'),M:new RegExp('\\%M(.+?)\\[(\\w+)\\|(\\w+)\\]','g'),w:new RegExp('\\%w(.+?)\\[(\\w+)\\|(\\w+)\\]','g'),d:new RegExp('\\%d(.+?)\\[(\\w+)\\|(\\w+)\\]','g'),h:new RegExp('\\%h(.+?)\\[(\\w+)\\|(\\w+)\\]','g'),m:new RegExp('\\%m(.+?)\\[(\\w+)\\|(\\w+)\\]','g'),s:new RegExp('\\%s(.+?)\\[(\\w+)\\|(\\w+)\\]','g')};var formatToken=function(str,token,val){return(!tokens[token])?'':str.match(/\[|\]/g)&&(str.replace(tokens[token],val+'$1'+((parseInt(val,10)<2)?'$2':'$3'))||'')||str.replace('%'+token,val);};var format=function(str,obj){var o=str;o=formatToken(o,'y',obj.years);o=formatToken(o,'M',obj.months);o=formatToken(o,'w',obj.weeks);o=formatToken(o,'d',obj.days);o=formatToken(o,'h',obj.hours);o=formatToken(o,'m',obj.minutes);o=formatToken(o,'s',obj.seconds);return o;};var update=function(){var date_obj=calc(cd.date);if(date_obj===true){cd.stop();clearInterval(cd.id);$(cd.el).html(options.msgNow);return true;}
else{$(cd.el).text(format(options.msgFormat,date_obj));}};var apply_modifiers=function(modifiers,date){if(modifiers.length===0){return date;}
var modifier_re=/^([+-]\d+)([yMdhms])$/;var conversions={s:1000,m:60*1000,h:60*60*1000,d:24*60*60*1000,M:30*24*60*60*1000,y:365*24*60*60*1000};var displacement=0;for(var i=0,n=modifiers.length;i<n;++i){var match=modifiers[i].match(modifier_re);if(match!==null){displacement+=parseInt(match[1],10)*conversions[match[2]];}}
return new Date(date.getTime()+displacement);};var cd={id:setInterval(update,options.interval),el:el,start:function(){return new countdown($(this.el),options);},stop:function(){return clearInterval(this.id);},date:apply_modifiers(options.modifiers,options.date)};$(el).data('countdown',cd);update();return $(el).data('countdown');}
$.fn.countdown=function(args){if(this.get(0))return new countdown(this.get(0),args);};})(jQuery);;(function($){var ver='2.24';var ie6=$.browser.msie&&/MSIE 6.0/.test(navigator.userAgent);function log(){if(window.console&&window.console.log)
window.console.log('[cycle] '+Array.prototype.join.call(arguments,''));};$.fn.cycle=function(options){return this.each(function(){if(options===undefined||options===null)
options={};if(options.constructor==String){switch(options){case'stop':if(this.cycleTimeout)clearTimeout(this.cycleTimeout);this.cycleTimeout=0;$(this).data('cycle.opts','');return;case'pause':this.cyclePause=1;return;case'resume':this.cyclePause=0;return;default:options={fx:options};};}
else if(options.constructor==Number){var num=options;options=$(this).data('cycle.opts');if(!options){log('options not found, can not advance slide');return;}
if(num<0||num>=options.elements.length){log('invalid slide index: '+num);return;}
options.nextSlide=num;if(this.cycleTimeout){clearTimeout(this.cycleTimeout);this.cycleTimeout=0;}
go(options.elements,options,1,1);return;}
if(this.cycleTimeout)clearTimeout(this.cycleTimeout);this.cycleTimeout=0;this.cyclePause=0;var $cont=$(this);var $slides=options.slideExpr?$(options.slideExpr,this):$cont.children();var els=$slides.get();if(els.length<2){log('terminating; too few slides: '+els.length);return;}
var opts=$.extend({},$.fn.cycle.defaults,options||{},$.metadata?$cont.metadata():$.meta?$cont.data():{});if(opts.autostop)
opts.countdown=opts.autostopCount||els.length;$cont.data('cycle.opts',opts);opts.container=this;opts.elements=els;opts.before=opts.before?[opts.before]:[];opts.after=opts.after?[opts.after]:[];opts.after.unshift(function(){opts.busy=0;});if(opts.continuous)
opts.after.push(function(){go(els,opts,0,!opts.rev);});if(ie6&&opts.cleartype&&!opts.cleartypeNoBg)
clearTypeFix($slides);var cls=this.className;opts.width=parseInt((cls.match(/w:(\d+)/)||[])[1])||opts.width;opts.height=parseInt((cls.match(/h:(\d+)/)||[])[1])||opts.height;opts.timeout=parseInt((cls.match(/t:(\d+)/)||[])[1])||opts.timeout;if($cont.css('position')=='static')
$cont.css('position','relative');if(opts.width)
$cont.width(opts.width);if(opts.height&&opts.height!='auto')
$cont.height(opts.height);if(opts.random){opts.randomMap=[];for(var i=0;i<els.length;i++)
opts.randomMap.push(i);opts.randomMap.sort(function(a,b){return Math.random()-0.5;});opts.randomIndex=0;opts.startingSlide=opts.randomMap[0];}
else if(opts.startingSlide>=els.length)
opts.startingSlide=0;var first=opts.startingSlide||0;$slides.css({position:'absolute',top:0,left:0}).hide().each(function(i){var z=first?i>=first?els.length-(i-first):first-i:els.length-i;$(this).css('z-index',z)});$(els[first]).css('opacity',1).show();if($.browser.msie)els[first].style.removeAttribute('filter');if(opts.fit&&opts.width)
$slides.width(opts.width);if(opts.fit&&opts.height&&opts.height!='auto')
$slides.height(opts.height);if(opts.pause)
$cont.hover(function(){this.cyclePause=1;},function(){this.cyclePause=0;});var init=$.fn.cycle.transitions[opts.fx];if($.isFunction(init))
init($cont,$slides,opts);else if(opts.fx!='custom')
log('unknown transition: '+opts.fx);$slides.each(function(){var $el=$(this);this.cycleH=(opts.fit&&opts.height)?opts.height:$el.height();this.cycleW=(opts.fit&&opts.width)?opts.width:$el.width();});opts.cssBefore=opts.cssBefore||{};opts.animIn=opts.animIn||{};opts.animOut=opts.animOut||{};$slides.not(':eq('+first+')').css(opts.cssBefore);if(opts.cssFirst)
$($slides[first]).css(opts.cssFirst);if(opts.timeout){if(opts.speed.constructor==String)
opts.speed={slow:600,fast:200}[opts.speed]||400;if(!opts.sync)
opts.speed=opts.speed/2;while((opts.timeout-opts.speed)<250)
opts.timeout+=opts.speed;}
if(opts.easing)
opts.easeIn=opts.easeOut=opts.easing;if(!opts.speedIn)
opts.speedIn=opts.speed;if(!opts.speedOut)
opts.speedOut=opts.speed;opts.slideCount=els.length;opts.currSlide=first;if(opts.random){opts.nextSlide=opts.currSlide;if(++opts.randomIndex==els.length)
opts.randomIndex=0;opts.nextSlide=opts.randomMap[opts.randomIndex];}
else
opts.nextSlide=opts.startingSlide>=(els.length-1)?0:opts.startingSlide+1;var e0=$slides[first];if(opts.before.length)
opts.before[0].apply(e0,[e0,e0,opts,true]);if(opts.after.length>1)
opts.after[1].apply(e0,[e0,e0,opts,true]);if(opts.click&&!opts.next)
opts.next=opts.click;if(opts.next)
$(opts.next).bind('click',function(){return advance(els,opts,opts.rev?-1:1)});if(opts.prev)
$(opts.prev).bind('click',function(){return advance(els,opts,opts.rev?1:-1)});if(opts.pager)
buildPager(els,opts);opts.addSlide=function(newSlide){var $s=$(newSlide),s=$s[0];if(!opts.autostopCount)
opts.countdown++;els.push(s);if(opts.els)
opts.els.push(s);opts.slideCount=els.length;$s.css('position','absolute').appendTo($cont);if(ie6&&opts.cleartype&&!opts.cleartypeNoBg)
clearTypeFix($s);if(opts.fit&&opts.width)
$s.width(opts.width);if(opts.fit&&opts.height&&opts.height!='auto')
$slides.height(opts.height);s.cycleH=(opts.fit&&opts.height)?opts.height:$s.height();s.cycleW=(opts.fit&&opts.width)?opts.width:$s.width();$s.css(opts.cssBefore);if(opts.pager)
$.fn.cycle.createPagerAnchor(els.length-1,s,$(opts.pager),els,opts);if(typeof opts.onAddSlide=='function')
opts.onAddSlide($s);};if(opts.timeout||opts.continuous)
this.cycleTimeout=setTimeout(function(){go(els,opts,0,!opts.rev)},opts.continuous?10:opts.timeout+(opts.delay||0));});};function go(els,opts,manual,fwd){if(opts.busy)return;var p=opts.container,curr=els[opts.currSlide],next=els[opts.nextSlide];if(p.cycleTimeout===0&&!manual)
return;if(!manual&&!p.cyclePause&&((opts.autostop&&(--opts.countdown<=0))||(opts.nowrap&&!opts.random&&opts.nextSlide<opts.currSlide))){if(opts.end)
opts.end(opts);return;}
if(manual||!p.cyclePause){if(opts.before.length)
$.each(opts.before,function(i,o){o.apply(next,[curr,next,opts,fwd]);});var after=function(){if($.browser.msie&&opts.cleartype)
this.style.removeAttribute('filter');$.each(opts.after,function(i,o){o.apply(next,[curr,next,opts,fwd]);});};if(opts.nextSlide!=opts.currSlide){opts.busy=1;if(opts.fxFn)
opts.fxFn(curr,next,opts,after,fwd);else if($.isFunction($.fn.cycle[opts.fx]))
$.fn.cycle[opts.fx](curr,next,opts,after);else
$.fn.cycle.custom(curr,next,opts,after);}
if(opts.random){opts.currSlide=opts.nextSlide;if(++opts.randomIndex==els.length)
opts.randomIndex=0;opts.nextSlide=opts.randomMap[opts.randomIndex];}
else{var roll=(opts.nextSlide+1)==els.length;opts.nextSlide=roll?0:opts.nextSlide+1;opts.currSlide=roll?els.length-1:opts.nextSlide-1;}
if(opts.pager)
$.fn.cycle.updateActivePagerLink(opts.pager,opts.currSlide);}
if(opts.timeout&&!opts.continuous)
p.cycleTimeout=setTimeout(function(){go(els,opts,0,!opts.rev)},opts.timeout);else if(opts.continuous&&p.cyclePause)
p.cycleTimeout=setTimeout(function(){go(els,opts,0,!opts.rev)},10);};$.fn.cycle.updateActivePagerLink=function(pager,currSlide){$(pager).find('a').removeClass('activeSlide').filter('a:eq('+currSlide+')').addClass('activeSlide');};function advance(els,opts,val){var p=opts.container,timeout=p.cycleTimeout;if(timeout){clearTimeout(timeout);p.cycleTimeout=0;}
if(opts.random&&val<0){opts.randomIndex--;if(--opts.randomIndex==-2)
opts.randomIndex=els.length-2;else if(opts.randomIndex==-1)
opts.randomIndex=els.length-1;opts.nextSlide=opts.randomMap[opts.randomIndex];}
else if(opts.random){if(++opts.randomIndex==els.length)
opts.randomIndex=0;opts.nextSlide=opts.randomMap[opts.randomIndex];}
else{opts.nextSlide=opts.currSlide+val;if(opts.nextSlide<0){if(opts.nowrap)return false;opts.nextSlide=els.length-1;}
else if(opts.nextSlide>=els.length){if(opts.nowrap)return false;opts.nextSlide=0;}}
log('nextSlide: '+opts.nextSlide+'; randomIndex: '+opts.randomIndex);if(opts.prevNextClick&&typeof opts.prevNextClick=='function')
opts.prevNextClick(val>0,opts.nextSlide,els[opts.nextSlide]);go(els,opts,1,val>=0);return false;};function buildPager(els,opts){var $p=$(opts.pager);$.each(els,function(i,o){$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);});$.fn.cycle.updateActivePagerLink(opts.pager,opts.startingSlide);};$.fn.cycle.createPagerAnchor=function(i,el,$p,els,opts){var $a=(typeof opts.pagerAnchorBuilder=='function')?$(opts.pagerAnchorBuilder(i,el)):$('<a href="#">'+(i+1)+'</a>');if($a.parents('body').length==0)
$a.appendTo($p);$a.bind(opts.pagerEvent,function(){opts.nextSlide=i;var p=opts.container,timeout=p.cycleTimeout;if(timeout){clearTimeout(timeout);p.cycleTimeout=0;}
if(typeof opts.pagerClick=='function')
opts.pagerClick(opts.nextSlide,els[opts.nextSlide]);go(els,opts,1,opts.currSlide<i);return false;});};function clearTypeFix($slides){function hex(s){var s=parseInt(s).toString(16);return s.length<2?'0'+s:s;};function getBg(e){for(;e&&e.nodeName.toLowerCase()!='html';e=e.parentNode){var v=$.css(e,'background-color');if(v.indexOf('rgb')>=0){var rgb=v.match(/\d+/g);return'#'+hex(rgb[0])+hex(rgb[1])+hex(rgb[2]);}
if(v&&v!='transparent')
return v;}
return'#ffffff';};$slides.each(function(){$(this).css('background-color',getBg(this));});};$.fn.cycle.custom=function(curr,next,opts,cb){var $l=$(curr),$n=$(next);$n.css(opts.cssBefore);var fn=function(){$n.animate(opts.animIn,opts.speedIn,opts.easeIn,cb)};$l.animate(opts.animOut,opts.speedOut,opts.easeOut,function(){if(opts.cssAfter)$l.css(opts.cssAfter);if(!opts.sync)fn();});if(opts.sync)fn();};$.fn.cycle.transitions={fade:function($cont,$slides,opts){$slides.not(':eq('+opts.startingSlide+')').css('opacity',0);opts.before.push(function(){$(this).show()});opts.animIn={opacity:1};opts.animOut={opacity:0};opts.cssBefore={opacity:0};opts.cssAfter={display:'none'};}};$.fn.cycle.ver=function(){return ver;};$.fn.cycle.defaults={fx:'fade',timeout:4000,continuous:0,speed:1000,speedIn:null,speedOut:null,next:null,prev:null,prevNextClick:null,pager:null,pagerClick:null,pagerEvent:'click',pagerAnchorBuilder:null,before:null,after:null,end:null,easing:null,easeIn:null,easeOut:null,shuffle:null,animIn:null,animOut:null,cssBefore:null,cssAfter:null,fxFn:null,height:'auto',startingSlide:0,sync:1,random:0,fit:0,pause:0,autostop:0,autostopCount:0,delay:0,slideExpr:null,cleartype:0,nowrap:0};})(jQuery);(function($){$.fn.cycle.transitions.scrollUp=function($cont,$slides,opts){$cont.css('overflow','hidden');opts.before.push(function(curr,next,opts){$(this).show();opts.cssBefore.top=next.offsetHeight;opts.animOut.top=0-curr.offsetHeight;});opts.cssFirst={top:0};opts.animIn={top:0};opts.cssAfter={display:'none'};};$.fn.cycle.transitions.scrollDown=function($cont,$slides,opts){$cont.css('overflow','hidden');opts.before.push(function(curr,next,opts){$(this).show();opts.cssBefore.top=0-next.offsetHeight;opts.animOut.top=curr.offsetHeight;});opts.cssFirst={top:0};opts.animIn={top:0};opts.cssAfter={display:'none'};};$.fn.cycle.transitions.scrollLeft=function($cont,$slides,opts){$cont.css('overflow','hidden');opts.before.push(function(curr,next,opts){$(this).show();opts.cssBefore.left=next.offsetWidth;opts.animOut.left=0-curr.offsetWidth;});opts.cssFirst={left:0};opts.animIn={left:0};};$.fn.cycle.transitions.scrollRight=function($cont,$slides,opts){$cont.css('overflow','hidden');opts.before.push(function(curr,next,opts){$(this).show();opts.cssBefore.left=0-next.offsetWidth;opts.animOut.left=curr.offsetWidth;});opts.cssFirst={left:0};opts.animIn={left:0};};$.fn.cycle.transitions.scrollHorz=function($cont,$slides,opts){$cont.css('overflow','hidden').width();opts.before.push(function(curr,next,opts,fwd){$(this).show();var currW=curr.offsetWidth,nextW=next.offsetWidth;opts.cssBefore=fwd?{left:nextW}:{left:-nextW};opts.animIn.left=0;opts.animOut.left=fwd?-currW:currW;$slides.not(curr).css(opts.cssBefore);});opts.cssFirst={left:0};opts.cssAfter={display:'none'}};$.fn.cycle.transitions.scrollVert=function($cont,$slides,opts){$cont.css('overflow','hidden');opts.before.push(function(curr,next,opts,fwd){$(this).show();var currH=curr.offsetHeight,nextH=next.offsetHeight;opts.cssBefore=fwd?{top:-nextH}:{top:nextH};opts.animIn.top=0;opts.animOut.top=fwd?currH:-currH;$slides.not(curr).css(opts.cssBefore);});opts.cssFirst={top:0};opts.cssAfter={display:'none'}};$.fn.cycle.transitions.slideX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(curr).css('zIndex',1);});opts.onAddSlide=function($s){$s.hide();};opts.cssBefore={zIndex:2};opts.animIn={width:'show'};opts.animOut={width:'hide'};};$.fn.cycle.transitions.slideY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(curr).css('zIndex',1);});opts.onAddSlide=function($s){$s.hide();};opts.cssBefore={zIndex:2};opts.animIn={height:'show'};opts.animOut={height:'hide'};};$.fn.cycle.transitions.shuffle=function($cont,$slides,opts){var w=$cont.css('overflow','visible').width();$slides.css({left:0,top:0});opts.before.push(function(){$(this).show()});opts.speed=opts.speed/2;opts.random=0;opts.shuffle=opts.shuffle||{left:-w,top:15};opts.els=[];for(var i=0;i<$slides.length;i++)
opts.els.push($slides[i]);for(var i=0;i<opts.startingSlide;i++)
opts.els.push(opts.els.shift());opts.fxFn=function(curr,next,opts,cb,fwd){var $el=fwd?$(curr):$(next);$el.animate(opts.shuffle,opts.speedIn,opts.easeIn,function(){fwd?opts.els.push(opts.els.shift()):opts.els.unshift(opts.els.pop());if(fwd)
for(var i=0,len=opts.els.length;i<len;i++)
$(opts.els[i]).css('z-index',len-i);else{var z=$(curr).css('z-index');$el.css('z-index',parseInt(z)+1);}
$el.animate({left:0,top:0},opts.speedOut,opts.easeOut,function(){$(fwd?this:curr).hide();if(cb)cb();});});};opts.onAddSlide=function($s){$s.hide();};};$.fn.cycle.transitions.turnUp=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(this).show();opts.cssBefore.top=next.cycleH;opts.animIn.height=next.cycleH;});opts.onAddSlide=function($s){$s.hide();};opts.cssFirst={top:0};opts.cssBefore={height:0};opts.animIn={top:0};opts.animOut={height:0};opts.cssAfter={display:'none'};};$.fn.cycle.transitions.turnDown=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(this).show();opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH;});opts.onAddSlide=function($s){$s.hide();};opts.cssFirst={top:0};opts.cssBefore={top:0,height:0};opts.animOut={height:0};opts.cssAfter={display:'none'};};$.fn.cycle.transitions.turnLeft=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(this).show();opts.cssBefore.left=next.cycleW;opts.animIn.width=next.cycleW;});opts.onAddSlide=function($s){$s.hide();};opts.cssBefore={width:0};opts.animIn={left:0};opts.animOut={width:0};opts.cssAfter={display:'none'};};$.fn.cycle.transitions.turnRight=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(this).show();opts.animIn.width=next.cycleW;opts.animOut.left=curr.cycleW;});opts.onAddSlide=function($s){$s.hide();};opts.cssBefore={left:0,width:0};opts.animIn={left:0};opts.animOut={width:0};opts.cssAfter={display:'none'};};$.fn.cycle.transitions.zoom=function($cont,$slides,opts){opts.cssFirst={top:0,left:0};opts.cssAfter={display:'none'};opts.before.push(function(curr,next,opts){$(this).show();opts.cssBefore={width:0,height:0,top:next.cycleH/2,left:next.cycleW/2};opts.cssAfter={display:'none'};opts.animIn={top:0,left:0,width:next.cycleW,height:next.cycleH};opts.animOut={width:0,height:0,top:curr.cycleH/2,left:curr.cycleW/2};$(curr).css('zIndex',2);$(next).css('zIndex',1);});opts.onAddSlide=function($s){$s.hide();};};$.fn.cycle.transitions.fadeZoom=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){opts.cssBefore={width:0,height:0,opacity:1,left:next.cycleW/2,top:next.cycleH/2,zIndex:1};opts.animIn={top:0,left:0,width:next.cycleW,height:next.cycleH};});opts.animOut={opacity:0};opts.cssAfter={zIndex:0};};$.fn.cycle.transitions.blindX=function($cont,$slides,opts){var w=$cont.css('overflow','hidden').width();$slides.show();opts.before.push(function(curr,next,opts){$(curr).css('zIndex',1);});opts.cssBefore={left:w,zIndex:2};opts.cssAfter={zIndex:1};opts.animIn={left:0};opts.animOut={left:w};};$.fn.cycle.transitions.blindY=function($cont,$slides,opts){var h=$cont.css('overflow','hidden').height();$slides.show();opts.before.push(function(curr,next,opts){$(curr).css('zIndex',1);});opts.cssBefore={top:h,zIndex:2};opts.cssAfter={zIndex:1};opts.animIn={top:0};opts.animOut={top:h};};$.fn.cycle.transitions.blindZ=function($cont,$slides,opts){var h=$cont.css('overflow','hidden').height();var w=$cont.width();$slides.show();opts.before.push(function(curr,next,opts){$(curr).css('zIndex',1);});opts.cssBefore={top:h,left:w,zIndex:2};opts.cssAfter={zIndex:1};opts.animIn={top:0,left:0};opts.animOut={top:h,left:w};};$.fn.cycle.transitions.growX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){opts.cssBefore={left:this.cycleW/2,width:0,zIndex:2};opts.animIn={left:0,width:this.cycleW};opts.animOut={left:0};$(curr).css('zIndex',1);});opts.onAddSlide=function($s){$s.hide().css('zIndex',1);};};$.fn.cycle.transitions.growY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){opts.cssBefore={top:this.cycleH/2,height:0,zIndex:2};opts.animIn={top:0,height:this.cycleH};opts.animOut={top:0};$(curr).css('zIndex',1);});opts.onAddSlide=function($s){$s.hide().css('zIndex',1);};};$.fn.cycle.transitions.curtainX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){opts.cssBefore={left:next.cycleW/2,width:0,zIndex:1,display:'block'};opts.animIn={left:0,width:this.cycleW};opts.animOut={left:curr.cycleW/2,width:0};$(curr).css('zIndex',2);});opts.onAddSlide=function($s){$s.hide();};opts.cssAfter={zIndex:1,display:'none'};};$.fn.cycle.transitions.curtainY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){opts.cssBefore={top:next.cycleH/2,height:0,zIndex:1,display:'block'};opts.animIn={top:0,height:this.cycleH};opts.animOut={top:curr.cycleH/2,height:0};$(curr).css('zIndex',2);});opts.onAddSlide=function($s){$s.hide();};opts.cssAfter={zIndex:1,display:'none'};};$.fn.cycle.transitions.cover=function($cont,$slides,opts){var d=opts.direction||'left';var w=$cont.css('overflow','hidden').width();var h=$cont.height();opts.before.push(function(curr,next,opts){opts.cssBefore=opts.cssBefore||{};opts.cssBefore.zIndex=2;opts.cssBefore.display='block';if(d=='right')
opts.cssBefore.left=-w;else if(d=='up')
opts.cssBefore.top=h;else if(d=='down')
opts.cssBefore.top=-h;else
opts.cssBefore.left=w;$(curr).css('zIndex',1);});if(!opts.animIn)opts.animIn={left:0,top:0};if(!opts.animOut)opts.animOut={left:0,top:0};opts.cssAfter=opts.cssAfter||{};opts.cssAfter.zIndex=2;opts.cssAfter.display='none';};$.fn.cycle.transitions.uncover=function($cont,$slides,opts){var d=opts.direction||'left';var w=$cont.css('overflow','hidden').width();var h=$cont.height();opts.before.push(function(curr,next,opts){opts.cssBefore.display='block';if(d=='right')
opts.animOut.left=w;else if(d=='up')
opts.animOut.top=-h;else if(d=='down')
opts.animOut.top=h;else
opts.animOut.left=-w;$(curr).css('zIndex',2);$(next).css('zIndex',1);});opts.onAddSlide=function($s){$s.hide();};if(!opts.animIn)opts.animIn={left:0,top:0};opts.cssBefore=opts.cssBefore||{};opts.cssBefore.top=0;opts.cssBefore.left=0;opts.cssAfter=opts.cssAfter||{};opts.cssAfter.zIndex=1;opts.cssAfter.display='none';};$.fn.cycle.transitions.toss=function($cont,$slides,opts){var w=$cont.css('overflow','visible').width();var h=$cont.height();opts.before.push(function(curr,next,opts){$(curr).css('zIndex',2);opts.cssBefore.display='block';if(!opts.animOut.left&&!opts.animOut.top)
opts.animOut={left:w*2,top:-h/2,opacity:0};else
opts.animOut.opacity=0;});opts.onAddSlide=function($s){$s.hide();};opts.cssBefore={left:0,top:0,zIndex:1,opacity:1};opts.animIn={left:0};opts.cssAfter={zIndex:2,display:'none'};};$.fn.cycle.transitions.wipe=function($cont,$slides,opts){var w=$cont.css('overflow','hidden').width();var h=$cont.height();opts.cssBefore=opts.cssBefore||{};var clip;if(opts.clip){if(/l2r/.test(opts.clip))
clip='rect(0px 0px '+h+'px 0px)';else if(/r2l/.test(opts.clip))
clip='rect(0px '+w+'px '+h+'px '+w+'px)';else if(/t2b/.test(opts.clip))
clip='rect(0px '+w+'px 0px 0px)';else if(/b2t/.test(opts.clip))
clip='rect('+h+'px '+w+'px '+h+'px 0px)';else if(/zoom/.test(opts.clip)){var t=parseInt(h/2);var l=parseInt(w/2);clip='rect('+t+'px '+l+'px '+t+'px '+l+'px)';}}
opts.cssBefore.clip=opts.cssBefore.clip||clip||'rect(0px 0px 0px 0px)';var d=opts.cssBefore.clip.match(/(\d+)/g);var t=parseInt(d[0]),r=parseInt(d[1]),b=parseInt(d[2]),l=parseInt(d[3]);opts.before.push(function(curr,next,opts){if(curr==next)return;var $curr=$(curr).css('zIndex',2);var $next=$(next).css({zIndex:3,display:'block'});var step=1,count=parseInt((opts.speedIn/13))-1;function f(){var tt=t?t-parseInt(step*(t/count)):0;var ll=l?l-parseInt(step*(l/count)):0;var bb=b<h?b+parseInt(step*((h-b)/count||1)):h;var rr=r<w?r+parseInt(step*((w-r)/count||1)):w;$next.css({clip:'rect('+tt+'px '+rr+'px '+bb+'px '+ll+'px)'});(step++<=count)?setTimeout(f,13):$curr.css('display','none');}
f();});opts.cssAfter={};opts.animIn={left:0};opts.animOut={left:0};};})(jQuery);(function($){$.extend($.fn,{delayedObserver:function(callback,delay,options){return this.each(function(){var el=$(this);var op=options||{};el.data('oldval',el.val()).data('delay',delay||0.5).data('condition',op.condition||function(){return($(this).data('oldval')==$(this).val());}).data('callback',callback)
[(op.event||'keyup')](function(){if(el.data('condition').apply(el)){return;}
else{if(el.data('timer')){clearTimeout(el.data('timer'));}
el.data('timer',setTimeout(function(){el.data('callback').apply(el);},el.data('delay')*1000));el.data('oldval',el.val());}});});}});})(jQuery);;(function(){var $$;$$=jQuery.fn.flash=function(htmlOptions,pluginOptions,replace,update){var block=replace||$$.replace;pluginOptions=$$.copy($$.pluginOptions,pluginOptions);if(!$$.hasFlash(pluginOptions.version)){if(pluginOptions.expressInstall&&$$.hasFlash(6,0,65)){var expressInstallOptions={flashvars:{MMredirectURL:location,MMplayerType:'PlugIn',MMdoctitle:jQuery('title').text()}};}else if(pluginOptions.update){block=update||$$.update;}else{return this;}}
htmlOptions=$$.copy($$.htmlOptions,expressInstallOptions,htmlOptions);return this.each(function(){block.call(this,$$.copy(htmlOptions));});};$$.copy=function(){var options={},flashvars={};for(var i=0;i<arguments.length;i++){var arg=arguments[i];if(arg==undefined)continue;jQuery.extend(options,arg);if(arg.flashvars==undefined)continue;jQuery.extend(flashvars,arg.flashvars);}
options.flashvars=flashvars;return options;};$$.hasFlash=function(){if(/hasFlash\=true/.test(location))return true;if(/hasFlash\=false/.test(location))return false;var pv=$$.hasFlash.playerVersion().match(/\d+/g);var rv=String([arguments[0],arguments[1],arguments[2]]).match(/\d+/g)||String($$.pluginOptions.version).match(/\d+/g);for(var i=0;i<3;i++){pv[i]=parseInt(pv[i]||0);rv[i]=parseInt(rv[i]||0);if(pv[i]<rv[i])return false;if(pv[i]>rv[i])return true;}
return true;};$$.hasFlash.playerVersion=function(){try{try{var axo=new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');try{axo.AllowScriptAccess='always';}
catch(e){return'6,0,0';}}catch(e){}
return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g,',').match(/^,?(.+),?$/)[1];}catch(e){try{if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){return(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1];}}catch(e){}}
return'0,0,0';};$$.htmlOptions={height:240,flashvars:{},pluginspage:'http://www.adobe.com/go/getflashplayer',src:'#',type:'application/x-shockwave-flash',width:320};$$.pluginOptions={expressInstall:false,update:true,version:'6.0.65'};$$.replace=function(htmlOptions){this.innerHTML='<div class="alt">'+this.innerHTML+'</div>';jQuery(this).addClass('flash-replaced').prepend($$.transform(htmlOptions));};$$.update=function(htmlOptions){var url=String(location).split('?');url.splice(1,0,'?hasFlash=true&');url=url.join('');var msg='<p>This content requires the Flash Player. <a href="http://www.adobe.com/go/getflashplayer">Download Flash Player</a>. Already have Flash Player? <a href="'+url+'">Click here.</a></p>';this.innerHTML='<span class="alt">'+this.innerHTML+'</span>';jQuery(this).addClass('flash-update').prepend(msg);};function toAttributeString(){var s='';for(var key in this)
if(typeof this[key]!='function')
s+=key+'="'+this[key]+'" ';return s;};function toFlashvarsString(){var s='';for(var key in this)
if(typeof this[key]!='function')
s+=key+'='+encodeURIComponent(this[key])+'&';return s.replace(/&$/,'');};$$.transform=function(htmlOptions){htmlOptions.toString=toAttributeString;if(htmlOptions.flashvars)htmlOptions.flashvars.toString=toFlashvarsString;return'<embed '+String(htmlOptions)+'/>';};if(window.attachEvent){window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};});}})();(function($){$._i18n={trans:{},'default':'en',language:'en'};$.i18n=function(){var getTrans=function(ns,str){var trans=false;if($._i18n.trans[$._i18n.language]&&$._i18n.trans[$._i18n.language][ns]&&$._i18n.trans[$._i18n.language][ns][str]){trans=$._i18n.trans[$._i18n.language][ns][str];}
else if($._i18n.trans[$._i18n['default']]&&$._i18n.trans[$._i18n['default']][ns]&&$._i18n.trans[$._i18n['default']][ns][str]){trans=$._i18n.trans[$._i18n['default']][ns][str];}
return trans||str;};if(arguments.length<2){$._i18n.language=arguments[0];return $._i18n.language;}
else{if(typeof(arguments[1])=='string'){var trans=getTrans(arguments[0],arguments[1]);if(arguments[2]&&typeof(arguments[2])=='object'){return $.format(trans,arguments[2]);}
else{return trans;}}
else{var tmp=arguments[0].split('.');var lang=tmp[0];var ns=tmp[1]||'jQuery';if(!$._i18n.trans[lang]){$._i18n.trans[lang]={};$._i18n.trans[lang][ns]=arguments[1];}
else{$.extend($._i18n.trans[lang][ns],arguments[1]);}}}};})(jQuery);(function($){$.fn.caret=function(begin,end){if(this.length==0)return;if(typeof begin=='number'){end=(typeof end=='number')?end:begin;return this.each(function(){if(this.setSelectionRange){this.focus();this.setSelectionRange(begin,end);}else if(this.createTextRange){var range=this.createTextRange();range.collapse(true);range.moveEnd('character',end);range.moveStart('character',begin);range.select();}});}else{if(this[0].setSelectionRange){begin=this[0].selectionStart;end=this[0].selectionEnd;}else if(document.selection&&document.selection.createRange){var range=document.selection.createRange();begin=0-range.duplicate().moveStart('character',-100000);end=begin+range.text.length;}
return{begin:begin,end:end};}};var charMap={'9':"[0-9]",'a':"[A-Za-z]",'*':"[A-Za-z0-9]"};$.mask={addPlaceholder:function(c,r){charMap[c]=r;}};$.fn.unmask=function(){return this.trigger("unmask");};$.fn.mask=function(mask,settings){settings=$.extend({placeholder:"_",completed:null},settings);var re=new RegExp("^"+
$.map(mask.split(""),function(c,i){return charMap[c]||((/[A-Za-z0-9]/.test(c)?"":"\\")+c);}).join('')+"$");return this.each(function(){var input=$(this);var buffer=new Array(mask.length);var locked=new Array(mask.length);var valid=false;var ignore=false;var firstNonMaskPos=null;$.each(mask.split(""),function(i,c){locked[i]=(charMap[c]==null);buffer[i]=locked[i]?c:settings.placeholder;if(!locked[i]&&firstNonMaskPos==null)
firstNonMaskPos=i;});function focusEvent(){checkVal();writeBuffer();setTimeout(function(){$(input[0]).caret(valid?mask.length:firstNonMaskPos);},0);};function keydownEvent(e){var pos=$(this).caret();var k=e.keyCode;ignore=(k<16||(k>16&&k<32)||(k>32&&k<41));if((pos.begin-pos.end)!=0&&(!ignore||k==8||k==46)){clearBuffer(pos.begin,pos.end);}
if(k==8){while(pos.begin-->=0){if(!locked[pos.begin]){buffer[pos.begin]=settings.placeholder;if($.browser.opera){s=writeBuffer();input.val(s.substring(0,pos.begin)+" "+s.substring(pos.begin));$(this).caret(pos.begin+1);}else{writeBuffer();$(this).caret(Math.max(firstNonMaskPos,pos.begin));}
return false;}}}else if(k==46){clearBuffer(pos.begin,pos.begin+1);writeBuffer();$(this).caret(Math.max(firstNonMaskPos,pos.begin));return false;}else if(k==27){clearBuffer(0,mask.length);writeBuffer();$(this).caret(firstNonMaskPos);return false;}};function keypressEvent(e){if(ignore){ignore=false;return(e.keyCode==8)?false:null;}
e=e||window.event;var k=e.charCode||e.keyCode||e.which;var pos=$(this).caret();if(e.ctrlKey||e.altKey){return true;}else if((k>=41&&k<=122)||k==32||k>186){var p=seekNext(pos.begin-1);if(p<mask.length){if(new RegExp(charMap[mask.charAt(p)]).test(String.fromCharCode(k))){buffer[p]=String.fromCharCode(k);writeBuffer();var next=seekNext(p);$(this).caret(next);if(settings.completed&&next==mask.length)
settings.completed.call(input);}}}
return false;};function clearBuffer(start,end){for(var i=start;i<end&&i<mask.length;i++){if(!locked[i])
buffer[i]=settings.placeholder;}};function writeBuffer(){return input.val(buffer.join('')).val();};function checkVal(){var test=input.val();var pos=0;for(var i=0;i<mask.length;i++){if(!locked[i]){buffer[i]=settings.placeholder;while(pos++<test.length){var reChar=new RegExp(charMap[mask.charAt(i)]);if(test.charAt(pos-1).match(reChar)){buffer[i]=test.charAt(pos-1);break;}}}}
var s=writeBuffer();if(!s.match(re)){input.val("");clearBuffer(0,mask.length);valid=false;}else
valid=true;};function seekNext(pos){while(++pos<mask.length){if(!locked[pos])
return pos;}
return mask.length;};input.one("unmask",function(){input.unbind("focus",focusEvent);input.unbind("blur",checkVal);input.unbind("keydown",keydownEvent);input.unbind("keypress",keypressEvent);if($.browser.msie)
this.onpaste=null;else if($.browser.mozilla)
this.removeEventListener('input',checkVal,false);});input.bind("focus",focusEvent);input.bind("blur",checkVal);input.bind("keydown",keydownEvent);input.bind("keypress",keypressEvent);if($.browser.msie)
this.onpaste=function(){setTimeout(checkVal,0);};else if($.browser.mozilla)
this.addEventListener('input',checkVal,false);checkVal();});};})(jQuery);(function($){$.event.special.mousewheel={setup:function(){var handler=$.event.special.mousewheel.handler;if($.browser.mozilla)
$(this).bind('mousemove.mousewheel',function(event){$.data(this,'mwcursorposdata',{pageX:event.pageX,pageY:event.pageY,clientX:event.clientX,clientY:event.clientY});});if(this.addEventListener)
this.addEventListener(($.browser.mozilla?'DOMMouseScroll':'mousewheel'),handler,false);else
this.onmousewheel=handler;},teardown:function(){var handler=$.event.special.mousewheel.handler;$(this).unbind('mousemove.mousewheel');if(this.removeEventListener)
this.removeEventListener(($.browser.mozilla?'DOMMouseScroll':'mousewheel'),handler,false);else
this.onmousewheel=function(){};$.removeData(this,'mwcursorposdata');},handler:function(event){var args=Array.prototype.slice.call(arguments,1);event=$.event.fix(event||window.event);$.extend(event,$.data(this,'mwcursorposdata')||{});var delta=0,returnValue=true;if(event.wheelDelta)delta=event.wheelDelta/120;if(event.detail)delta=-event.detail/3;if($.browser.opera)delta=-event.wheelDelta;event.data=event.data||{};event.type="mousewheel";args.unshift(delta);args.unshift(event);return $.event.handle.apply(this,args);}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel");},unmousewheel:function(fn){return this.unbind("mousewheel",fn);}});})(jQuery);(function($){var win=$(window),options,images,activeImage=-1,activeURL,prevImage,nextImage,compatibleOverlay,middle,centerWidth,centerHeight,ie6=!window.XMLHttpRequest,operaFix=window.opera&&(document.compatMode=="CSS1Compat")&&($.browser.version>=9.3),documentElement=document.documentElement,preload={},preloadPrev=new Image(),preloadNext=new Image(),overlay,center,image,sizer,prevLink,nextLink,bottomContainer,bottom,caption,number;$(function(){$("body").append($([overlay=$('<div id="lbOverlay" />')[0],center=$('<div id="lbCenter" />')[0],bottomContainer=$('<div id="lbBottomContainer" />')[0]]).css("display","none"));image=$('<div id="lbImage" />').appendTo(center).append(sizer=$('<div style="position: relative;" />').append([prevLink=$('<a id="lbPrevLink" href="#" />').click(previous)[0],nextLink=$('<a id="lbNextLink" href="#" />').click(next)[0]])[0])[0];bottom=$('<div id="lbBottom" />').appendTo(bottomContainer).append([$('<a id="lbCloseLink" href="#" />').add(overlay).click(close)[0],caption=$('<div id="lbCaption" />')[0],number=$('<div id="lbNumber" />')[0],$('<div style="clear: both;" />')[0]])[0];});$.slimbox=function(_images,startImage,_options){options=$.extend({loop:false,overlayOpacity:0.8,overlayFadeDuration:400,resizeDuration:400,resizeEasing:"swing",initialWidth:250,initialHeight:250,imageFadeDuration:400,captionAnimationDuration:400,counterText:"Image {x} of {y}",closeKeys:[27,88,67],previousKeys:[37,80],nextKeys:[39,78]},_options);if(typeof _images=="string"){_images=[[_images,startImage]];startImage=0;}
middle=win.scrollTop()+((operaFix?documentElement.clientHeight:win.height())/2);centerWidth=options.initialWidth;centerHeight=options.initialHeight;$(center).css({top:Math.max(0,middle-(centerHeight/2)),width:centerWidth,height:centerHeight,marginLeft:-centerWidth/2}).show();compatibleOverlay=ie6||(overlay.currentStyle&&(overlay.currentStyle.position!="fixed"));if(compatibleOverlay)overlay.style.position="absolute";$(overlay).css("opacity",options.overlayOpacity).fadeIn(options.overlayFadeDuration);position();setup(1);images=_images;options.loop=options.loop&&(images.length>1);return changeImage(startImage);};$.fn.slimbox=function(_options,linkMapper,linksFilter){linkMapper=linkMapper||function(el){return[el.href,el.title];};linksFilter=linksFilter||function(){return true;};var links=this;return links.unbind("click").click(function(){var link=this,startIndex=0,filteredLinks,i=0,length;filteredLinks=$.grep(links,function(el,i){return linksFilter.call(link,el,i);});for(length=filteredLinks.length;i<length;++i){if(filteredLinks[i]==link)startIndex=i;filteredLinks[i]=linkMapper(filteredLinks[i],i);}
return $.slimbox(filteredLinks,startIndex,_options);});};function position(){var l=win.scrollLeft(),w=operaFix?documentElement.clientWidth:win.width();$([center,bottomContainer]).css("left",l+(w/2));if(compatibleOverlay)$(overlay).css({left:l,top:win.scrollTop(),width:w,height:win.height()});}
function setup(open){$("object").add(ie6?"select":"embed").each(function(index,el){if(open)$.data(el,"slimbox",el.style.visibility);el.style.visibility=open?"hidden":$.data(el,"slimbox");});var fn=open?"bind":"unbind";win[fn]("scroll resize",position);$(document)[fn]("keydown",keyDown);}
function keyDown(event){var code=event.keyCode,fn=$.inArray;return(fn(code,options.closeKeys)>=0)?close():(fn(code,options.nextKeys)>=0)?next():(fn(code,options.previousKeys)>=0)?previous():false;}
function previous(){return changeImage(prevImage);}
function next(){return changeImage(nextImage);}
function changeImage(imageIndex){if(imageIndex>=0){activeImage=imageIndex;activeURL=images[activeImage][0];prevImage=(activeImage||(options.loop?images.length:0))-1;nextImage=((activeImage+1)%images.length)||(options.loop?0:-1);stop();center.className="lbLoading";preload=new Image();preload.onload=animateBox;preload.src=activeURL;}
return false;}
function animateBox(){center.className="";$(image).css({backgroundImage:"url("+activeURL+")",visibility:"hidden",display:""});$(sizer).width(preload.width);$([sizer,prevLink,nextLink]).height(preload.height);$(caption).html(images[activeImage][1]||"");$(number).html((((images.length>1)&&options.counterText)||"").replace(/{x}/,activeImage+1).replace(/{y}/,images.length));if(prevImage>=0)preloadPrev.src=images[prevImage][0];if(nextImage>=0)preloadNext.src=images[nextImage][0];centerWidth=image.offsetWidth;centerHeight=image.offsetHeight;var top=Math.max(0,middle-(centerHeight/2));if(center.offsetHeight!=centerHeight){$(center).animate({height:centerHeight,top:top},options.resizeDuration,options.resizeEasing);}
if(center.offsetWidth!=centerWidth){$(center).animate({width:centerWidth,marginLeft:-centerWidth/2},options.resizeDuration,options.resizeEasing);}
$(center).queue(function(){$(bottomContainer).css({width:centerWidth,top:top+centerHeight,marginLeft:-centerWidth/2,visibility:"hidden",display:""});$(image).css({display:"none",visibility:"",opacity:""}).fadeIn(options.imageFadeDuration,animateCaption);});}
function animateCaption(){if(prevImage>=0)$(prevLink).show();if(nextImage>=0)$(nextLink).show();$(bottom).css("marginTop",-bottom.offsetHeight).animate({marginTop:0},options.captionAnimationDuration);bottomContainer.style.visibility="";}
function stop(){preload.onload=null;preload.src=preloadPrev.src=preloadNext.src=activeURL;$([center,image,bottom]).stop(true);$([prevLink,nextLink,image,bottomContainer]).hide();}
function close(){if(activeImage>=0){stop();activeImage=prevImage=nextImage=-1;$(center).hide();$(overlay).stop().fadeOut(options.overlayFadeDuration,setup);}
return false;}})(jQuery);(function($){$.timeago=function(timestamp){if(timestamp instanceof Date)return inWords(timestamp);else if(typeof timestamp=="string")return inWords($.timeago.parse(timestamp));else return inWords($.timeago.parse($(timestamp).attr("title")));};var $t=$.timeago;$.extend($.timeago,{settings:{refreshMillis:60000,allowFuture:false,strings:{ago:"ago",fromNow:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years"}},inWords:function(distanceMillis){var $l=this.settings.strings;var suffix=$l.ago;if(this.settings.allowFuture){if(distanceMillis<0)suffix=$l.fromNow;distanceMillis=Math.abs(distanceMillis);}
var seconds=distanceMillis/1000;var minutes=seconds/60;var hours=minutes/60;var days=hours/24;var years=days/365;var words=seconds<45&&sprintf($l.seconds,Math.round(seconds))||seconds<90&&$l.minute||minutes<45&&sprintf($l.minutes,Math.round(minutes))||minutes<90&&$l.hour||hours<24&&sprintf($l.hours,Math.round(hours))||hours<48&&$l.day||days<30&&sprintf($l.days,Math.floor(days))||days<60&&$l.month||days<365&&sprintf($l.months,Math.floor(days/30))||years<2&&$l.year||sprintf($l.years,Math.floor(years));return words+" "+suffix;},parse:function(iso8601){var s=$.trim(iso8601);s=s.replace(/-/,"/").replace(/-/,"/");s=s.replace(/T/," ").replace(/Z/," UTC");s=s.replace(/([\+-]\d\d)\:?(\d\d)/," $1$2");return new Date(s);}});$.fn.timeago=function(){var self=this;self.each(refresh);var $s=$t.settings;if($s.refreshMillis>0){setInterval(function(){self.each(refresh);},$s.refreshMillis);}
return self;};function refresh(){var date=$t.parse(this.title);if(!isNaN(date)){$(this).text(inWords(date));}
return this;}
function inWords(date){return $t.inWords(distance(date));}
function distance(date){return(new Date().getTime()-date.getTime());}
function sprintf(string,value){return string.replace(/%d/i,value);}
if($.browser.msie&&$.browser.version<7.0){document.createElement('abbr');}})(jQuery);

/* Usage: XPath style Javascript object selection

    This is an implementation of the abbreviated syntax of XPath. You can't use axis::nodetest
    No functions are supported other than last()
    Only node name tests are allowed, no nodetype tests. So you can't do text() and node()
    Indices are zero-based, not 1-based

    para                        selects the para child of the context       -- not all para children of the context
    *                           selects all children of the context
    para[0]                     selects the first para child of the context -- same as /para/0
    para[last()]                selects the last para child of the context  -- same as /para/last()
    * /para                     selects all para grandchildren of the context
    /doc/chapter[5]/section[2]  same as /doc/chapter/5/section/2
    chapter//para               selects the para descendants of the chapter children of the context
    //para                      selects all the para descendants of the context
    //olist/item                selects all the item children of having an olist parent under the context
    .                           selects the context
    .//para                     selects the para element descendants of the context
    ..                          selects the parent of the context

    Not done: (and won't be unless someone asks for it)
        chapter[title] selects the chapter children of the context that have one or more title children
        chapter[title="Introduction"] selects the chapter children of the context that have one or more title children with string-value equal to Introduction

    Limitations:
        Cannot handle self-linked structures (e.g. a.x = a )
 */

var jpath = (function() {
    function _u(arr) { for (var a=arr.slice(0), i=1, l=arguments.length; i<l; i++) { a.unshift(arguments[i]); } return a; }
    function merge(a,b) { return a.push.apply(a, b); }
    function jp(obj, path, parents) {
        if (!path.length)           { return [ obj ]; }
        var id = path[0];
        if (id == "..")             { return jp(parents.shift(), path.slice(1), parents); }
        if (typeof obj != "object") { return path.length == 1 && id == "*" ? [ obj ] : []; }
        if (id == "last()")         { return obj.length ? jp(obj[obj.length-1], path.slice(1), _u(parents, obj)) : []; }
        var out = [];
        if (id !== "") { // Find children
                if (obj.hasOwnProperty(id))     { merge(out, jp(obj[id], path.slice(1), _u(parents, obj))); }
                else if (id == "*")             { for (var i in obj) { if (obj.hasOwnProperty(i)) { merge(out, jp(obj[i], path.slice(1), _u(parents, obj))); } } }
        }
        else { // Find desendants
            id = path[1];
            for (var i in obj) { if (obj.hasOwnProperty(i)) {
                if (obj[i].hasOwnProperty(id))  { merge(out, jp(obj[i][id], path.slice(2), _u(parents, obj, obj[i]))); }
                else if (id == "*" || i === id) { merge(out, jp(obj[i],     path.slice(2), _u(parents, obj        ))); }
                else                            { merge(out, jp(obj[i],     path,          _u(parents, obj        ))); }
            } }
        }
        // TODO: Remove duplicates in out
        return out;
    }

    function jpstr(obj, str) {
        if (str.charAt(0) != "/") { str = "/" + str; }  // Add leading slash if required
        var arr = str.replace(/\/+$/, "")               // Remove trailing slashes
                     .replace(/\/\/+/, "//")            // Convert /// -> //
                     .replace(/\[(\d+)\]/, "/$1")       // Convert chapter[0]/para to chapter/0/para
                     .replace(/\/(\.\/)+/g, "/").replace(/^\.\//, "/").replace(/\/\.$/, "")    // Ignore "."
                     .split("/").slice(1);

        var arr2 = [];
        for (var i=0,l=arr.length,depth=0; i<l; i++) {
            if (depth <= 0) { arr2.push(arr[i]); } else { arr2[arr2.length-1] += "/" + arr[i]; }
            var open  = arr[i].match(/\[/g);
            var close = arr[i].match(/\]/g);
            depth += (open ? open.length : 0) - (close ? close.length : 0);
        }

        return jp(obj, arr2, []);
    }

    return jpstr;
})();
