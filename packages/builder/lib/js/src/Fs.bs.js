// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Chokidar = require("rescript-chokidar/lib/js/Chokidar.bs.js");

console.log("1");

var watcher = Chokidar.watchMany(undefined, [
      "**/*.res",
      "!**/Map.res"
    ]);

watcher.on("all", (function (a, b, c) {
        
      }));

setTimeout((function (param) {
        console.log(watcher.getWatched());
        
      }), 1000);

exports.watcher = watcher;
/*  Not a pure module */
