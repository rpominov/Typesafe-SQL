// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Process = require("process");
var Promise$TypesafeSqlBuilder = require("./Promise.bs.js");

function progress(promise) {
  return Promise$TypesafeSqlBuilder.chain(promise, (function (x) {
                if (x.TAG === /* Ok */0) {
                  Process.stdout.write(".");
                }
                return Promise$TypesafeSqlBuilder.resolve(x);
              }));
}

exports.progress = progress;
/* process Not a pure module */
