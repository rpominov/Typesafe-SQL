// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Chalk = require("chalk");
var Process = require("process");
var TTY$PgCLI = require("./TTY.bs.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var PathRebuild = require("rescript-path-rebuild/lib/js/PathRebuild.bs.js");
var Native$Errors = require("@typesafe-sql/rescript-errors/lib/js/Native.bs.js");
var Require$PgCLI = require("./Require.bs.js");
var Commands$PgCLI = require("./Commands.bs.js");
var Minimist$PgCLI = require("./Minimist.bs.js");
var Caml_exceptions = require("rescript/lib/js/caml_exceptions.js");
var Loggable$Errors = require("@typesafe-sql/rescript-errors/lib/js/Loggable.bs.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");

var version = "0.1.0";

var header = "Typesafe SQL CLI for PostgreSQL [ver. " + version + "]\n\nThis is a tool for generating typings for PostgreSQL queries.";

var help = "Usage: typesafe-pg [--version | -v] <command> [--debug | -D] [--quiet | -q]\n       [--input | -i <glob>] [--output | -o <pattern>] [--generator | -g <generator>]\n       [--config | -c <path>] [--host | -h <db-host>] [--port | -p <db-port>]\n       [--username | -U <db-user>] [--password | -W <db-password>]\n       [--dbname | -d <db-database-name>] [--connection | -C <db-connection-string>]\n\ntypesafe-pg build - Generate typings\ntypesafe-pg watch - Generate, and continue updating as the input files change\ntypesafe-pg pipe  - Generate using stdin as the input and output to stdout \n\nExample:\n\n  $ typesafe-pg build \\\n    --connection \"postgres://user:password@host:5432/database\" \\\n    --input \"queries/*.sql\" \\\n    --output \"{dir}/{name}.res\" \\\n    --generator rescript\n       \nFull documentation is available at \nhttps://github.com/rpominov/typesafe-sql/tree/master/packages/pg-cli\n";

var quiet = {
  contents: false
};

function exitWithLoggableError(err) {
  TTY$PgCLI.error(Chalk.red("ERROR!"));
  TTY$PgCLI.printLoggable(err);
  if (!quiet.contents) {
    console.error("");
    console.error(Chalk.dim(help));
  }
  return Process.exit(1);
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

var unparsedArgv = match[1];

var command = match[0];

var command$1;

if (command !== undefined) {
  switch (command) {
    case "build" :
        command$1 = "build";
        break;
    case "pipe" :
        command$1 = "pipe";
        break;
    case "watch" :
        command$1 = "watch";
        break;
    default:
      command$1 = exitWithLoggableError(Loggable$Errors.fromText("Unknown command: " + command));
  }
} else {
  command$1 = "help";
}

var outputValidator = Require$PgCLI.Validators.either(Require$PgCLI.Validators.string, (function (str) {
        if (str === "") {
          return {
                  TAG: /* Error */1,
                  _0: Loggable$Errors.fromText("Invalid \"output\" value. It cannot be an empty string.")
                };
        }
        var fn = PathRebuild.make(str);
        if (fn.TAG === /* Ok */0) {
          return {
                  TAG: /* Ok */0,
                  _0: fn._0
                };
        } else {
          return {
                  TAG: /* Error */1,
                  _0: Loggable$Errors.fromText("Invalid \"output\" value. " + fn._0)
                };
        }
      }), Require$PgCLI.Validators.$$function, (function (fn) {
        return {
                TAG: /* Ok */0,
                _0: (function (str) {
                    return fn(str);
                  })
              };
      }));

function resolveGenerator(moduleId) {
  var err = Require$PgCLI.$$require(moduleId);
  if (err.TAG !== /* Ok */0) {
    return err;
  }
  var obj = err._0;
  if (obj === undefined) {
    return {
            TAG: /* Error */1,
            _0: Loggable$Errors.fromText("Can't find module \"" + moduleId + "\"")
          };
  }
  var obj$1 = Caml_option.valFromOption(obj);
  return Require$PgCLI.validate(function (param) {
              var obj$2 = Require$PgCLI.Validators.cast(obj$1, Require$PgCLI.Validators.object, "The export of \"" + moduleId + "\"");
              return {
                      name: moduleId,
                      defaultOutputPath: Require$PgCLI.Validators.property(obj$2, "defaultOutputPath", outputValidator),
                      generate: Require$PgCLI.Validators.property(obj$2, "generate", Require$PgCLI.Validators.$$function)
                    };
            });
}

var ArgsParseError = /* @__PURE__ */Caml_exceptions.create("Cli-PgCLI.ArgsParseError");

var argv;

try {
  var result = Minimist$PgCLI.parse([
        "generator",
        "output",
        "input",
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
        "quiet"
      ], {
        version: "v",
        generator: "g",
        debug: "D",
        input: "i",
        output: "o",
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
                RE_EXN_ID: ArgsParseError,
                _1: {
                  TAG: /* UnknownParameter */1,
                  _0: s
                },
                Error: new Error()
              };
        }), unparsedArgv);
  var getFlagExn = function (name) {
    var v = Minimist$PgCLI.get(result, name);
    if (typeof v === "number") {
      throw {
            RE_EXN_ID: ArgsParseError,
            _1: {
              TAG: /* InvalidFlag */0,
              _0: name,
              _1: v
            },
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
                    RE_EXN_ID: ArgsParseError,
                    _1: {
                      TAG: /* InvalidFlag */0,
                      _0: name,
                      _1: v
                    },
                    Error: new Error()
                  };
          }
      case /* Float */2 :
          throw {
                RE_EXN_ID: ArgsParseError,
                _1: {
                  TAG: /* InvalidFlag */0,
                  _0: name,
                  _1: v
                },
                Error: new Error()
              };
      
    }
  };
  var getParam = function (name) {
    var val = Minimist$PgCLI.get(result, name);
    if (typeof val === "number" || val.TAG !== /* String */1) {
      return ;
    } else {
      return val._0;
    }
  };
  quiet.contents = getFlagExn("quiet");
  if (unparsedArgv.includes("--")) {
    throw {
          RE_EXN_ID: ArgsParseError,
          _1: {
            TAG: /* UnknownParameter */1,
            _0: "--"
          },
          Error: new Error()
        };
  }
  var arr = result._;
  if (arr.length !== 0) {
    throw {
          RE_EXN_ID: ArgsParseError,
          _1: {
            TAG: /* UnknownParameter */1,
            _0: arr[0]
          },
          Error: new Error()
        };
  }
  var name = getParam("generator");
  var generator;
  if (name !== undefined) {
    var generator$1 = resolveGenerator(name);
    if (generator$1.TAG === /* Ok */0) {
      generator = generator$1._0;
    } else {
      throw {
            RE_EXN_ID: ArgsParseError,
            _1: {
              TAG: /* ParameterLoggableError */3,
              _0: "generator",
              _1: generator$1._0
            },
            Error: new Error()
          };
    }
  } else {
    generator = undefined;
  }
  var str = getParam("output");
  var tmp;
  if (str !== undefined) {
    if (str === "") {
      throw {
            RE_EXN_ID: ArgsParseError,
            _1: {
              TAG: /* ParameterError */2,
              _0: "output",
              _1: "It cannot be an empty string."
            },
            Error: new Error()
          };
    }
    var fn = PathRebuild.make(str);
    if (fn.TAG === /* Ok */0) {
      tmp = fn._0;
    } else {
      throw {
            RE_EXN_ID: ArgsParseError,
            _1: {
              TAG: /* ParameterError */2,
              _0: "output",
              _1: fn._0
            },
            Error: new Error()
          };
    }
  } else {
    tmp = undefined;
  }
  argv = {
    version: getFlagExn("version"),
    debug: getFlagExn("debug"),
    quiet: getFlagExn("quiet"),
    generator: generator,
    input: getParam("input"),
    output: tmp,
    config: getParam("config"),
    host: getParam("host"),
    port: getParam("port"),
    username: getParam("username"),
    password: getParam("password"),
    dbname: getParam("dbname"),
    connection: getParam("connection")
  };
}
catch (raw_error){
  var error = Caml_js_exceptions.internalToOCamlException(raw_error);
  if (error.RE_EXN_ID === ArgsParseError) {
    var error$1 = error._1;
    switch (error$1.TAG | 0) {
      case /* InvalidFlag */0 :
          var str$1 = error$1._1;
          var name$1 = error$1._0;
          if (typeof str$1 === "number") {
            argv = exitWithLoggableError(Loggable$Errors.fromText("Invalid --" + name$1 + " value. A boolen flag can have values true/false or no value."));
          } else {
            switch (str$1.TAG | 0) {
              case /* Bool */0 :
                  argv = exitWithLoggableError(Loggable$Errors.fromText("Invalid --" + name$1 + " value. A boolen flag can have values true/false or no value."));
                  break;
              case /* String */1 :
                  argv = exitWithLoggableError(Loggable$Errors.fromText("Invalid --" + name$1 + " value. A boolen flag can have values true/false or no value, got: " + str$1._0));
                  break;
              case /* Float */2 :
                  var err = "Invalid --" + name$1 + " value. A boolen flag can have values true/false or no value, got: " + str$1._0.toString();
                  argv = exitWithLoggableError(Loggable$Errors.fromText(err));
                  break;
              
            }
          }
          break;
      case /* UnknownParameter */1 :
          argv = exitWithLoggableError(Loggable$Errors.fromText("Unknown argument: " + error$1._0));
          break;
      case /* ParameterError */2 :
          argv = exitWithLoggableError(Loggable$Errors.fromText("Invalid --" + error$1._0 + " value. " + error$1._1));
          break;
      case /* ParameterLoggableError */3 :
          argv = exitWithLoggableError(Loggable$Errors.prepend(error$1._1, "Invalid --" + error$1._0 + " value."));
          break;
      
    }
  } else {
    argv = Native$Errors.rethrowAsNative(error);
  }
}

