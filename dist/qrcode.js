!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=9)}([function(t,e){t.exports={L:1,M:0,Q:3,H:2}},function(t,e){t.exports={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8}},function(t,e,r){var n=r(3);function o(t,e){if(null==t.length)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(var n=0;n<t.length-r;n++)this.num[n]=t[n+r]}o.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var i=0;i<t.getLength();i++)e[r+i]^=n.gexp(n.glog(this.get(r))+n.glog(t.get(i)));return new o(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=n.glog(this.get(0))-n.glog(t.get(0)),r=new Array(this.getLength()),i=0;i<this.getLength();i++)r[i]=this.get(i);for(i=0;i<t.getLength();i++)r[i]^=n.gexp(n.glog(t.get(i))+e);return new o(r,0).mod(t)}},t.exports=o},function(t,e){for(var r={glog:function(t){if(t<1)throw new Error("glog("+t+")");return r.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return r.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},n=0;n<8;n++)r.EXP_TABLE[n]=1<<n;for(n=8;n<256;n++)r.EXP_TABLE[n]=r.EXP_TABLE[n-4]^r.EXP_TABLE[n-5]^r.EXP_TABLE[n-6]^r.EXP_TABLE[n-8];for(n=0;n<255;n++)r.LOG_TABLE[r.EXP_TABLE[n]]=n;t.exports=r},function(t,e,r){var n=r(5),o=r(6),i=r(7),a=r(8),u=r(2);function l(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var c=l.prototype;c.addData=function(t){var e=new n(t);this.dataList.push(e),this.dataCache=null},c.isDark=function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},c.getModuleCount=function(){return this.moduleCount},c.make=function(){if(this.typeNumber<1){var t=1;for(t=1;t<40;t++){for(var e=o.getRSBlocks(t,this.errorCorrectLevel),r=new i,n=0,u=0;u<e.length;u++)n+=e[u].dataCount;for(u=0;u<this.dataList.length;u++){var l=this.dataList[u];r.put(l.mode,4),r.put(l.getLength(),a.getLengthInBits(l.mode,t)),l.write(r)}if(r.getLengthInBits()<=8*n)break}this.typeNumber=t}this.makeImpl(!1,this.getBestMaskPattern())},c.makeImpl=function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++)this.modules[r][n]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=l.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},c.setupPositionProbePattern=function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var n=-1;n<=7;n++)e+n<=-1||this.moduleCount<=e+n||(this.modules[t+r][e+n]=0<=r&&r<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=n&&n<=4)},c.getBestMaskPattern=function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var n=a.getLostPoint(this);(0==r||t>n)&&(t=n,e=r)}return e},c.createMovieClip=function(t,e,r){var n=t.createEmptyMovieClip(e,r);this.make();for(var o=0;o<this.modules.length;o++)for(var i=1*o,a=0;a<this.modules[o].length;a++){var u=1*a;this.modules[o][a]&&(n.beginFill(0,100),n.moveTo(u,i),n.lineTo(u+1,i),n.lineTo(u+1,i+1),n.lineTo(u,i+1),n.endFill())}return n},c.setupTimingPattern=function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},c.setupPositionAdjustPattern=function(){for(var t=a.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var n=t[e],o=t[r];if(null==this.modules[n][o])for(var i=-2;i<=2;i++)for(var u=-2;u<=2;u++)this.modules[n+i][o+u]=-2==i||2==i||-2==u||2==u||0==i&&0==u}},c.setupTypeNumber=function(t){for(var e=a.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var n=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=n}for(r=0;r<18;r++){n=!t&&1==(e>>r&1);this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=n}},c.setupTypeInfo=function(t,e){for(var r=this.errorCorrectLevel<<3|e,n=a.getBCHTypeInfo(r),o=0;o<15;o++){var i=!t&&1==(n>>o&1);o<6?this.modules[o][8]=i:o<8?this.modules[o+1][8]=i:this.modules[this.moduleCount-15+o][8]=i}for(o=0;o<15;o++){i=!t&&1==(n>>o&1);o<8?this.modules[8][this.moduleCount-o-1]=i:o<9?this.modules[8][15-o-1+1]=i:this.modules[8][15-o-1]=i}this.modules[this.moduleCount-8][8]=!t},c.mapData=function(t,e){for(var r=-1,n=this.moduleCount-1,o=7,i=0,u=this.moduleCount-1;u>0;u-=2)for(6==u&&u--;;){for(var l=0;l<2;l++)if(null==this.modules[n][u-l]){var c=!1;i<t.length&&(c=1==(t[i]>>>o&1)),a.getMask(e,n,u-l)&&(c=!c),this.modules[n][u-l]=c,-1==--o&&(i++,o=7)}if((n+=r)<0||this.moduleCount<=n){n-=r,r=-r;break}}},l.PAD0=236,l.PAD1=17,l.createData=function(t,e,r){for(var n=o.getRSBlocks(t,e),u=new i,c=0;c<r.length;c++){var s=r[c];u.put(s.mode,4),u.put(s.getLength(),a.getLengthInBits(s.mode,t)),s.write(u)}var f=0;for(c=0;c<n.length;c++)f+=n[c].dataCount;if(u.getLengthInBits()>8*f)throw new Error("code length overflow. ("+u.getLengthInBits()+">"+8*f+")");for(u.getLengthInBits()+4<=8*f&&u.put(0,4);u.getLengthInBits()%8!=0;)u.putBit(!1);for(;!(u.getLengthInBits()>=8*f||(u.put(l.PAD0,8),u.getLengthInBits()>=8*f));)u.put(l.PAD1,8);return l.createBytes(u,n)},l.createBytes=function(t,e){for(var r=0,n=0,o=0,i=new Array(e.length),l=new Array(e.length),c=0;c<e.length;c++){var s=e[c].dataCount,f=e[c].totalCount-s;n=Math.max(n,s),o=Math.max(o,f),i[c]=new Array(s);for(var h=0;h<i[c].length;h++)i[c][h]=255&t.buffer[h+r];r+=s;var g=a.getErrorCorrectPolynomial(f),p=new u(i[c],g.getLength()-1).mod(g);l[c]=new Array(g.getLength()-1);for(h=0;h<l[c].length;h++){var y=h+p.getLength()-l[c].length;l[c][h]=y>=0?p.get(y):0}}var v=0;for(h=0;h<e.length;h++)v+=e[h].totalCount;var d=new Array(v),b=0;for(h=0;h<n;h++)for(c=0;c<e.length;c++)h<i[c].length&&(d[b++]=i[c][h]);for(h=0;h<o;h++)for(c=0;c<e.length;c++)h<l[c].length&&(d[b++]=l[c][h]);return d},t.exports=l},function(t,e,r){var n=r(1);function o(t){this.mode=n.MODE_8BIT_BYTE,this.data=t}o.prototype={getLength:function(t){return this.data.length},write:function(t){for(var e=0;e<this.data.length;e++)t.put(this.data.charCodeAt(e),8)}},t.exports=o},function(t,e,r){var n=r(0);function o(t,e){this.totalCount=t,this.dataCount=e}o.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],o.getRSBlocks=function(t,e){var r=o.getRsBlockTable(t,e);if(null==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var n=r.length/3,i=new Array,a=0;a<n;a++)for(var u=r[3*a+0],l=r[3*a+1],c=r[3*a+2],s=0;s<u;s++)i.push(new o(l,c));return i},o.getRsBlockTable=function(t,e){switch(e){case n.L:return o.RS_BLOCK_TABLE[4*(t-1)+0];case n.M:return o.RS_BLOCK_TABLE[4*(t-1)+1];case n.Q:return o.RS_BLOCK_TABLE[4*(t-1)+2];case n.H:return o.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},t.exports=o},function(t,e){function r(){this.buffer=new Array,this.length=0}r.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},t.exports=r},function(t,e,r){var n=r(1),o=r(2),i=r(3),a=0,u=1,l=2,c=3,s=4,f=5,h=6,g=7,p={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;p.getBCHDigit(e)-p.getBCHDigit(p.G15)>=0;)e^=p.G15<<p.getBCHDigit(e)-p.getBCHDigit(p.G15);return(t<<10|e)^p.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;p.getBCHDigit(e)-p.getBCHDigit(p.G18)>=0;)e^=p.G18<<p.getBCHDigit(e)-p.getBCHDigit(p.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return p.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case a:return(e+r)%2==0;case u:return e%2==0;case l:return r%3==0;case c:return(e+r)%3==0;case s:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case f:return e*r%2+e*r%3==0;case h:return(e*r%2+e*r%3)%2==0;case g:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new o([1],0),r=0;r<t;r++)e=e.multiply(new o([1,i.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case n.MODE_NUMBER:return 10;case n.MODE_ALPHA_NUM:return 9;case n.MODE_8BIT_BYTE:case n.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case n.MODE_NUMBER:return 12;case n.MODE_ALPHA_NUM:return 11;case n.MODE_8BIT_BYTE:return 16;case n.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case n.MODE_NUMBER:return 14;case n.MODE_ALPHA_NUM:return 13;case n.MODE_8BIT_BYTE:return 16;case n.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,n=0;n<e;n++)for(var o=0;o<e;o++){for(var i=0,a=t.isDark(n,o),u=-1;u<=1;u++)if(!(n+u<0||e<=n+u))for(var l=-1;l<=1;l++)o+l<0||e<=o+l||0==u&&0==l||a==t.isDark(n+u,o+l)&&i++;i>5&&(r+=3+i-5)}for(n=0;n<e-1;n++)for(o=0;o<e-1;o++){var c=0;t.isDark(n,o)&&c++,t.isDark(n+1,o)&&c++,t.isDark(n,o+1)&&c++,t.isDark(n+1,o+1)&&c++,0!=c&&4!=c||(r+=3)}for(n=0;n<e;n++)for(o=0;o<e-6;o++)t.isDark(n,o)&&!t.isDark(n,o+1)&&t.isDark(n,o+2)&&t.isDark(n,o+3)&&t.isDark(n,o+4)&&!t.isDark(n,o+5)&&t.isDark(n,o+6)&&(r+=40);for(o=0;o<e;o++)for(n=0;n<e-6;n++)t.isDark(n,o)&&!t.isDark(n+1,o)&&t.isDark(n+2,o)&&t.isDark(n+3,o)&&t.isDark(n+4,o)&&!t.isDark(n+5,o)&&t.isDark(n+6,o)&&(r+=40);var s=0;for(o=0;o<e;o++)for(n=0;n<e;n++)t.isDark(n,o)&&s++;return r+=10*(Math.abs(100*s/e/e-50)/5)}};t.exports=p},function(t,e,r){"use strict";function n(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function o(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}r.r(e);var i=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,r,i;return e=t,i=[{key:"convertHexColorToBytes",value:function(t){var e=[],r=t.replace("#","");if(!/^[0-9A-F]{3,8}$/i.test(r))return[0,0,0,0];switch(r.length){case 3:r+="F";case 4:e.push.apply(e,n(r.split("").map(function(t){return parseInt(t.repeat(2),16)})));break;case 6:r+="FF";case 8:e.push(parseInt(r.substr(0,2),16)),e.push(parseInt(r.substr(2,2),16)),e.push(parseInt(r.substr(4,2),16)),e.push(parseInt(r.substr(6,2),16));break;default:e.push(0,0,0,0)}return e}}],(r=null)&&o(e.prototype,r),i&&o(e,i),t}(),a=r(4),u=r.n(a),l=r(0),c=r.n(l);function s(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function f(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function h(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var g={level:"L",padding:1,invert:!1,typeNumber:0,errorsEnabled:!1},p=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),h(this,"value",void 0),h(this,"level",void 0),h(this,"typeNumber",void 0),h(this,"padding",void 0),h(this,"errorsEnabled",void 0),h(this,"qrCodeData",void 0);var n=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){h(t,e,r[e])})}return t}({},g,r);this.value=e,this.level=n.level,this.typeNumber=n.typeNumber,this.padding=n.padding,this.invert=n.invert,this.errorsEnabled=n.errorsEnabled}var e,r,n;return e=t,(r=[{key:"setValue",value:function(t){this.value=t,this._clearCache()}},{key:"getDataSize",value:function(){var t=this.getData();return t?t.length:0}},{key:"_clearCache",value:function(){this.qrCodeData=null}},{key:"_getQrCodeData",value:function(t){var e=[],r=this.padding,n=this.invert,o=Array(2*r+t.length).fill(n),i=Array(r).fill(o),a=Array(r).fill(n);return r&&e.push.apply(e,s(i)),t.forEach(function(t){var r=[];r.push.apply(r,s(a).concat(s(t.map(function(t){return n?!t:t})),s(a))),e.push(r)}),r&&e.push.apply(e,s(i)),e}},{key:"getData",value:function(){if(!this.qrCodeData)try{var t=new u.a(this.typeNumber,c.a[this.level]);if(t.addData(this.value),t.make(),!t.modules)return null;this.qrCodeData=this._getQrCodeData(t.modules),Object.freeze(this.qrCodeData)}catch(t){if(this.errorsEnabled)throw t;return null}return this.qrCodeData}}])&&f(e.prototype,r),n&&f(e,n),t}();function y(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var v=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,r,n;return e=t,n=[{key:"calculateDimension",value:function(t,e){return"number"==typeof t?t:"string"==typeof t&&t.indexOf("%")>0?Math.round(parseFloat(t)/100*e)||0:parseFloat(t)||0}},{key:"calculatePosition",value:function(t,e,r){if("number"==typeof t)return t;if("string"!=typeof t)return 0;if("left"===t||"top"===t)return 0;if("right"===t||"bottom"===t)return r-e;if("center"===t)return Math.round((r-e)/2);var n=t.match(/^(?:(right|bottom|left|top)\s+)?(-?[0-9.]+)(%)?$/);if(!n)return 0;var o="right"===n[1]||"bottom"===n[1],i=!!n[3],a=parseFloat(n[2])||0;return i&&(a=Math.round(a/100*r)),o&&(a=r-a-e),Math.round(a)}}],(r=null)&&y(e.prototype,r),n&&y(e,n),t}();function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function b(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function m(t,e,r){return(m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=w(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(r):o.value}})(t,e,r||t)}function w(t){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function C(t,e){return(C=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function O(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function _(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var P={image:null},D=function(t){function e(t){var r,n,o,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),n=this,r=!(o=w(e).call(this,t,i))||"object"!==d(o)&&"function"!=typeof o?O(n):o,_(O(O(r)),"image",null),_(O(O(r)),"imageConfig",null);var a=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){_(t,e,r[e])})}return t}({},P,i);return r.image=a.image,r}var r,n,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&C(t,e)}(e,p),r=e,(n=[{key:"_clearCache",value:function(){m(w(e.prototype),"_clearCache",this).call(this),this.imageConfig=null}},{key:"_getImageSource",value:function(t){var e=t.source;return"string"==typeof e?e:e instanceof Image?e.src:e instanceof HTMLCanvasElement?e.toDataURL():null}},{key:"_getImageConfig",value:function(){if(this.imageConfig)return this.imageConfig;if(!(this.image&&this.image.source&&this.image.width&&this.image.height))return null;var t=this.getDataSize();if(!t)return null;var e=this._getImageSource(this.image);if(!e)return null;var r=t-2*this.padding,n=v.calculateDimension(this.image.width,r),o=v.calculateDimension(this.image.height,r),i=v.calculatePosition(this.image.x,n,r)+this.padding,a=v.calculatePosition(this.image.y,o,r)+this.padding,u="number"==typeof this.image.border?this.image.border:null;return this.imageConfig={source:e,border:u,x:i,y:a,width:n,height:o},this.imageConfig}},{key:"getData",value:function(){if(this.qrCodeData)return this.qrCodeData;var t=m(w(e.prototype),"getData",this).call(this);if(!t)return t;var r=this._getImageConfig();if(r&&r.width&&r.height&&"number"==typeof r.border)for(var n=Math.max(r.x-r.border,0),o=Math.max(r.y-r.border,0),i=Math.min(n+r.width+2*r.border,t.length),a=Math.min(o+r.height+2*r.border,t.length),u=o;u<a;u+=1)for(var l=n;l<i;l+=1)t[u][l]=!!this.invert;return t}}])&&b(r.prototype,n),o&&b(r,o),e}();function E(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var k=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,r,n;return e=t,n=[{key:"load",value:function(t){return new Promise(function(e,r){var n=new Image;n.onload=function(){return e(n)},n.onerror=function(){return r(n)},n.src=t})}}],(r=null)&&E(e.prototype,r),n&&E(e,n),t}();function S(t){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function j(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function L(t,e,r){return(L="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=T(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(r):o.value}})(t,e,r||t)}function T(t){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function B(t,e){return(B=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function A(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function x(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var M={fgColor:"#000",bgColor:"#FFF",scale:10,size:null},I=function(t){function e(t){var r,n,o,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),n=this,r=!(o=T(e).call(this,t,i))||"object"!==S(o)&&"function"!=typeof o?A(n):o,x(A(A(r)),"fgColor",void 0),x(A(A(r)),"bgColor",void 0),x(A(A(r)),"scale",void 0),x(A(A(r)),"size",void 0),x(A(A(r)),"canvas",void 0),x(A(A(r)),"canvasContext",void 0);var a=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){x(t,e,r[e])})}return t}({},M,i);return r.fgColor=a.fgColor,r.bgColor=a.bgColor,r.scale=a.scale,r.size=a.size,r.canvas=document.createElement("canvas"),r.canvasContext=r.canvas.getContext("2d"),r.toDataURL=r.toDataUrl,r}var r,n,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&B(t,e)}(e,D),r=e,(n=[{key:"_clearCache",value:function(){L(T(e.prototype),"_clearCache",this).call(this),this.canvas.width=0}},{key:"_getCanvasSize",value:function(){var t=this.getDataSize();return t?this.size?this.size:this.scale?this.scale*t:t:null}},{key:"_draw",value:function(){var t=this.getDataSize();if(!t)return null;var e=this.getData();if(!e)return null;var r=i.convertHexColorToBytes(this.fgColor),n=i.convertHexColorToBytes(this.bgColor),o=0,a=new Uint8ClampedArray(4*Math.pow(t,2));e.forEach(function(t){t.forEach(function(t){t?a.set(r,o):a.set(n,o),o+=4})});var u=new ImageData(a,t,t);this.canvas.width=t,this.canvas.height=t,this.canvasContext.putImageData(u,0,0);var l=this._getCanvasSize(),c=document.createElement("canvas");c.width=l,c.height=l;var s=c.getContext("2d");s.imageSmoothingEnabled=!1,s.drawImage(this.canvas,0,0,l,l);var f=this._drawImage(s,l/t);return f instanceof Promise?f.then(function(){return c}):c}},{key:"_getImageSource",value:function(t){var e=this,r=t.source;return"string"==typeof r?k.load(r).then(function(r){return e.image.source=r,t.source=r,r}):r instanceof Image?r:r instanceof HTMLCanvasElement?r:null}},{key:"_drawImage",value:function(t,e){var r=this._getImageConfig();return r?r.source instanceof Promise?r.source.then(function(n){t.drawImage(n,r.x*e,r.y*e,r.width*e,r.height*e)}):(t.drawImage(r.source,r.x*e,r.y*e,r.width*e,r.height*e),!0):null}},{key:"getCanvas",value:function(){return this._draw()}},{key:"toDataUrl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"image/png",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.92,r=this._draw();return r?r instanceof Promise?r.then(function(r){return r.toDataURL(t,e)}):r.toDataURL(t,e):null}}])&&j(r.prototype,n),o&&j(r,o),e}();function R(t){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function N(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function q(t,e,r){return(q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=H(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(r):o.value}})(t,e,r||t)}function H(t){return(H=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function U(t,e){return(U=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function G(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function z(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var F={fgColor:"#000",bgColor:"#FFF"},K=function(t){function e(t){var r,n,o,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),n=this,r=!(o=H(e).call(this,t,i))||"object"!==R(o)&&"function"!=typeof o?G(n):o,z(G(G(r)),"fgColor",void 0),z(G(G(r)),"bgColor",void 0),z(G(G(r)),"qrCodeSVG",null),z(G(G(r)),"qrCodeDataUrl",null);var a=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){z(t,e,r[e])})}return t}({},F,i);return r.fgColor=a.fgColor,r.bgColor=a.bgColor,r.toDataURL=r.toDataUrl,r}var r,n,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&U(t,e)}(e,D),r=e,(n=[{key:"_clearCache",value:function(){q(H(e.prototype),"_clearCache",this).call(this),this.qrCodeSVG=null,this.qrCodeDataUrl=null}},{key:"_getDataInt",value:function(){var t=this.getData();return t?t.map(function(t){return t.map(function(t){return t?1:0})}):null}},{key:"_getRects",value:function(){var t=this._getDataInt();if(!t)return null;for(var e=[],r=t.length-1,n=0;n<=r;n+=1)for(var o=-1,i=0;i<=r;i+=1){var a=1===t[n][i];if(a&&-1===o&&(o=i),-1!==o&&(i===r||!a)){var u=i-(a?0:1),l=this._processRect(t,o,u,n);l&&e.push(l),o=-1}}return e}},{key:"_processRect",value:function(t,e,r,n){for(var o=t.length-1,i=!1,a=!1,u=0,l=n;l<=o;l+=1){for(var c=e;c<=r;c+=1){if(0===t[l][c]){a=!0;break}}if(a)break;for(var s=e;s<=r;s+=1)1===t[l][s]&&(i=!0,t[l][s]=2);u+=1}return i?{x:e,y:n,width:r-e+1,height:u}:null}},{key:"_getRelativeRects",value:function(){var t=this._getRects();if(!t)return null;var e=[],r={},n=0;return t.forEach(function(t){var e="".concat(t.width,":").concat(t.height);r[e]?(r[e].count+=1,r[e].id||(r[e].id="i".concat(n.toString(32)),n+=1)):r[e]={count:1,rect:t,relative:!1,id:null}}),t.forEach(function(t){var n="".concat(t.width,":").concat(t.height),o=r[n];o.relative?e.push({id:o.id,x:t.x-o.rect.x,y:t.y-o.rect.y}):(o.id&&(t.id=o.id,o.relative=!0),e.push(t))}),e}},{key:"_buildSVG",value:function(t){var e=this,r=this.getDataSize(),n=['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" '+'shape-rendering="crispEdges" viewBox="0 0 '.concat(r," ").concat(r,'">')];this.bgColor&&n.push('<rect x="0" y="0" height="'.concat(r,'" width="').concat(r,'" fill="').concat(this.bgColor,'"/>')),t.forEach(function(t){if(t.width&&t.height){var r=t.id?'id="'.concat(t.id,'" '):"";n.push("<rect ".concat(r,'x="').concat(t.x,'" y="').concat(t.y,'" height="').concat(t.height,'" width="').concat(t.width,'" fill="').concat(e.fgColor,'"/>'))}else n.push('<use xlink:href="#'.concat(t.id,'" x="').concat(t.x,'" y="').concat(t.y,'"/>'))});var o=this._getImageConfig();return o&&o.width&&o.height&&n.push('<image xlink:href="'.concat(o.source,'" x="').concat(o.x,'" y="').concat(o.y,'" width="').concat(o.width,'" height="').concat(o.height,'"/>')),n.push("</svg>"),n.join("")}},{key:"toString",value:function(){if(!this.qrCodeSVG){if(!this.getDataSize())return null;var t=this._getRects();if(!t)return null;this.qrCodeSVG=this._buildSVG(t)}return this.qrCodeSVG}},{key:"toDataUrl",value:function(){if(!this.qrCodeDataUrl){if(!this.getDataSize())return null;var t=this._getRelativeRects();if(!t)return null;var e=this._buildSVG(t);this.qrCodeDataUrl="data:image/svg+xml;base64,".concat(btoa(e))}return this.qrCodeDataUrl}}])&&N(r.prototype,n),o&&N(r,o),e}();function V(t){return(V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function Q(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function X(t,e,r){return(X="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=Y(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(r):o.value}})(t,e,r||t)}function Y(t){return(Y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function J(t,e){return(J=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function $(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function W(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var Z={blackSymbol:"▓▓",whiteSymbol:"  "},tt=function(t){function e(t){var r,n,o,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),n=this,r=!(o=Y(e).call(this,t,i))||"object"!==V(o)&&"function"!=typeof o?$(n):o,W($($(r)),"blackSymbol",void 0),W($($(r)),"whiteSymbol",void 0),W($($(r)),"qrCodeText",null);var a=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){W(t,e,r[e])})}return t}({},Z,i);return r.blackSymbol=a.blackSymbol,r.whiteSymbol=a.whiteSymbol,r}var r,n,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&J(t,e)}(e,p),r=e,(n=[{key:"_clearCache",value:function(){X(Y(e.prototype),"_clearCache",this).call(this),this.qrCodeText=null}},{key:"toString",value:function(){if(this.qrCodeText)return this.qrCodeText;var t=this.getDataSize();if(!t)return null;for(var e=this.getData(),r=[],n=0;n<t;n+=1){for(var o=0;o<t;o+=1){var i=e[n][o];r.push(i?this.blackSymbol:this.whiteSymbol)}r.push("\n")}return this.qrCodeText=r.join(""),this.qrCodeText}}])&&Q(r.prototype,n),o&&Q(r,o),e}();r.d(e,"QRCodeCanvas",function(){return I}),r.d(e,"QRCodeRaw",function(){return p}),r.d(e,"QRCodeSVG",function(){return K}),r.d(e,"QRCodeText",function(){return tt}),r.d(e,"AbstractQRCodeWithImage",function(){return D})}]);