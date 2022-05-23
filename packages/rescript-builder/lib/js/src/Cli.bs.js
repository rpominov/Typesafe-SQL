// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var Path = require("path");
var Curry = require("rescript/lib/js/curry.js");
var Process = require("process");
var Js_types = require("rescript/lib/js/js_types.js");
var Minimist = require("minimist");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Caml_exceptions = require("rescript/lib/js/caml_exceptions.js");
var Loggable$Errors = require("@typesafe-sql/rescript-errors/lib/js/Loggable.bs.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");

function getType(filename) {
  var obj = Fs.statSync(filename);
  if (obj.isFile()) {
    return "file";
  } else if (obj.isDirectory()) {
    return "directory";
  } else {
    return "other";
  }
}

function makeAbsolute(path) {
  if (Path.isAbsolute(path)) {
    return path;
  } else {
    return Path.join(Process.cwd(), path);
  }
}

var Validation_error = /* @__PURE__ */Caml_exceptions.create("Cli-Builder.Require.Validation_error");

function object_cast(val) {
  var x = Js_types.classify(val);
  if (typeof x === "number" || x.TAG !== /* JSObject */3) {
    return ;
  } else {
    return Caml_option.some(x._0);
  }
}

var object = {
  name: "object",
  cast: object_cast
};

function string_cast(val) {
  var x = Js_types.classify(val);
  if (typeof x === "number" || x.TAG !== /* JSString */1) {
    return ;
  } else {
    return x._0;
  }
}

var string = {
  name: "string",
  cast: string_cast
};

