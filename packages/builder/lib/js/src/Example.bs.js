// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Caml_splice_call = require("rescript/lib/js/caml_splice_call.js");
var Steps$TypesafeSqlBuilder = require("./Steps.bs.js");
var Promise$TypesafeSqlBuilder = require("./Promise.bs.js");
var LogError$TypesafeSqlBuilder = require("./LogError.bs.js");
var DescribeQuery = require("@typesafe-sql/describe-query");

function main(client) {
  return Promise$TypesafeSqlBuilder.chain(Promise$TypesafeSqlBuilder.chainOk(Promise$TypesafeSqlBuilder.chainOk(Promise$TypesafeSqlBuilder.chainOk(Steps$TypesafeSqlBuilder.Read.read("./src/example.sql"), (function (content) {
                            var msg = Steps$TypesafeSqlBuilder.Parse.parse(content);
                            var tmp;
                            tmp = msg.TAG === /* Ok */0 ? ({
                                  TAG: /* Ok */0,
                                  _0: msg._0
                                }) : ({
                                  TAG: /* Error */1,
                                  _0: LogError$TypesafeSqlBuilder.fromString(msg._0)
                                });
                            return Promise$TypesafeSqlBuilder.resolve(tmp);
                          })), (function (parsed) {
                        return Promise$TypesafeSqlBuilder.chainOk(Steps$TypesafeSqlBuilder.Describe.describeMany(client, parsed.map(function (x) {
                                            return x.processedStatement;
                                          })), (function (described) {
                                      return Steps$TypesafeSqlBuilder.Generate.generate(parsed, described, Steps$TypesafeSqlBuilder.Generate.exampleGenerator);
                                    }));
                      })), (function (generated) {
                    return Steps$TypesafeSqlBuilder.Write.write("./src/example.json", generated);
                  })), (function (result) {
                if (result.TAG !== /* Ok */0) {
                  Caml_splice_call.spliceApply(console.error, [result._0.msg]);
                }
                return Promise$TypesafeSqlBuilder.resolve(undefined);
              }));
}

Promise$TypesafeSqlBuilder.done(DescribeQuery.createClient({
          user: "testuser",
          password: "testpassword",
          host: "localhost",
          database: "testdatabase"
        }), (function (client) {
        return Promise$TypesafeSqlBuilder.done(main(client), (function (param) {
                      client.terminate();
                      
                    }));
      }));

var DescribeQuery$1;

exports.DescribeQuery = DescribeQuery$1;
exports.main = main;
/*  Not a pure module */