if (argv.version) {
  console.log(version);
} else {
  var path = argv.config;
  var res;
  if (path !== undefined) {
    var result$1 = Require$PgCLI.$$require(path);
    res = result$1.TAG === /* Ok */0 && result$1._0 === undefined ? [
        path,
        {
          TAG: /* Error */1,
          _0: Loggable$Errors.fromText("File doesn't exist")
        }
      ] : [
        path,
        result$1
      ];
  } else {
    var res$1 = Require$PgCLI.$$require("./typesafe-pg.config.json");
    if (res$1.TAG === /* Ok */0 && res$1._0 === undefined) {
      var res$2 = Require$PgCLI.$$require("./typesafe-pg.config.js");
      if (res$2.TAG === /* Ok */0 && res$2._0 === undefined) {
        var res$3 = Require$PgCLI.$$require("./package.json");
        if (res$3.TAG === /* Ok */0) {
          var obj = res$3._0;
          if (obj !== undefined) {
            var obj$1 = Caml_option.valFromOption(obj);
            res = [
              "./package.json",
              Require$PgCLI.validate(function (param) {
                    return Require$PgCLI.Validators.property(Require$PgCLI.Validators.cast(obj$1, Require$PgCLI.Validators.object, "This"), "typesafe-pg", Require$PgCLI.Validators.nullable(Require$PgCLI.Validators.unknown));
                  })
            ];
          } else {
            res = [
              "./package.json",
              res$3
            ];
          }
        } else {
          res = [
            "./package.json",
            res$3
          ];
        }
      } else {
        res = [
          "./typesafe-pg.config.js",
          res$2
        ];
      }
    } else {
      res = [
        "./typesafe-pg.config.json",
        res$1
      ];
    }
  }
  var match$1 = res[1];
  var match$2;
  if (match$1.TAG === /* Ok */0) {
    var obj$2 = match$1._0;
    if (obj$2 !== undefined) {
      var obj$3 = Caml_option.valFromOption(obj$2);
      match$2 = [
        res[0],
        Require$PgCLI.validate(function (param) {
              var obj$4 = Require$PgCLI.Validators.cast(obj$3, Require$PgCLI.Validators.object, "This");
              var name = Require$PgCLI.Validators.property(obj$4, "generator", Require$PgCLI.Validators.nullable(Require$PgCLI.Validators.string));
              var generator;
              if (name !== undefined) {
                var error = resolveGenerator(name);
                generator = error.TAG === /* Ok */0 ? error._0 : Require$PgCLI.Validators.failed(error._0);
              } else {
                generator = undefined;
              }
              var some = Require$PgCLI.Validators.property(obj$4, "sources", Require$PgCLI.Validators.nullable(Require$PgCLI.Validators.arrayOf(Require$PgCLI.Validators.objectOf2("input", Require$PgCLI.Validators.either(Require$PgCLI.Validators.string, (function (x) {
                                      return {
                                              TAG: /* Ok */0,
                                              _0: [x]
                                            };
                                    }), Require$PgCLI.Validators.arrayOf(Require$PgCLI.Validators.string), (function (xs) {
                                      return {
                                              TAG: /* Ok */0,
                                              _0: xs
                                            };
                                    })), "output", Require$PgCLI.Validators.nullable(outputValidator), (function (i, o) {
                                  return {
                                          input: i,
                                          output: o
                                        };
                                })))));
              return {
                      debug: Require$PgCLI.Validators.property(obj$4, "debug", Require$PgCLI.Validators.nullable(Require$PgCLI.Validators.bool)),
                      quiet: Require$PgCLI.Validators.property(obj$4, "quiet", Require$PgCLI.Validators.nullable(Require$PgCLI.Validators.bool)),
                      generator: generator,
                      host: Require$PgCLI.Validators.property(obj$4, "host", Require$PgCLI.Validators.nullable(Require$PgCLI.Validators.string)),
                      port: Require$PgCLI.Validators.property(obj$4, "port", Require$PgCLI.Validators.nullable(Require$PgCLI.Validators.string)),
                      username: Require$PgCLI.Validators.property(obj$4, "username", Require$PgCLI.Validators.nullable(Require$PgCLI.Validators.string)),
                      password: Require$PgCLI.Validators.property(obj$4, "password", Require$PgCLI.Validators.nullable(Require$PgCLI.Validators.string)),
                      dbname: Require$PgCLI.Validators.property(obj$4, "dbname", Require$PgCLI.Validators.nullable(Require$PgCLI.Validators.string)),
                      connection: Require$PgCLI.Validators.property(obj$4, "connection", Require$PgCLI.Validators.nullable(Require$PgCLI.Validators.string)),
                      sources: some !== undefined && some.length !== 0 ? some : undefined
                    };
            })
      ];
    } else {
      match$2 = [
        "%fallback",
        {
          TAG: /* Ok */0,
          _0: {
            debug: undefined,
            quiet: undefined,
            generator: undefined,
            host: undefined,
            port: undefined,
            username: undefined,
            password: undefined,
            dbname: undefined,
            connection: undefined,
            sources: undefined
          }
        }
      ];
    }
  } else {
    match$2 = res;
  }
  var data = match$2[1];
  var path$1 = match$2[0];
  var config;
  if (data.TAG === /* Ok */0) {
    if (!quiet.contents && command$1 !== "help") {
      console.error("Using config from:", path$1);
    }
    config = data._0;
  } else {
    config = exitWithLoggableError(Loggable$Errors.prepend(data._0, "Failed to load config file \"" + path$1 + "\"! Reason:\n\n"));
  }
  var ctx = {
    config: config,
    argv: argv
  };
  if (command$1 === "watch") {
    Commands$PgCLI.watch(ctx);
  } else if (command$1 === "pipe") {
    Commands$PgCLI.pipe(ctx);
  } else if (command$1 === "build") {
    Commands$PgCLI.build(ctx);
  } else {
    TTY$PgCLI.info(ctx, header);
    TTY$PgCLI.infoNl(ctx);
    TTY$PgCLI.info(ctx, help);
  }
}

/* x Not a pure module */
