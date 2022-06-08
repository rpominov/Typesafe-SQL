// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("rescript-jest/lib/js/Jest.bs.js");
var Curry = require("rescript/lib/js/curry.js");
var $$Promise = require("@rpominov/rescript-promise/lib/js/Promise.bs.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Loggable$TypesafeSqlErrors = require("@typesafe-sql/rescript-errors/lib/js/src/Loggable.bs.js");
var Client$TypesafeSqlDescribeQuery = require("../src/Client.bs.js");

function $$then(promise, fn) {
  return promise.then(Curry.__1(fn));
}

var client = {
  contents: undefined
};

beforeAll(function () {
      var promise = Client$TypesafeSqlDescribeQuery.make(undefined, undefined, undefined);
      return promise.then(function (result) {
                  if (result.TAG === /* Ok */0) {
                    client.contents = Caml_option.some(result._0);
                    return $$Promise.resolve(undefined);
                  }
                  console.error(Loggable$TypesafeSqlErrors.toString(result._0));
                  return $$Promise.reject($$Promise.makeJsError("Could not create a client"));
                });
    });

afterAll(function () {
      return Client$TypesafeSqlDescribeQuery.terminate(Jest.getExn(client.contents, "File \"Queries.test.res\", line 24, characters 26-33"));
    });

Jest.eachAsync([
      "SELECT 1",
      "SELECT 1;",
      "SELECT 1 -- comment",
      "SELECT oid FROM pg_type",
      "SELECT oid FROM pg_type WHERE pg_type = $1"
    ], "Describe: %s", (function (query) {
        expect.assertions(1);
        var promise = Client$TypesafeSqlDescribeQuery.describe(Jest.getExn(client.contents, "File \"Queries.test.res\", line 39, characters 13-20"), query);
        return promise.then(function (description) {
                    expect(description).toMatchSnapshot();
                    return Promise.resolve(undefined);
                  });
      }));

test("tableColumn", (function () {
        expect.assertions(1);
        var promise = Client$TypesafeSqlDescribeQuery.describe(Jest.getExn(client.contents, "File \"Queries.test.res\", line 51, characters 11-18"), "SELECT oid FROM pg_type");
        return promise.then(function (description) {
                    expect(Jest.getExn(Jest.arrGetExn(Jest.getExn(Jest.getOkExn(description, "File \"Queries.test.res\", line 54, characters 28-35").row, "File \"Queries.test.res\", line 54, characters 50-57"), 0, "File \"Queries.test.res\", line 54, characters 73-80").tableColumn, "File \"Queries.test.res\", line 55, characters 13-20")).toEqual({
                          attrelid: 1247,
                          attnum: 1,
                          relname: "pg_type",
                          attname: "oid",
                          atttypid: 26,
                          attndims: 0,
                          atttypmod: -1,
                          attnotnull: true,
                          attcollation: 0,
                          attoptions: undefined,
                          attfdwoptions: undefined
                        });
                    return Promise.resolve(undefined);
                  });
      }));

test("queue", (function () {
        expect.assertions(3);
        var client$1 = Jest.getExn(client.contents, "File \"Queries.test.res\", line 77, characters 39-46");
        var a = Client$TypesafeSqlDescribeQuery.describe(client$1, "SELECT 1 a");
        var b = Client$TypesafeSqlDescribeQuery.describe(client$1, "SELECT 1 b");
        var c = Client$TypesafeSqlDescribeQuery.describe(client$1, "SELECT 1 c");
        var promise = Promise.all([
              a,
              b,
              c
            ]);
        return promise.then(function (param) {
                    expect(Jest.arrGetExn(Jest.getExn(Jest.getOkExn(param[0], "File \"Queries.test.res\", line 84, characters 25-32").row, "File \"Queries.test.res\", line 84, characters 47-54"), 0, "File \"Queries.test.res\", line 84, characters 70-77").name).toEqual("a");
                    expect(Jest.arrGetExn(Jest.getExn(Jest.getOkExn(param[1], "File \"Queries.test.res\", line 85, characters 25-32").row, "File \"Queries.test.res\", line 85, characters 47-54"), 0, "File \"Queries.test.res\", line 85, characters 70-77").name).toEqual("b");
                    expect(Jest.arrGetExn(Jest.getExn(Jest.getOkExn(param[2], "File \"Queries.test.res\", line 86, characters 25-32").row, "File \"Queries.test.res\", line 86, characters 47-54"), 0, "File \"Queries.test.res\", line 86, characters 70-77").name).toEqual("c");
                    return Promise.resolve(undefined);
                  });
      }));

test("complicated types", (function () {
        expect.assertions(1);
        var promise = Client$TypesafeSqlDescribeQuery.describe(Jest.getExn(client.contents, "File \"Queries.test.res\", line 95, characters 11-18"), "SELECT typacl FROM pg_type");
        return promise.then(function (description) {
                    expect(Jest.getExn(Jest.getOkExn(description, "File \"Queries.test.res\", line 98, characters 27-34").row, "File \"Queries.test.res\", line 99, characters 13-20").map(function (x) {
                                return x.dataType;
                              })).toMatchSnapshot();
                    return Promise.resolve(undefined);
                  });
      }));

var Loggable;

exports.Loggable = Loggable;
exports.$$then = $$then;
exports.client = client;
/*  Not a pure module */
