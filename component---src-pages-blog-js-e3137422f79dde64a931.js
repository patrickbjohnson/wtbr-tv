(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{vx99:function(e,t,n){"use strict";n.r(t);n("E5k/");var r=n("XEEL"),i=n.n(r),o=(n("q8oJ"),n("8npG"),n("9eSz")),a=n.n(o),s=n("IujW"),c=n.n(s),f=n("q1tI"),u=n.n(f),d=n("5uLJ"),l=n("TSYQ"),p=n.n(l),h=n("D1b+"),m=n.n(h),v=function(e){var t,n,r,i,o=e.article.node;return u.a.createElement("div",{className:"article-wrap"},u.a.createElement("article",{className:p()(m.a.article),id:o.slug},u.a.createElement("div",{className:m.a.meta},u.a.createElement("h2",{className:m.a.title},o.title),u.a.createElement("small",null,(t=o.publishDate,n=new Date(t),r=n.getDate(),((i=n.getMonth())>=10?i:"0"+i)+"."+(r>=10?r:"0"+r)+"."+n.getFullYear().toString().substr(-2)))),o.video&&u.a.createElement(d.a,Object.assign({},o.video,{isCurrent:!0})),!o.video&&o.image&&u.a.createElement(a.a,{className:m.a.image,alt:o.title,fluid:o.image.fluid}),u.a.createElement("div",{className:m.a.content},u.a.createElement(c.a,{className:m.a.body,source:o.body.body,escapeHtml:!1}))))},g=n("wXmw"),w=n("Bl7J"),x=n("IaKx"),R=n("egVy"),b=n.n(R),y=(n("OeI1"),n("AqHK"),n("YbXK"),n("cFtU"),n("MIFh"),n("LagC"),n("pS08"),n("R48M"),n("sC2a"),n("YBKJ"),n("JHok"),n("C9fy"),n("17x9")),E=function(e,t){var n=void 0;return function(){var r=this,i=arguments,o=function(){return e.apply(r,i)};clearTimeout(n),n=setTimeout(o,t)}},O=function(){var e=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()};function N(e){var t=0;return e.forEach(function(e){e.rect.height>t&&(t=e.rect.height)}),t}function k(e){var t=e.mode,n=e.from,r=e.direction,i=e.rect,o=e.width,a=n||0;switch(t){case"await":switch(r){case"toRight":return o;case"toLeft":default:return-i.width}case"smooth":switch(r){case"toRight":return i.width>o?0:o-i.width;case"toLeft":default:return i.width>o?o-i.width:0}case"chain":default:switch(r){case"toRight":return 0;case"toLeft":default:return i.width+a>o?o-i.width:o-i.left-i.width}}}var T=function(e){var t=e.mode,n=e.index,r=e.rect,i=e.offset,o=e.width,a=e.direction,s=function(e){var t=e.index,n=e.rect,r=e.offset,i=e.width,o=e.direction;if(0===t)return r;if("number"==typeof r)return function(e){var t=e.rect,n=e.offset;switch(e.direction){case"toRight":return n-t.width;case"toLeft":default:return n}}({rect:n,offset:r,direction:o});switch(o){case"toRight":return-n.width;case"toLeft":default:return i}}({index:n,rect:r,offset:i,width:o,direction:a});return{from:s,to:function(e){var t=e.rect,n=e.width;switch(e.direction){case"toRight":return n;case"toLeft":default:return-t.width}}({rect:r,width:o,direction:a}),next:k({mode:t,from:s,direction:a,rect:r,width:o})}};function L(e){var t=e.from,n=e.rect;switch(e.direction){case"toRight":return t;case"toLeft":default:return t+n.width}}var j=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},_=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),q=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},S=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},M=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},C=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)},F=function(e){function t(){var e,n,r;j(this,t);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=M(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),r.state={children:r.props.children({index:r.props.index}),move:r.props.move,position:{from:void 0,to:void 0,next:void 0},offset:r.props.offset,rect:null},r.x=0,r.isMoving=!1,r.nextTriggered=!1,r.elementRef=u.a.createRef(),r.componentDidMount=function(){r.setPosition(!0),r.observer=new MutationObserver(r.onMutation),r.observer.observe(r.elementRef.current,{characterData:!0,childList:!0,subtree:!0})},r.componentWillUnmount=function(){r.observer.disconnect()},r.onMutation=function(){r.setPosition()},r.componentDidUpdate=function(e,t){r.x||t.position.from===r.state.position.from||(r.x=r.state.position.from,r.elementRef.current.style.transform="translate3d("+r.x+"px, 0, 0)"),r.x!==r.state.position.from&&e.prevRect&&r.props.prevRect&&e.prevRect.width!==r.props.prevRect.width&&(r.props.offset?r.x=r.x+(r.props.offset-e.offset):r.x=r.x+(r.props.prevRect.width-e.prevRect.width),r.elementRef.current.style.transform="translate3d("+r.x+"px, 0, 0)"),r.props.move&&!e.start&&r.props.start&&r.animate(),r.props.start&&!e.move&&r.props.move&&r.animate(),e.move&&!r.props.move&&(r.isMoving=!1)},r.setPosition=function(e){var t=r.props,n=t.mode,i=t.width,o=t.id,a=t.onNext,s=t.direction,c=t.index,f=t.setRect,u=r.elementRef.current.getBoundingClientRect();if(0!==u.width){var d=0===r.props.index?function(e){var t=e.offset,n=e.rect,r=e.direction,i=e.width;if("run-in"===t)switch(r){case"toRight":return-n.width;case"toLeft":default:return i}if("string"==typeof t){var o=Number(t.replace("%",""));if(o)return i/100*o}return t}({offset:r.props.offset,rect:u,direction:s,width:i}):r.props.offset,l=T({mode:n,rect:u,index:c,offset:d,width:i,direction:s});if(f({index:r.props.index,rect:u,offset:d,nextOffset:L({from:l.from,rect:u,direction:s})}),e){var p=function(e){var t=e.rect,n=e.mode,r=(e.prevOffset,e.position),i=e.direction,o=e.width;if("chain"!==n)return!1;switch(i){case"toRight":return r.from>0;case"toLeft":default:return t.width+r.from<=o}}({mode:n,rect:u,position:l,offset:d,direction:s,width:i});p&&a({id:o,index:c,rect:u,nextOffset:L({from:l.from,rect:u,direction:s})}),p||!d&&0!==c||a({id:o,index:c,rect:u}),r.nextTriggered=p}r.setState({rect:u,offset:d,position:l})}},r.shouldTriggerNext=function(){return!r.nextTriggered&&("toLeft"===r.props.direction?r.x<=r.state.position.next:r.x>=r.state.position.next)},r.triggerNext=function(){r.shouldTriggerNext()&&(r.nextTriggered=!0,r.props.onNext({id:r.props.id,index:r.props.index,rect:r.state.rect}))},r.shouldFinish=function(){switch(r.props.direction){case"toRight":return r.x>=r.state.position.to;case"toLeft":default:return r.x<=r.state.position.to}},r.animate=function(){if(!r.isMoving){r.isMoving=!0;var e=null;window.requestAnimationFrame(function t(n){if(r.isMoving&&r.elementRef.current){var i=e?n-e:0;r.x="toLeft"===r.props.direction?r.x-i/100*r.props.speed:r.x+i/100*r.props.speed,r.elementRef.current.style.transform="translate3d("+r.x+"px, 0, 0)",r.triggerNext(),r.shouldFinish()?(r.isMoving=!1,e=null,r.props.onFinish(r.props.id)):(e=n,window.requestAnimationFrame(t))}})}},r.render=function(){return u.a.createElement("div",{className:"ticker__element",style:{willChange:"transform",position:"absolute",left:0,top:0,transform:"translate3d("+r.x+"px, 0, 0)"},ref:r.elementRef},r.state.children)},M(r,n)}return S(t,e),t}(u.a.Component);F.propTypes={children:Object(y.oneOfType)([y.node,y.func]).isRequired,direction:y.string.isRequired,speed:y.number.isRequired,id:y.string.isRequired,index:y.number.isRequired,mode:y.string.isRequired,move:y.bool.isRequired,onNext:y.func.isRequired,onFinish:y.func.isRequired,setRect:y.func.isRequired,start:y.bool.isRequired,offset:Object(y.oneOfType)([y.number,y.string]),prevRect:y.object,width:y.number},F.defaultProps={offset:void 0,width:void 0,prevRect:null};var P=function(e,t){return{elements:[{id:O(),index:0,height:0,start:!1,offset:e,rect:null,prevRect:null}],width:t,height:0}},A=function(e){function t(){var e,n,r;j(this,t);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=M(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),r.next=null,r.state=P(r.props.offset),r.tickerRef=u.a.createRef(),r.dOnResize=E(function(){return r.onResize()},150),r.componentDidMount=function(){r.setState({width:r.tickerRef.current.offsetWidth,height:r.props.height}),window.addEventListener("resize",r.dOnResize)},r.componentWillUnmount=function(){window.removeEventListener("resize",r.dOnResize)},r.setRect=function(e){var t=e.index,n=e.rect,i=(e.offset,e.nextOffset);r.setState(function(e){var o=e.elements.map(function(e){var r=e;return e.index===t&&(r.rect=n),e.index===t+1&&(r.prevRect=n,r.offset&&(r.offset=i)),r});return{elements:o,height:r.props.height?e.height:N(o)}})},r.onResize=function(){r.tickerRef.current&&r.tickerRef.current.offsetWidth!==r.state.width&&r.setState(q({},P(r.props.offset,r.tickerRef.current.offsetWidth),{height:r.props.height}))},r.onFinish=function(e){r.setState(function(t){return{elements:t.elements.filter(function(t){return t.id!==e})}})},r.onNext=function(e){e.id;var t=e.index,n=e.rect,i=e.nextOffset;r.setState(function(e){return{elements:[].concat(C(e.elements.map(function(e){var r=e;return e.index===t&&(r.rect=n),(0===e.index||e.offset||r.index===t+1)&&(r.start=!0),r})),[{id:O(),index:e.elements[e.elements.length-1].index+1,height:0,start:!1,offset:i,rect:null,prevRect:n}])}})},M(r,n)}return S(t,e),_(t,[{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:"ticker",ref:this.tickerRef,style:{position:"relative",overflow:"hidden",height:this.state.height&&this.state.height+"px"}},this.state.width&&this.state.elements.map(function(t){return u.a.createElement(F,{key:t.id,id:t.id,index:t.index,start:t.start,offset:t.offset,prevRect:t.prevRect,direction:e.props.direction,mode:e.props.mode,move:e.props.move,speed:e.props.speed,onFinish:e.onFinish,onNext:e.onNext,setRect:e.setRect,width:e.state.width},e.props.children)}))}}]),t}(u.a.Component);A.propTypes={children:Object(y.oneOfType)([y.node,y.func]).isRequired,direction:y.string,mode:y.string,move:y.bool,offset:Object(y.oneOfType)([y.number,y.string]),speed:y.number,height:Object(y.oneOfType)([y.number,y.string])},A.defaultProps={offset:0,speed:5,direction:"toLeft",mode:"chain",move:!0,height:void 0};var H=A,z=function(e){var t=e.textString;return u.a.createElement("div",{className:b.a.ticker},u.a.createElement(H,null,function(e){e.index;return u.a.createElement(u.a.Fragment,null,t&&u.a.createElement("span",{className:b.a.item},t))}))},D=n("mwIZ"),J=n.n(D),I=n("hKLK"),K=n.n(I);n.d(t,"pageQuery",function(){return U});var W=function(e){var t=e.clickHandler;return u.a.createElement("button",{className:K.a.scroll,onClick:function(){return t()}},u.a.createElement("span",null,"Top"))},B=function(e){function t(t){var n;return(n=e.call(this,t)||this).clickToScrollHandler=function(){"undefined"!=typeof window&&window.scrollTo(0,0)},n}return i()(t,e),t.prototype.render=function(){var e=J()(this,"props.data.allContentfulBlogPost.edges"),t=J()(this,"props.data.contentfulPage.components"),n=!!t&&t.filter(function(e){return"ContentfulVideoHero"===e.__typename}),r=!!t&&t.filter(function(e){return"ContentfulTicker"===e.__typename});return u.a.createElement(u.a.Fragment,null,u.a.createElement(w.a,null,u.a.createElement(x.a,{data:this.props.data.contentfulPage}),n.length>0&&u.a.createElement(g.a,Object.assign({classNames:K.a.blogHero},n[0])),u.a.createElement("div",{className:p()(K.a.wrapper,{"has-padding-top":0===n.length})},r.length>0&&n&&u.a.createElement(z,{textString:r[0].text}),u.a.createElement("div",{className:p()("wrapper")},u.a.createElement("ul",{className:"article-list"},e.map(function(e,t){return u.a.createElement(v,{key:e.node.id,article:e})}))))),u.a.createElement(W,{clickHandler:this.clickToScrollHandler}))},t}(u.a.Component),U=(t.default=B,"333934932")}}]);
//# sourceMappingURL=component---src-pages-blog-js-e3137422f79dde64a931.js.map