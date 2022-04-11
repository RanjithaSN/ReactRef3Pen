import { ChunkExtractor } from '@loadable/server';
import AppConfig from 'AppConfig';
import i18next from 'i18next';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { setI18n } from 'react-i18next';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import 'regenerator-runtime/runtime';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import theme from 'ui/theme/theme';
import { color } from 'ui/theme/theme.helpers';
import { distClient } from '../../webpack/paths';
import RootContainer from '../components/app/app.contextual';
import { initTranslations } from '../i18n';
import createStore from '../redux/store.server';
import { getAppIcons, getDefaultFavIcon } from './helpers/icon-helpers';
import { getManifestUrl } from './helpers/manifest-helpers';
import createPreloadLinks from './helpers/preload-domain-helpers';
import createPreloadRequestLinks from './helpers/preload-request-helpers';

const appConfig = JSON.stringify(AppConfig).replace(/</g, '\\u003c');

const statsFile = path.resolve(distClient, 'stats.json');

const getCommonHeaders = (extractor) => {
  const appIcons = getAppIcons(extractor.stats);
  const defaultFavIcon = getDefaultFavIcon(extractor.stats);
  const manifestUrl = getManifestUrl(extractor.stats);

  return [
    '<!doctype html>',
    '<html lang="se">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="application-name" content="Penny" />',
    '<meta name="mobile-web-app-capable" content="yes" />',
    '<meta name="apple-mobile-web-app-capable" content="yes" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />',
    '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
    `<meta name="theme-color" content="${color('accentSecondary')}">`,
    `<link rel="manifest" href="${manifestUrl}" crossorigin="use-credentials">`,
    ...createPreloadLinks(),
    ...createPreloadRequestLinks(extractor.stats),
    defaultFavIcon ? `<link rel="shortcut icon" type="image/png" href="${defaultFavIcon}" />` : '',
    appIcons
  ].join('');
};

const App = ({ helmetContext, context, url, store }) => {

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider context={helmetContext}>
        <Provider store={store}>
          <StaticRouter location={url} context={context}>
            <RootContainer />
          </StaticRouter>
        </Provider>
      </HelmetProvider>
    </ThemeProvider>
  );
};