function bool_cast(val) {
  var match = Js_types.classify(val);
  if (typeof match === "number") {
    if (match !== 1) {
      if (match !== 0) {
        return ;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  
}

var bool = {
  name: "bool",
  cast: bool_cast
};

function function_cast(val) {
  var f = Js_types.classify(val);
  if (typeof f === "number" || f.TAG !== /* JSFunction */2) {
    return ;
  } else {
    return Caml_option.some(f._0);
  }
}

var $$function = {
  name: "function",
  cast: function_cast
};

function array_cast(val) {
  var arr = Js_types.classify(val);
  if (typeof arr === "number") {
    return ;
  }
  if (arr.TAG !== /* JSObject */3) {
    return ;
  }
  var arr$1 = arr._0;
  if (Array.isArray(arr$1)) {
    return arr$1;
  }
  
}

function arrayOf(validator) {
  return {
          name: "array<" + validator.name + ">",
          cast: (function (val) {
              var arr = array_cast(val);
              if (arr === undefined) {
                return ;
              }
              var acc = [];
              var _i = 0;
              while(true) {
                var i = _i;
                if (i >= arr.length) {
                  return acc;
                }
                var x = validator.cast(arr[i]);
                if (x === undefined) {
                  return ;
                }
                acc.push(Caml_option.valFromOption(x));
                _i = i + 1 | 0;
                continue ;
              };
            })
        };
}

function objectOf2(key1, validator1, key2, validator2) {
  return {
          name: "{" + key1 + ":" + validator1.name + "," + key2 + ":" + validator2.name + "}",
          cast: (function (val) {
              var obj = object_cast(val);
              if (obj === undefined) {
                return ;
              }
              var obj$1 = Caml_option.valFromOption(obj);
              var val1 = validator1.cast(obj$1[key1]);
              if (val1 === undefined) {
                return ;
              }
              var val2 = validator2.cast(obj$1[key2]);
              if (val2 !== undefined) {
                return [
                        Caml_option.valFromOption(val1),
                        Caml_option.valFromOption(val2)
                      ];
              }
              
            })
        };
}

function nullable(validator) {
  return {
          name: "nullable<" + validator.name + ">",
          cast: (function (val) {
              if (val == null) {
                return Caml_option.some(undefined);
              } else {
                return Caml_option.some(validator.cast(val));
              }
            })
        };
}

function either(validatorLeft, mapLeft, validatorRight, mapRight) {
  return {
          name: validatorLeft.name + "|" + validatorRight.name,
          cast: (function (val) {
              var x = validatorLeft.cast(val);
              if (x !== undefined) {
                return Caml_option.some(Curry._1(mapLeft, Caml_option.valFromOption(x)));
              }
              var x$1 = validatorRight.cast(val);
              if (x$1 !== undefined) {
                return Caml_option.some(Curry._1(mapRight, Caml_option.valFromOption(x$1)));
              }
              
            })
        };
}

function cast(val, validator, name) {
  var x = validator.cast(val);
  if (x !== undefined) {
    return Caml_option.valFromOption(x);
  }
  throw {
        RE_EXN_ID: Validation_error,
        _1: Loggable$Errors.prepend(Loggable$Errors.fromUnknown(val), name + " is not of type " + validator.name + ":"),
        Error: new Error()
      };
}

function property(obj, key, validator) {
  return cast(obj[key], validator, "Property \"" + key + "\"");
}

function get(r, k) {
  var $$float = Js_types.classify(r[k]);
  if (typeof $$float === "number") {
    switch ($$float) {
      case /* JSFalse */0 :
          return {
                  TAG: /* Bool */0,
                  _0: false
                };
      case /* JSTrue */1 :
          return {
                  TAG: /* Bool */0,
                  _0: true
                };
      case /* JSNull */2 :
      case /* JSUndefined */3 :
          return /* Unset */0;
      
    }
  } else {
    switch ($$float.TAG | 0) {
      case /* JSNumber */0 :
          return {
                  TAG: /* Float */2,
                  _0: $$float._0
                };
      case /* JSString */1 :
          return {
                  TAG: /* String */1,
                  _0: $$float._0
                };
      default:
        throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "Cli.res",
                269,
                11
              ],
              Error: new Error()
            };
    }
  }
}

function parse(paramsOpt, flags, aliases, stopEarly, separate, onUnknown, argv) {
  var params = paramsOpt !== undefined ? paramsOpt : [];
  return Minimist(argv, {
              string: ["_"].concat(params),
              boolean: flags,
              alias: aliases,
              stopEarly: stopEarly,
              "--": separate,
              unknown: onUnknown
            });
}

var x = Belt_Array.get(Process.argv, 2);

var match = x !== undefined ? (
    x.startsWith("-") ? [
        undefined,
        Process.argv.slice(2)
      ] : [
        x,
        Process.argv.slice(3)
      ]
  ) : [
    undefined,
    []
  ];

var command = match[0];

var UnknownArg = /* @__PURE__ */Caml_exceptions.create("Cli-Builder.UnknownArg");

var InvalidFlag = /* @__PURE__ */Caml_exceptions.create("Cli-Builder.InvalidFlag");

var parsedArgv;

try {
  var result = parse([
        "generator",
        "out",
        "config",
        "host",
        "port",
        "username",
        "password",
        "dbname",
        "connection"
      ], [
        "version",
        "debug",
        "help",
        "quiet"
      ], {
        version: "v",
        generator: "g",
        debug: "D",
        out: "o",
        quiet: "q",
        config: "c",
        host: "h",
        port: "p",
        username: "U",
        password: "W",
        dbname: "d",
        connection: "C"
      }, undefined, true, (function (s) {
          if (!s.startsWith("-")) {
            return true;
          }
          throw {
                RE_EXN_ID: UnknownArg,
                _1: s,
                Error: new Error()
              };
        }), match[1]);
  var match$1 = result["--"];
  if (match$1 !== undefined && match$1.length !== 0) {
    throw {
          RE_EXN_ID: UnknownArg,
          _1: "--",
          Error: new Error()
        };
  }
  var getFlagExn = function (name) {
    var v = get(result, name);
    if (typeof v === "number") {
      throw {
            RE_EXN_ID: InvalidFlag,
            _1: name,
            _2: v,
            Error: new Error()
          };
    }
    switch (v.TAG | 0) {
      case /* Bool */0 :
          return v._0;
      case /* String */1 :
          switch (v._0) {
            case "false" :
                return false;
            case "true" :
                return true;
            default:
              throw {
                    RE_EXN_ID: InvalidFlag,
                    _1: name,
                    _2: v,
                    Error: new Error()
                  };
          }
      case /* Float */2 :
          throw {
                RE_EXN_ID: InvalidFlag,
                _1: name,
                _2: v,
                Error: new Error()
              };
      
    }
  };
  var getParam = function (name) {
    var val = get(result, name);
    if (typeof val === "number" || val.TAG !== /* String */1) {
      return ;
    } else {
      return val._0;
    }
  };
  parsedArgv = {
    TAG: /* Ok */0,
    _0: {
      version: getFlagExn("version"),
      debug: getFlagExn("debug"),
      help: getFlagExn("help"),
      quiet: getFlagExn("quiet"),
      generator: getParam("generator"),
      out: getParam("out"),
      config: getParam("config"),
      host: getParam("host"),
      port: getParam("port"),
      username: getParam("username"),
      password: getParam("password"),
      dbname: getParam("dbname"),
      connection: getParam("connection"),
      inputs: result._
    }
  };
}
catch (raw_name){
  var name = Caml_js_exceptions.internalToOCamlException(raw_name);
  if (name.RE_EXN_ID === UnknownArg) {
    parsedArgv = {
      TAG: /* Error */1,
      _0: "Unknown argument: " + name._1
    };
  } else if (name.RE_EXN_ID === InvalidFlag) {
    var str = name._2;
    var name$1 = name._1;
    if (typeof str === "number") {
      parsedArgv = {
        TAG: /* Error */1,
        _0: "Invalid flag value: --" + name$1
      };
    } else {
      switch (str.TAG | 0) {
        case /* Bool */0 :
            parsedArgv = {
              TAG: /* Error */1,
              _0: "Invalid flag value: --" + name$1
            };
            break;
        case /* String */1 :
            parsedArgv = {
              TAG: /* Error */1,
              _0: "Invalid flag value: --" + name$1 + " = " + str._0
            };
            break;
        case /* Float */2 :
            parsedArgv = {
              TAG: /* Error */1,
              _0: "Invalid flag value: --" + name$1 + " = " + str._0.toString()
            };
            break;
        
      }
    }
  } else {
    throw name;
  }
}

function exitWithError(err) {
  console.log("Error! " + err + "\n");
  console.log("TODO: show help");
  return Process.exit(1);
}

function loadConfig(argv) {
  var load = function (path) {
    try {
      if (!Fs.existsSync(path)) {
        return {
                TAG: /* Ok */0,
                _0: undefined
              };
      }
      var match = getType(path);
      if (match !== "file") {
        return {
                TAG: /* Error */1,
                _0: Loggable$Errors.fromText("Not a file")
              };
      }
      var match$1 = Path.extname(path);
      switch (match$1) {
        case ".js" :
        case ".json" :
            return {
                    TAG: /* Ok */0,
                    _0: Caml_option.some(require(makeAbsolute(path)))
                  };
        default:
          return {
                  TAG: /* Error */1,
                  _0: Loggable$Errors.fromText("Must be a .json or a .js file")
                };
      }
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      return {
              TAG: /* Error */1,
              _0: Loggable$Errors.append(Loggable$Errors.fromExnVerbose(exn), "\n\nIn file: " + path)
            };
    }
  };
  var validate = function (param) {
    var fn = function (obj) {
      var obj$1 = cast(obj, object, "This");
      return {
              debug: property(obj$1, "debug", nullable(bool)),
              quiet: property(obj$1, "quiet", nullable(bool)),
              generator: property(obj$1, "generator", nullable(string)),
              host: property(obj$1, "host", nullable(string)),
              port: property(obj$1, "port", nullable(string)),
              username: property(obj$1, "username", nullable(string)),
              password: property(obj$1, "password", nullable(string)),
              dbname: property(obj$1, "dbname", nullable(string)),
              connection: property(obj$1, "connection", nullable(string)),
              sources: property(obj$1, "sources", arrayOf(objectOf2("input", either(string, (function (x) {
                                    return [x];
                                  }), arrayOf(string), (function (xs) {
                                    return xs;
                                  })), "output", nullable(either(string, (function (str) {
                                        return {
                                                TAG: /* Pattern */0,
                                                _0: str
                                              };
                                      }), $$function, (function (fn) {
                                        return {
                                                TAG: /* Function */1,
                                                _0: fn
                                              };
                                      })))))).map(function (param) {
                    return {
                            input: param[0],
                            output: param[1]
                          };
                  })
            };
    };
    try {
      return {
              TAG: /* Ok */0,
              _0: Curry._1(fn, param)
            };
    }
    catch (raw_err){
      var err = Caml_js_exceptions.internalToOCamlException(raw_err);
      if (err.RE_EXN_ID === Validation_error) {
        return {
                TAG: /* Error */1,
                _0: err._1
              };
      }
      throw err;
    }
  };
  var path = argv.config;
  var unvalidated;
  if (path !== undefined) {
    var err = load(path);
    unvalidated = err.TAG === /* Ok */0 ? (
        err._0 !== undefined ? err : ({
              TAG: /* Error */1,
              _0: Loggable$Errors.fromText("File " + path + " doesn't exist")
            })
      ) : ({
          TAG: /* Error */1,
          _0: err._0
        });
  } else {
    var res = load("./tsafe-sql-pg.config.json");
    if (res.TAG === /* Ok */0 && res._0 === undefined) {
      var res$1 = load("./tsafe-sql-pg.config.js");
      unvalidated = res$1.TAG === /* Ok */0 && res$1._0 === undefined ? load("./package.json") : res$1;
    } else {
      unvalidated = res;
    }
  }
  if (unvalidated.TAG !== /* Ok */0) {
    return unvalidated;
  }
  var val = unvalidated._0;
  if (val === undefined) {
    return {
            TAG: /* Ok */0,
            _0: undefined
          };
  }
  var config = validate(Caml_option.valFromOption(val));
  if (config.TAG === /* Ok */0) {
    return {
            TAG: /* Ok */0,
            _0: config._0
          };
  } else {
    return {
            TAG: /* Error */1,
            _0: config._0
          };
  }
}

function build(argv) {
  var err = loadConfig(argv);
  if (err.TAG !== /* Ok */0) {
    return Loggable$Errors.log(undefined, Loggable$Errors.prepend(err._0, "Couldn't load config! Reason:\n\n"));
  }
  console.log(err._0);
  
}

var exit = 0;

if (command !== undefined) {
  switch (command) {
    case "build" :
        if (parsedArgv.TAG === /* Ok */0) {
          build(parsedArgv._0);
        } else {
          exit = 1;
        }
        break;
    case "pipe" :
        if (parsedArgv.TAG === /* Ok */0) {
          console.log("TODO: pipe mode");
        } else {
          exit = 1;
        }
        break;
    case "watch" :
        if (parsedArgv.TAG === /* Ok */0) {
          console.log("TODO: watch");
        } else {
          exit = 1;
        }
        break;
    default:
      exitWithError("Unknown command: " + command);
  }
} else if (parsedArgv.TAG === /* Ok */0) {
  if (parsedArgv._0.version) {
    console.log("TODO: show version");
  } else {
    console.log("TODO: show help");
  }
} else {
  exit = 1;
}

if (exit === 1) {
  if (parsedArgv.TAG === /* Ok */0) {
    exitWithError("Unknown command: " + command);
  } else {
    exitWithError(parsedArgv._0);
  }
}

/* x Not a pure module */
