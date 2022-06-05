// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var $$Promise = require("@rpominov/rescript-promise/lib/js/Promise.bs.js");
var Process = require("process");
var TTY$PgCLI = require("./TTY.bs.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Loggable$Errors = require("@typesafe-sql/rescript-errors/lib/js/Loggable.bs.js");

function exitWithLoggableError(showUsageOpt, err) {
  var showUsage = showUsageOpt !== undefined ? Caml_option.valFromOption(showUsageOpt) : undefined;
  TTY$PgCLI.error("ERROR!");
  TTY$PgCLI.printLoggable(err);
  if (showUsage !== undefined) {
    console.error("");
    console.error(TTY$PgCLI.Chalk.dim(Caml_option.valFromOption(showUsage)));
  }
  return Process.exit(1);
}

function exitWithError(showUsage, err) {
  return exitWithLoggableError(showUsage, Loggable$Errors.fromText(err));
}

function getOrExitWithError(option, message) {
  if (option !== undefined) {
    return Caml_option.valFromOption(option);
  } else {
    return exitWithLoggableError(undefined, Loggable$Errors.fromText(message));
  }
}

function getOkOrExitWithError(prepend, result) {
  if (result.TAG === /* Ok */0) {
    return result._0;
  }
  var error = result._0;
  return exitWithLoggableError(undefined, prepend !== undefined ? Loggable$Errors.prepend(error, prepend) : error);
}

function catchAndExitWithError(prepend, promise) {
  return $$Promise.map($$Promise.$$catch(promise, Loggable$Errors.fromExn), (function (param) {
                return getOkOrExitWithError(prepend, param);
              }));
}

exports.exitWithLoggableError = exitWithLoggableError;
exports.exitWithError = exitWithError;
exports.getOrExitWithError = getOrExitWithError;
exports.getOkOrExitWithError = getOkOrExitWithError;
exports.catchAndExitWithError = catchAndExitWithError;
/* Promise Not a pure module */
