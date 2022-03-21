// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Js_exn = require("rescript/lib/js/js_exn.js");
var Caml_option = require("rescript/lib/js/caml_option.js");

function each(data, title, f) {
  return test.each(data)(title, f);
}

function each2(data, title, f) {
  return test.each(data)(title, f);
}

function each3(data, title, f) {
  return test.each(data)(title, f);
}

function eachAsync(data, title, f) {
  return test.each(data)(title, f);
}

function each2Async(data, title, f) {
  return test.each(data)(title, f);
}

function each3Async(data, title, f) {
  return test.each(data)(title, f);
}

function getExn(opt, loc) {
  if (opt !== undefined) {
    return Caml_option.valFromOption(opt);
  } else {
    return Js_exn.raiseError("Unexpected None at: " + loc);
  }
}

function getOkExn(res, loc) {
  if (res.TAG === /* Ok */0) {
    return res._0;
  }
  console.error(res._0);
  return Js_exn.raiseError("Unexpected Error(_) at: " + loc);
}

function arrGetExn(arr, i, loc) {
  if (i >= 0 && i < arr.length) {
    return arr[i];
  } else {
    return Js_exn.raiseError("Invalid array index " + i + " at: " + loc);
  }
}

exports.each = each;
exports.each2 = each2;
exports.each3 = each3;
exports.eachAsync = eachAsync;
exports.each2Async = each2Async;
exports.each3Async = each3Async;
exports.getExn = getExn;
exports.getOkExn = getOkExn;
exports.arrGetExn = arrGetExn;
/* No side effect */
