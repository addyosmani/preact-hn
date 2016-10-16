/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["public/build/vendor.js","d98a331d55fe40cf10d700294c557168"],["public/build/vendor.js.map","eb08187346adbe610cfdc84814aa85d4"],["public/css/style.css","e74e55d84f51b1d0e36bf1a4dec21772"],["public/img/android-chrome-144x144.png","31f44c8f8845e41196b389f2fdae392d"],["public/img/android-chrome-192x192.png","7c3470aa18f85e4454a35ef3ff8b8f6e"],["public/img/android-chrome-36x36.png","fc5a14316848badbd501e198f8607088"],["public/img/android-chrome-48x48.png","f8576bca4be18a4367e4847a09fc6945"],["public/img/android-chrome-72x72.png","6b26a8a135b07174d298489cc010083a"],["public/img/android-chrome-96x96.png","04cda150a70eb58221af3fdd4f7d4a6f"],["public/img/apple-touch-icon-114x114.png","e18affb685f0457672283a88c04084c9"],["public/img/apple-touch-icon-120x120.png","cd14469c7457cfc6d3aaf15d34faeddf"],["public/img/apple-touch-icon-144x144.png","95a8cb7d006c59252dd68ba73d31632a"],["public/img/apple-touch-icon-152x152.png","15dd03590ff7289c09cf10027597e699"],["public/img/apple-touch-icon-180x180.png","0b101591e8e263c6bff9133c7772194a"],["public/img/apple-touch-icon-57x57.png","628a477075d84a8d0996392aa6dec37c"],["public/img/apple-touch-icon-60x60.png","6b9fe001bc9e35320f9bb4eb28b1e6f1"],["public/img/apple-touch-icon-72x72.png","5830f2a4f9249b3bc3998481cc00825d"],["public/img/apple-touch-icon-76x76.png","812e9eb119b6bdd8f465a2d1118465b9"],["public/img/apple-touch-icon-precomposed.png","e45a9a06a4a9b850e3089c4e6e3ebc8d"],["public/img/apple-touch-icon.png","0b101591e8e263c6bff9133c7772194a"],["public/img/browserconfig.xml","f337354b6f80663075e7b32058c65149"],["public/img/favicon-16x16.png","9d784dc3f4da5477156423f5f106c1c6"],["public/img/favicon-32x32.png","21ea2cf9cd43cdc1f808cca76a1f6fa4"],["public/img/favicon-96x96.png","11e36fff4c95b572ffaeef9a848da568"],["public/img/favicon.ico","eaa33e22fc5dab05262d316b59160a45"],["public/img/logo.png","930a492dadf1ccb881bd91d424c8bf9e"],["public/img/mstile-144x144.png","3e9a3c273f9ac3b7a158132445534860"],["public/img/mstile-150x150.png","b0af3ec429e6828dc0606d8bb8e1421f"],["public/img/mstile-310x150.png","499b08d0d170e6ed89491d7e9691a8e8"],["public/img/mstile-310x310.png","625111493ee72a39db1420c9c235dfb3"],["public/img/mstile-70x70.png","4cdf64d2b55d8116c4ce8dd361a95772"],["public/img/safari-pinned-tab.svg","9bfe87bb482c5d6facab0d0084ce1e80"],["public/img/splashscreen-icon-384x384.png","e3080842f30a9137e1464f01ffb97e71"],["public/index-static.html","894331a8b8a9845d2cce2fac1d265466"],["public/manifest.json","88a82e030fa45aee1ea68a4f0a3811bb"],["public/runtime-caching.js","87003e567d298b1b58cf2f57b4fb0ee2"],["public/sw-toolbox.js","1ca0f60210ecd50f5b6b80ebc325e7c3"]];
var cacheName = 'sw-precache-v2-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







importScripts("sw-toolbox.js","runtime-caching.js");

