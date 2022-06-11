// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("rescript-jest/lib/js/Jest.bs.js");
var Curry = require("rescript/lib/js/curry.js");
var Parser$TypesafeSqlExtendedSQL = require("../src/Parser.bs.js");

var ind0 = "";

var ind1 = "  ";

function incInd(ind) {
  return ind + ind1;
}

function showStr(x) {
  return JSON.stringify(x);
}

function showAll(arr, showItem, ind) {
  return "\n" + (ind + ind1) + arr.map(Curry.__1(showItem)).join("\n" + (ind + ind1)) + "\n";
}

function showLocation(param) {
  return param.start.toString() + "-" + param.end.toString();
}

function showFuzzyLocation(param) {
  var end = param.end;
  var start = param.start;
  if (end !== null) {
    return start.toString() + "-" + end.toString();
  } else {
    return start.toString();
  }
}

function showAst(ast, ind) {
  var showNode = function (node) {
    var variant = node.NAME;
    if (variant === "InlineComment") {
      return "InlineComment(" + JSON.stringify(node.VAL) + ")";
    }
    if (variant === "Parameter") {
      return "Parameter(" + JSON.stringify(node.VAL.name) + ")";
    }
    if (variant === "SqlChunk") {
      return "SqlChunk(" + JSON.stringify(node.VAL) + ")";
    }
    if (variant === "BlockComment") {
      return "BlockComment(" + JSON.stringify(node.VAL) + ")";
    }
    if (variant === "RawParameter") {
      var match = node.VAL;
      return "RawParameter(" + JSON.stringify(match.name) + " [" + showAll(match.options, showStr, ind + ind1) + (ind + ind1) + "])";
    }
    var match$1 = node.VAL;
    return "BatchParameter(" + JSON.stringify(match$1.name) + " " + JSON.stringify(match$1.separator) + " " + showAst(match$1.body, ind + ind1) + ")";
  };
  var showLocatedNode = function (obj) {
    return showNode(obj.node) + " at " + showLocation(obj);
  };
  return "[" + showAll(ast, showLocatedNode, ind) + ind + "]";
}

function showParsedStatement(param, ind) {
  return "(" + Jest.getExn(JSON.stringify(param.attributes), "File \"Parser.test.res\", line 42, characters 47-54") + " " + showAst(param.ast, ind) + ")";
}

function showErr(obj) {
  return "Error(" + JSON.stringify(obj.message) + " at " + showFuzzyLocation(obj) + ")";
}

var expectToMatchSnapshot = Jest.makeSnapshotMatcher(function (result) {
      if (result.TAG === /* Ok */0) {
        return "Ok" + showParsedStatement(result._0, ind0);
      } else {
        return showErr(result._0);
      }
    });

var expectToMatchSnapshotFile = Jest.makeSnapshotMatcher(function (result) {
      if (result.TAG !== /* Ok */0) {
        return showErr(result._0);
      }
      var match = result._0;
      return "Ok(" + JSON.stringify(match.separator) + " [" + showAll(match.statements, (function (__x) {
                    return showParsedStatement(__x, ind1);
                  }), ind0) + "])";
    });

Jest.each([
      "SELECT 1",
      "-- test\nSELECT -- test2\n--\n 1-- test3",
      "/* test \n abc*/\nSELECT /* test2 /* test3 */ */ 1/**/",
      "SELECT 1/* test",
      "SELECT 1/* test /* test2 ",
      "/*@name: test*/SELECT 1",
      "/*\n * @name: test\n */SELECT 1",
      "/*@name: testA4_\n@name: test1*/SELECT 1",
      "/*@name: %abc*/SELECT 1",
      "/*@name: 4abc*/SELECT 1",
      "/*@name: */SELECT 1",
      "/*abc @name: abc*/SELECT 1",
      "-- abc\n/* @name: abc*/SELECT 1",
      "SELECT 1/* @name: abc*/",
      "SELECT :foo = :bar",
      "SELECT :foo = :foo",
      "SELECT ':'",
      "SELECT '\\:'",
      "SELECT :num:raw<1|2>",
      "SELECT :num:raw<>",
      "SELECT '\\:num\\:raw<1|2>'",
      "SELECT :num:raw<1,|> 2",
      "SELECT :num:raw<<<1<|>|||2>>>",
      "SELECT :num:raw<<<1|||2>>",
      "INSERT INTO test (foo, bar) VALUES :values:batch<(:foo, :bar)>",
      "INSERT INTO test (foo, bar) VALUES :values:batch<(:foo, :foo)>",
      "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:batch<:bar>)>>",
      "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:raw<foo|bar>)>>",
      "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo, :bar)>",
      "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo /* <comment> */)>>"
    ], "parse(\"%s\")", (function (code) {
        return expectToMatchSnapshot(Parser$TypesafeSqlExtendedSQL.parse(code));
      }));

Jest.each([
      "SELECT 1;SELECT 2;",
      "-- @separator:### \nSELECT 1###SELECT 2"
    ], "parseFile(\"%s\")", (function (code) {
        return expectToMatchSnapshotFile(Parser$TypesafeSqlExtendedSQL.parseFile(code));
      }));

exports.ind0 = ind0;
exports.ind1 = ind1;
exports.incInd = incInd;
exports.showStr = showStr;
exports.showAll = showAll;
exports.showLocation = showLocation;
exports.showFuzzyLocation = showFuzzyLocation;
exports.showAst = showAst;
exports.showParsedStatement = showParsedStatement;
exports.showErr = showErr;
exports.expectToMatchSnapshot = expectToMatchSnapshot;
exports.expectToMatchSnapshotFile = expectToMatchSnapshotFile;
/* expectToMatchSnapshot Not a pure module */
