if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>c(e,n),d={module:{uri:n},exports:t,require:r};s[n]=Promise.all(a.map((e=>d[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/build-manifest.json",revision:"57b7844213ccf6a769d1e7848f660bb9"},{url:"/_next/react-loadable-manifest.json",revision:"ee2e9d15d75d9495be55a0d6f862a6d4"},{url:"/_next/server/middleware-build-manifest.js",revision:"fa59ef1c56c11ee6494456a55e0b7258"},{url:"/_next/server/middleware-react-loadable-manifest.js",revision:"f71f854b3c37f36ef94599710e8b0d5a"},{url:"/_next/static/-O0epuiSVKPmfCw5ovhtL/_buildManifest.js",revision:"a58fe76775d65fa45b3fdd07cea3e0b6"},{url:"/_next/static/-O0epuiSVKPmfCw5ovhtL/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/141.b39fc4c319557dd7.js",revision:"b39fc4c319557dd7"},{url:"/_next/static/chunks/15.d2ad530661464d1d.js",revision:"d2ad530661464d1d"},{url:"/_next/static/chunks/317.f51812ce4e1626c5.js",revision:"f51812ce4e1626c5"},{url:"/_next/static/chunks/408.ed06ca2d476e9465.js",revision:"ed06ca2d476e9465"},{url:"/_next/static/chunks/48d448c8.2b0bf06bd7131f84.js",revision:"2b0bf06bd7131f84"},{url:"/_next/static/chunks/518.0003e06dfe98c575.js",revision:"0003e06dfe98c575"},{url:"/_next/static/chunks/527-f74f4f4bf907d153.js",revision:"f74f4f4bf907d153"},{url:"/_next/static/chunks/628.937f60478353d953.js",revision:"937f60478353d953"},{url:"/_next/static/chunks/761.e79f4daad6a766bc.js",revision:"e79f4daad6a766bc"},{url:"/_next/static/chunks/78.eb5e3cca59cee57c.js",revision:"eb5e3cca59cee57c"},{url:"/_next/static/chunks/88.96c67c4ccd784f58.js",revision:"96c67c4ccd784f58"},{url:"/_next/static/chunks/fec483df-4b2283de4a9f896a.js",revision:"4b2283de4a9f896a"},{url:"/_next/static/chunks/framework-114634acb84f8baa.js",revision:"114634acb84f8baa"},{url:"/_next/static/chunks/main-3f3ef1ea3322193e.js",revision:"3f3ef1ea3322193e"},{url:"/_next/static/chunks/pages/404-0bb60b66bf92258f.js",revision:"0bb60b66bf92258f"},{url:"/_next/static/chunks/pages/_app-1f22f441f9ef31d1.js",revision:"1f22f441f9ef31d1"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/discover-64ae1916e464b4e5.js",revision:"64ae1916e464b4e5"},{url:"/_next/static/chunks/pages/home-b0f1a6e45e465180.js",revision:"b0f1a6e45e465180"},{url:"/_next/static/chunks/pages/index-cdc8280fe5361377.js",revision:"cdc8280fe5361377"},{url:"/_next/static/chunks/pages/notAllowed-5eb46eb6ef9fdfc9.js",revision:"5eb46eb6ef9fdfc9"},{url:"/_next/static/chunks/pages/settings/account-691a293473e9f3b8.js",revision:"691a293473e9f3b8"},{url:"/_next/static/chunks/pages/settings/squad/%5Bid%5D-4f8bd4d38eb93d19.js",revision:"4f8bd4d38eb93d19"},{url:"/_next/static/chunks/pages/u/%5Bid%5D-9dc49495cfeba80b.js",revision:"9dc49495cfeba80b"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-134b58924bc122d0.js",revision:"134b58924bc122d0"},{url:"/_next/static/css/03be2fdca30e811a.css",revision:"03be2fdca30e811a"},{url:"/_next/static/css/2b44cb494216da2f.css",revision:"2b44cb494216da2f"},{url:"/_next/static/css/3d2d3ab8a90d507d.css",revision:"3d2d3ab8a90d507d"},{url:"/_next/static/css/4005f4b8ff720642.css",revision:"4005f4b8ff720642"},{url:"/_next/static/css/4cf62f43bd1f8493.css",revision:"4cf62f43bd1f8493"},{url:"/_next/static/css/70053533117695b3.css",revision:"70053533117695b3"},{url:"/_next/static/css/88a42b93b45ceec6.css",revision:"88a42b93b45ceec6"},{url:"/_next/static/css/99f95b45c3fee972.css",revision:"99f95b45c3fee972"},{url:"/_next/static/css/a1936e3b273df2cb.css",revision:"a1936e3b273df2cb"},{url:"/_next/static/css/b062fa44c3699947.css",revision:"b062fa44c3699947"},{url:"/_next/static/css/d3af3f37167536c6.css",revision:"d3af3f37167536c6"},{url:"/_next/static/css/f4ed46ea1a58b9fd.css",revision:"f4ed46ea1a58b9fd"},{url:"/_next/static/css/fdc36626dc39f72f.css",revision:"fdc36626dc39f72f"},{url:"/assets/fonts/AtkinsonHyperlegible/atkinson-hyperlegible-v10-latin-regular.woff",revision:"6a60253770d142d396ee7b36b4fea380"},{url:"/assets/fonts/AtkinsonHyperlegible/atkinson-hyperlegible-v10-latin-regular.woff2",revision:"d329c75ac853b7f32cafc5bca78e9d9e"},{url:"/assets/fonts/BebasNeue/bebas-neue-v9-latin-regular.woff",revision:"b5aa36c88ff7b24a095891c69b2e1068"},{url:"/assets/fonts/BebasNeue/bebas-neue-v9-latin-regular.woff2",revision:"ee8b62d0a7c20d589e293d284eb9f2cf"},{url:"/assets/icons/favicon.ico",revision:"74820dfd7ec7970f33ea1f172bc5d9a3"},{url:"/assets/images/logo.png",revision:"3280c3f8773c10a59d741d9b52a90f49"},{url:"/assets/svgs/add.svg",revision:"57543c6c158d3b76e3d7be28194bc246"},{url:"/assets/svgs/check.svg",revision:"f0ed244b81bf9e6e55d810f2dc7ea36b"},{url:"/assets/svgs/clogs.svg",revision:"772b05cc5b45226a759bbfce5403b639"},{url:"/assets/svgs/coin.svg",revision:"60dbe53c2e831a2db9b741c368b7a708"},{url:"/assets/svgs/deso.svg",revision:"609dcef448957d6050ddd6cd2c0c753a"},{url:"/assets/svgs/device.svg",revision:"7e71060ec2b8cd76971c4f25c63beae7"},{url:"/assets/svgs/emoji.svg",revision:"005740c7b5e2e680a587bf05f1edf45a"},{url:"/assets/svgs/google.svg",revision:"79b0a8c81f636bf50bc8a1dd3bc500cc"},{url:"/assets/svgs/image.svg",revision:"3e801b4d6c23978050be30b6d06c1b55"},{url:"/assets/svgs/key.svg",revision:"e0607fad8a997198b7c5e7b64ccec123"},{url:"/assets/svgs/laptop.svg",revision:"651358000b0d5d36ed3f905c0874ae91"},{url:"/assets/svgs/lock.svg",revision:"b7ac817f7fd4b1d519ed05a97286ce94"},{url:"/assets/svgs/logout.svg",revision:"ac8b25efb56b10fba76dd091848efe86"},{url:"/assets/svgs/metamask.svg",revision:"e61db15193a03d6d13e6b2eca42754c3"},{url:"/assets/svgs/microsoft.svg",revision:"b25d6703c75ed2323f4a84b812d3fd98"},{url:"/assets/svgs/phantom.svg",revision:"67c486a2d27d074b427cc061872beee4"},{url:"/assets/svgs/send.svg",revision:"5064a57fe3d54d2ba70d846f2a797cc8"},{url:"/assets/svgs/settings.svg",revision:"0000e4aa7ebbcede74749561b518c7c5"},{url:"/assets/svgs/solana.svg",revision:"3ea621032cc151297c9d5630e965b009"},{url:"/assets/svgs/triangle-down.svg",revision:"f19f9db96c7f5dfccb550c5d5ce56c6c"},{url:"/assets/svgs/twitter.svg",revision:"45319dc76c3f14fb10dbdb2a93be10ad"},{url:"/assets/svgs/upload.svg",revision:"017800fb4482a5482a0eb026a649eb4f"},{url:"/assets/svgs/vector.svg",revision:"ee76d145b2cc87563e8f166053645a79"},{url:"/icon-192x192.png",revision:"d2d83932b85115d52fdbb2122bd5da62"},{url:"/icon-256x256.png",revision:"f77b641e165277c2772fee73162aa3d8"},{url:"/icon-384x384.png",revision:"e7e7bd8814b2d0da27d0bdab52dfbd74"},{url:"/icon-512x512.png",revision:"c9ab1bc0eae47e6b3970ec8e3dc74db8"},{url:"/manifest.json",revision:"4f7cef060640693eb7cbdbcd92497b73"},{url:"/robots.txt",revision:"bbb4ca7b5b5528cfe0dbb4ac7e1d227c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
