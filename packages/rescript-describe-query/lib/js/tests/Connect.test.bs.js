// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_exn = require("rescript/lib/js/js_exn.js");
var Js_dict = require("rescript/lib/js/js_dict.js");
var Process = require("process");
var Belt_Int = require("rescript/lib/js/belt_Int.js");
var Belt_Result = require("rescript/lib/js/belt_Result.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Client$DescribeQuery = require("../Client.bs.js");

function $$then(promise, fn) {
  return promise.then(Curry.__1(fn));
}

function getExn(opt, loc) {
  if (opt !== undefined) {
    return Caml_option.valFromOption(opt);
  } else {
    return Js_exn.raiseError("Unexpected None at: " + loc);
  }
}

var env = Process.env;

var pgUser = getExn(Js_dict.get(env, "PGUSER"), "File \"Connect.test.res\", line 12, characters 48-55");

var pgPassword = getExn(Js_dict.get(env, "PGPASSWORD"), "File \"Connect.test.res\", line 13, characters 56-63");

var pgDatabase = getExn(Js_dict.get(env, "PGDATABASE"), "File \"Connect.test.res\", line 14, characters 56-63");

var pgHost = getExn(Js_dict.get(env, "PGHOST"), "File \"Connect.test.res\", line 15, characters 48-55");

var pgPort = getExn(Belt_Int.fromString(getExn(Js_dict.get(env, "PGPORT"), "File \"Connect.test.res\", line 16, characters 48-55")), "File \"Connect.test.res\", line 16, characters 86-93");

test("No config", (function () {
        var promise = Client$DescribeQuery.make(undefined, undefined);
        return promise.then(function (result) {
                    return Client$DescribeQuery.terminate(Belt_Result.getExn(result));
                  });
      }));

test("With config", (function () {
        var promise = Client$DescribeQuery.make({
              user: pgUser,
              password: pgPassword,
              host: pgHost,
              database: pgDatabase,
              port: pgPort
            }, undefined);
        return promise.then(function (result) {
                    return Client$DescribeQuery.terminate(Belt_Result.getExn(result));
                  });
      }));

exports.$$then = $$then;
exports.getExn = getExn;
exports.env = env;
exports.pgUser = pgUser;
exports.pgPassword = pgPassword;
exports.pgDatabase = pgDatabase;
exports.pgHost = pgHost;
exports.pgPort = pgPort;
/* env Not a pure module */
