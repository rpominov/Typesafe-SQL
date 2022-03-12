// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Pg = require("../Pg.bs.js");
var Pg$1 = require("pg");
var Curry = require("rescript/lib/js/curry.js");
var Caml_option = require("rescript/lib/js/caml_option.js");

function $$then(promise, fn) {
  return promise.then(Curry.__1(fn));
}

test("No config", (function () {
        var client = Pg.Client.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
        var promise = client.connect();
        return promise.then(function (param) {
                    return client.end();
                  });
      }));

test("With config", (function () {
        var client = Pg.Client.make("testuser", "testpassword", "localhost", "testdatabase", 5432, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
        var promise = client.connect();
        return promise.then(function (param) {
                    return client.end();
                  });
      }));

test("Extra options", (function () {
        var client = Pg.Client.make("testuser", "testpassword", "localhost", "testdatabase", 5432, undefined, 1000, 1000, "Test", 1000, 1000, undefined, undefined, undefined);
        var promise = client.connect();
        return promise.then(function (param) {
                    return client.end();
                  });
      }));

test("Async password", (function () {
        var makePass1 = function (pass, param) {
          return Promise.resolve(pass);
        };
        var makePass2 = function (pass, param) {
          return Promise.resolve(pass);
        };
        var makePass = Math.random() > 0.5 ? makePass1 : makePass2;
        var client = Pg.Client.make("testuser", Caml_option.some(Curry._1(makePass, "testpassword")), "localhost", "testdatabase", 5432, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
        var promise = client.connect();
        return promise.then(function (param) {
                    return client.end();
                  });
      }));

test("Callbacks", (function (done) {
        expect.assertions(2);
        var client = Pg.Client.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
        return Pg.Client.connectCb(client, (function (res1) {
                      return Pg.Client.endCb(client, (function (res2) {
                                    expect(res1).toEqual({
                                          TAG: /* Ok */0,
                                          _0: undefined
                                        });
                                    expect(res2).toEqual({
                                          TAG: /* Ok */0,
                                          _0: undefined
                                        });
                                    return done();
                                  }));
                    }));
      }));

test("Custom type parser", (function () {
        expect.assertions(1);
        var typesParser = Pg.TypesParser.make(Caml_option.some(Pg$1.types), undefined);
        typesParser.setTypeParser(23, (function (str) {
                return "Custom: " + str;
              }));
        var client = Pg.Client.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(typesParser), undefined);
        var promise = client.connect();
        var promise$1 = promise.then(function (param) {
              return Pg.query(client, undefined, "SELECT 42 num, TRUE bool");
            });
        return promise$1.then(function (result) {
                    var promise = client.end();
                    return promise.then(function (param) {
                                expect(result.rows).toEqual([{
                                        num: "Custom: 42",
                                        bool: true
                                      }]);
                                return Promise.resolve(undefined);
                              });
                  });
      }));

exports.$$then = $$then;
/*  Not a pure module */
