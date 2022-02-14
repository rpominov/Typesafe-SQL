// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_exn = require("rescript/lib/js/js_exn.js");
var Caml_exceptions = require("rescript/lib/js/caml_exceptions.js");

var isError = ((x) => x instanceof Error);

function message(e) {
  if (!isError(e)) {
    return e;
  }
  var m = e.message;
  if (m !== undefined && m !== "") {
    return m;
  } else {
    return e.stack;
  }
}

function stack(e) {
  if (isError(e)) {
    return e.stack;
  } else {
    return e;
  }
}

function exnToLoggable(e) {
  if (e.RE_EXN_ID === Js_exn.$$Error) {
    return message(e._1);
  } else {
    return e;
  }
}

function exnToLoggableVerbose(e) {
  if (e.RE_EXN_ID === Js_exn.$$Error) {
    return e._1;
  } else {
    return e;
  }
}

function make(e, fn) {
  return {
          originalExn: e,
          msg: Curry._1(fn, e)
        };
}

function fromNodeCbError(e) {
  return {
          originalExn: Js_exn.anyToExnInternal(e),
          msg: [message(e)]
        };
}

function fromThrownByUserProvidedFn(e) {
  return {
          originalExn: e,
          msg: [exnToLoggableVerbose(e)]
        };
}

var Placeholder = /* @__PURE__ */Caml_exceptions.create("LogError-TypesafeSqlBuilder.Placeholder");

function fromString(str) {
  return {
          originalExn: {
            RE_EXN_ID: Placeholder
          },
          msg: [str]
        };
}

exports.isError = isError;
exports.message = message;
exports.stack = stack;
exports.exnToLoggable = exnToLoggable;
exports.exnToLoggableVerbose = exnToLoggableVerbose;
exports.make = make;
exports.fromNodeCbError = fromNodeCbError;
exports.fromThrownByUserProvidedFn = fromThrownByUserProvidedFn;
exports.Placeholder = Placeholder;
exports.fromString = fromString;
/* No side effect */
