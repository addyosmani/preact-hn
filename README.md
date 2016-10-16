# [preact-hn](https://preact-hn.appspot.com)

A Preact port of [ReactHN](https://react-hn.appspot.com) - a [React](http://facebook.github.io/react) &
[react-router](https://github.com/rackt/react-router)-powered implementation of
[Hacker News](https://news.ycombinator.com) using its
[Firebase API](https://github.com/HackerNews/API).

This is mostly made possible thanks to `nwb --preact`. We need both
Preact and preact-compat to get this all working. [WebPageTest](https://www.webpagetest.org/video/compare.php?tests=161016_VD_CR0,161016_61_CR1) comparison of the React and Preact versions.

[![react-hn screenshot](https://github.com/insin/react-hn/raw/master/screenshot.png "New comment highlighting in react-hn")](https://react-hn.appspot.com)

Live version: https://preact-hn.appspot.com

Build differences:

React: 

```
✔ Building React app

File sizes after gzip:

  dist/vendor.511483ef.js              114.19 KB
  dist/app.8b44e34e.js                 9.69 KB
  dist/sw-toolbox.js                   5.84 KB
  dist/css/style.css                   1.8 KB
  dist/PermalinkedComment.7106819e.js  1.56 KB
  dist/UserProfile.60e03f1c.js         618 B
  dist/core.js                         590 B
  dist/runtime-caching.js              511 B
  dist/NotFound.c4c69d8e.js            214 B
  dist/build/vendor.js                 186 B
  dist/service-worker.js               131 B
```

Preact:

```
✔ Building Preact app

File sizes after gzip:

  dist/vendor.4833966e.js              79.34 KB
  dist/app.8b44e34e.js                 9.68 KB
  dist/sw-toolbox.js                   5.84 KB
  dist/service-worker.js               4.24 KB
  dist/css/style.css                   1.8 KB
  dist/PermalinkedComment.7106819e.js  1.56 KB
  dist/UserProfile.60e03f1c.js         618 B
  dist/core.js                         590 B
  dist/runtime-caching.js              511 B
  dist/NotFound.c4c69d8e.js            214 B
  dist/build/vendor.js                 186 B
```

## Features

* Supports display of all item types:
  [stories](https://preact-hn.appspot.com/#/story/8863),
  [jobs](https://preact-hn.appspot.com/#/job/8426937),
  [polls](https://preact-hn.appspot.com/#/poll/126809) and
  [comments](https://preact-hn.appspot.com/#/comment/8054455)
* Basic [user profiles](https://preact-hn.appspot.com/#/user/patio11)
* Collapsible comment threads, with child counts
* "Realtime" updates (free via Firebase!)
* Last visit details for stories are cached in `localStorage`
* New comments are highlighted:
  * Comments since your last visit to an item
  * New comments which load while you're reading an item
  * New comments in collapsed threads
* Automatic or manual collapsing of comment threads which don't contain any new
  comments
* Stories with new comments are marked on list pages
* Stories can be marked as read to remove highighting from new comments
* "comments" sections driven by the Changed Items API
* Story listing pages are cached in `sessionStorage` for quick back button usage
  and pagination in the same session
* Configurable settings:
  * auto collapse - automatically collapse comment threads without new comments
    on page load
  * show reply links - show "reply" links to Hacker News
  * show dead - show items flagged as dead
  * show deleted - show comments flagged as deleted in threads
* Delayed comment detection - so tense! Who will it be? What will they say?

[Feature requests are welcome!](https://github.com/addyosmani/preact-hn/issues/new)

## Building

Install dependencies:

```
npm install
```

### npm scripts

* `npm start` - start development server
* `npm run build` - build into the `public/` directory
* `npm run lint` - lint `src/`
* `npm run lint:fix` - lint `src/` and auto-fix issues where possible
* `npm run precache` - generates Service Worker in `public/` directory

## MIT Licensed