const renderHtmlMarkup = (rootComp, store, helmetContext, i18nData) => {
  const originalState = store.getState();

  // This is the modified state from the server.
  // We modify it because there are some state values that we don't want to set from the server side.
  const modifiedState = {
    ...originalState,
    client: {
      ...originalState.client,
      // Clean the threeDS because we don't want the default values in store set on server side
      threeDS: {}
    }
  };
  const initialData = JSON.stringify({
    state: modifiedState
  }).replace(/</g, '\\u003c');
  const i18nDataJson = JSON.stringify(i18nData).replace(/</g, '\\u003c');
  const styleSheet = new ServerStyleSheet();
  try {
    const extractor = new ChunkExtractor({
      statsFile
    });
    const header = getCommonHeaders(extractor);
    const appMarkup = renderToString(styleSheet.collectStyles(extractor.collectChunks(rootComp)));

    const { helmet } = helmetContext;

    const scriptTags = extractor.getScriptTags(); // or extractor.getScriptElements();
    const linkTags = extractor.getLinkTags(); // or extractor.getLinkElements();
    const styleTags = extractor.getStyleTags(); // or extractor.getStyleElements();

    const html = [
      header,
      helmet.base.toString(),
      helmet.title.toString(),
      helmet.meta.toString(),
      helmet.link.toString(),
      helmet.script.toString(),
      styleTags,
      linkTags,
      `
            <script async src="https://www.googleoptimize.com/optimize.js?id=GTM-53L7NKZ"></script>
            <script type="text/javascript">
                /*! modernizr 3.6.0 (Custom Build) | MIT *
                 * https://modernizr.com/download/?-webp-setclasses !*/
                !function(e,n,A){function o(e,n){return typeof e===n}function t(){var e,n,A,t,a,i,r;for(var l in s)if(s.hasOwnProperty(l)){if(e=[],n=s[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(A=0;A<n.options.aliases.length;A++)e.push(n.options.aliases[A].toLowerCase());for(t=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=t:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=t),f.push((t?"":"no-")+r.join("-"))}}function a(e){var n=u.className,A=Modernizr._config.classPrefix||"";if(c&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+A+"no-js(\\s|$)");n=n.replace(o,"$1"+A+"js$2")}Modernizr._config.enableClasses&&(n+=" "+A+e.join(" "+A),c?u.className.baseVal=n:u.className=n)}function i(e,n){if("object"==typeof e)for(var A in e)l(e,A)&&i(A,e[A]);else{e=e.toLowerCase();var o=e.split("."),t=Modernizr[o[0]];if(2==o.length&&(t=t[o[1]]),"undefined"!=typeof t)return Modernizr;n="function"==typeof n?n():n,1==o.length?Modernizr[o[0]]=n:(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=n),a([(n&&0!=n?"":"no-")+o.join("-")]),Modernizr._trigger(e,n)}return Modernizr}var s=[],r={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var A=this;setTimeout(function(){n(A[e])},0)},addTest:function(e,n,A){s.push({name:e,fn:n,options:A})},addAsyncTest:function(e){s.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=r,Modernizr=new Modernizr;var l,f=[],u=n.documentElement,c="svg"===u.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;l=o(e,"undefined")||o(e.call,"undefined")?function(e,n){return n in e&&o(e.constructor.prototype[n],"undefined")}:function(n,A){return e.call(n,A)}}(),r._l={},r.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},r._trigger=function(e,n){if(this._l[e]){var A=this._l[e];setTimeout(function(){var e,o;for(e=0;e<A.length;e++)(o=A[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){r.addTest=i}),Modernizr.addAsyncTest(function(){function e(e,n,A){function o(n){var o=n&&"load"===n.type?1==t.width:!1,a="webp"===e;i(e,a&&o?new Boolean(o):o),A&&A(n)}var t=new Image;t.onerror=o,t.onload=o,t.src=n}var n=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],A=n.shift();e(A.name,A.uri,function(A){if(A&&"load"===A.type)for(var o=0;o<n.length;o++)e(n[o].name,n[o].uri)})}),t(),a(f),delete r.addTest,delete r.addAsyncTest;for(var p=0;p<Modernizr._q.length;p++)Modernizr._q[p]();e.Modernizr=Modernizr}(window,document);
            </script>

            <!-- BEGIN Google Tag Manager -->
            <script> var dataLayer = dataLayer || []; </script>
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PT2BJD8');
            </script>
            <!-- END Google Tag Manager -->

            <!-- BEGIN Kitewheel Tracker-->
            <script type="text/javascript">
                var _kw = {};
            </script>
            `,
      '</head>',
      '<body>',
      `<div id="react-root">${appMarkup}</div>`,
      '<div id="overlay-root"></div>',
      `<script>window.__BROWSER_CONFIG__ = ${appConfig}</script>`,
      `<script>window.__INITIAL_DATA__ = ${initialData}</script>`,
      `<script>window.__I18N_DATA__ = ${i18nDataJson}</script>`,

      `
            <!-- begin usabilla live embed code -->
            <script type="text/javascript">
                /*{literal}<![CDATA[*/
                window.lightningjs||function(c){function g(b,d){d&&(d+=(/\\?/.test(d)?"&":"?")+"lv=1");c[b]||function(){var i=window,h=document,j=b,g=h.location.protocol,l="load",k=0;(function(){function b(){a.P(l);a.w=1;c[j]("_load")}c[j]=function(){function m(){m.id=e;return c[j].apply(m,arguments)}var b,e=++k;b=this&&this!=i?this.id||0:0;(a.s=a.s||[]).push([e,b,arguments]);m.then =function(b,c,h){var d=a.fh[e]=a.fh[e]||[],j=a.eh[e]=a.eh[e]||[],f=a.ph[e]=a.ph[e]||[];b&&d.push(b); c&&j.push(c);h&&f.push(h);return m};return m};var a=c[j]._={};a.fh={};a.eh={};a.ph={};a.l=d?d.replace(/^\\/\\//,(g=="https:"?g:"http:")+"//"):d;a.p={0:+new Date};a.P=function(b){a.p[b]=new Date- a.p[0]};a.w&&b();i.addEventListener?i.addEventListener(l,b,!1):i.attachEvent("on"+l,b);var q=function(){function b(){return["<head/><",c,' onload="var d=',n,";d.getElementsByTagName('head')[0].",d,"(d.",g,"('script')).",i,"='",a.l ,"'\\"></",c,">"].join("")}var c="body",e=h[c];if(!e)return setTimeout(q,100);a.P(1);var d="appendChild",g="createElement",i="src",k=h[g]("div"),l=k[d](h[g]("div")),f=h[g]("iframe"),n="document",p;k.style.display="none";e.insertBefore(k,e.firstChild).id=o+"-"+j;f.frameBorder="0";f.id=o+"-frame-"+j;/MSIE[]+6/.test(navigator.userAgent)&&(f[i]="javascript:false");f.allowTransparency="true";l[d](f);try{f.contentWindow[n].open()}catch(s){a.domain=h.domain,p="javascript:var d="+n+".open();d.domain='"+h.domain+"';",f[i]=p+"void(0);"}try{var r=f.contentWindow[n];r.write(b());r.close()}catch(t){f[i]=p+'d.write("'+b().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}a.P(2)};a.l&&setTimeout(q,0)})()}();c[b].lv="1";return c[b]}var o="lightningjs",k=window[o]=g(o);k.require=g;k.modules=c}({}); window.usabilla_live = lightningjs.require("usabilla_live", "//w.usabilla.com/b5cd9b352eef.js");
                //window.usabilla_live('hide');
                /*]]>{/literal}*/
            </script>
            <!-- end usabilla live embed code -->
            <!-- begin usabilla in page embed code -->
            <script type="text/javascript">
                window.usabilla||function(){var e,t=(e=window).document,n={},i=t.createElement("div"),a=!1;(e=e.usabilla=function(){(n.a=n.a||[]).push(arguments)})._=n,n.ids={},i.style.display="none",function(){if(!t.body)return setTimeout(arguments.callee,100);t.body.insertBefore(i,t.body.firstChild).id="usabilla",a=!0}(),e.load=function(e,o,d){if(!n.ids[o]){var r=n.ids={};r.url="//"+e+"/"+o+".js?s1",r.config=d,setTimeout(function(){if(!a)return setTimeout(arguments.callee,100);var e,n=t.createElement("iframe");n.id="usabilla-"+o,/MSIE[ ]+6/.test(navigator.userAgent)&&(n.src="javascript:false"),i.appendChild(n);try{n.contentWindow.document.open()}catch(l){r.domain=t.domain,e="javascript:var d=document.open();d.domain='"+r.domain+"';",n.src=e+"void(0);"}try{var c=n.contentWindow.document,l="body";c.write(["<!DOCTYPE html><html><head></head><",l," onload=\\"var d = document;d.getElementsByTagName('head')[0].appendChild(d.createElement('script')).src='",r.url,"'\\" ></",l,"/></html>"].join("")),c.close()}catch(t){n.src=e+'d.write("'+loaderHtml().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}n.contentWindow.config=d,n.contentWindow.SCRIPT_ID=o},0)}}}();
                // Call window.usabilla.load("w.usabilla.com", "233d8db23078") when component has loaded and rendered
            </script>`,
      `<!-- Google Tag Manager (noscript) -->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PT2BJD8"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

            <!-- RAYGUN script -->
            <script type="text/javascript">
              !function(a,b,c,d,e,f,g,h){a.RaygunObject=e,a[e]=a[e]||function(){
              (a[e].o=a[e].o||[]).push(arguments)},f=b.createElement(c),g=b.getElementsByTagName(c)[0],
              f.async=1,f.src=d,g.parentNode.insertBefore(f,g),h=a.onerror,a.onerror=function(b,c,d,f,g){
              h&&h(b,c,d,f,g),g||(g=new Error(b)),a[e].q=a[e].q||[],a[e].q.push({
              e:g})}}(window,document,"script","//cdn.raygun.io/raygun4js/raygun.min.js","rg4js");
            </script>
            <!-- END RAYGUN script-->
            `,
      scriptTags,
      '</body>',
      '</html>'
    ]
      .filter((h) => !!h)
      .join('');

    return html;
  } catch (e) {
    console.error(e);
    return '';
  }
};

export default () => async (req, res, next) => {
  const begin = process.hrtime.bigint();
  const handleError = (error) => {
    res.send({
      no: 'bueno',
      err: error
    });
  };
  try {
    // Initialize i18n somewhere here
    initTranslations('sv-se', () => {
      setI18n(i18next);
    });

    const { url } = req;
    const context = {};
    const helmetContext = {};
    const store = await createStore();

    const rootComp = <App
      store={store}
      url={url}
      context={context}
      helmetContext={helmetContext}
    />;

    renderToString(rootComp);

    store.getPromise()
      .then(() => {

        const html = renderHtmlMarkup(rootComp, store, helmetContext, i18next.store);
        const end = process.hrtime.bigint();
        res.set('Cache-control', 'public, max-age=0');
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=UTF-8',
          'X-Render-Time': `${end - begin} ns`
        });
        res.write(html);
        res.end();
      })
      .catch(handleError);

    store.close();

  } catch (e) {
    next(e);
  }
};
