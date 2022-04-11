// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("rescript-jest/lib/js/Jest.bs.js");
var Curry = require("rescript/lib/js/curry.js");
var $$Promise = require("@rpominov/rescript-promise/lib/js/Promise.bs.js");
var LogError = require("@typesafe-sql/rescript-common/lib/js/src/LogError.bs.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Client$DescribeQuery = require("../Client.bs.js");

function $$then(promise, fn) {
  return promise.then(Curry.__1(fn));
}

var client = {
  contents: undefined
};

beforeAll(function () {
      var promise = Client$DescribeQuery.make(undefined, undefined, undefined);
      return promise.then(function (result) {
                  if (result.TAG === /* Ok */0) {
                    client.contents = Caml_option.some(result._0);
                    return $$Promise.resolve(undefined);
                  }
                  LogError.log(result._0);
                  return $$Promise.reject($$Promise.makeJsError("Could not create a client"));
                });
    });

afterAll(function () {
      return Client$DescribeQuery.terminate(Jest.getExn(client.contents, "File \"Queries.test.res\", line 23, characters 26-33"));
    });

Jest.eachAsync([
      "SELECT 1",
      "SELECT 1;",
      "SELECT 1 -- comment",
      "SELECT oid FROM pg_type",
      "SELECT oid FROM pg_type WHERE pg_type = $1"
    ], "Describe: %s", (function (query) {
        expect.assertions(1);
        var promise = Client$DescribeQuery.describe(Jest.getExn(client.contents, "File \"Queries.test.res\", line 38, characters 13-20"), query);
        return promise.then(function (description) {
                    expect(description).toMatchSnapshot();
                    return Promise.resolve(undefined);
                  });
      }));

test("tableColumn", (function () {
        expect.assertions(1);
        var promise = Client$DescribeQuery.describe(Jest.getExn(client.contents, "File \"Queries.test.res\", line 50, characters 11-18"), "SELECT oid FROM pg_type");
        return promise.then(function (description) {
                    expect(Jest.getExn(Jest.arrGetExn(Jest.getExn(description.row, "File \"Queries.test.res\", line 53, characters 29-36"), 0, "File \"Queries.test.res\", line 53, characters 52-59").tableColumn, "File \"Queries.test.res\", line 54, characters 13-20")).toEqual({
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
        var client$1 = Jest.getExn(client.contents, "File \"Queries.test.res\", line 76, characters 39-46");
        var a = Client$DescribeQuery.describe(client$1, "SELECT 1 a");
        var b = Client$DescribeQuery.describe(client$1, "SELECT 1 b");
        var c = Client$DescribeQuery.describe(client$1, "SELECT 1 c");
        var promise = Promise.all([
              a,
              b,
              c
            ]);
        return promise.then(function (param) {
                    expect(Jest.arrGetExn(Jest.getExn(param[0].row, "File \"Queries.test.res\", line 83, characters 26-33"), 0, "File \"Queries.test.res\", line 83, characters 49-56").name).toEqual("a");
                    expect(Jest.arrGetExn(Jest.getExn(param[1].row, "File \"Queries.test.res\", line 84, characters 26-33"), 0, "File \"Queries.test.res\", line 84, characters 49-56").name).toEqual("b");
                    expect(Jest.arrGetExn(Jest.getExn(param[2].row, "File \"Queries.test.res\", line 85, characters 26-33"), 0, "File \"Queries.test.res\", line 85, characters 49-56").name).toEqual("c");
                    return Promise.resolve(undefined);
                  });
      }));

exports.$$then = $$then;
exports.client = client;
/*  Not a pure module */
