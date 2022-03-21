// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");

var statement = "-- @noRows\ncreate table test (id serial)";

function convertParameters(param) {
  
}

function convertRow(param) {
  return {};
}

function runRaw(client) {
  return client.query({
              rowMode: "array",
              text: statement
            });
}

function run(client) {
  var __x = runRaw(client);
  return __x.then(function (res) {
              return Promise.resolve(res.rowCount);
            });
}

var NoRows = {
  statement: statement,
  convertParameters: convertParameters,
  convertRow: convertRow,
  runRaw: runRaw,
  run: run
};

var statement$1 = "-- @empty\nselect from pg_type";

function convertParameters$1(param) {
  
}

function convertRow$1(param) {
  return {};
}

function runRaw$1(client) {
  return client.query({
              rowMode: "array",
              text: statement$1
            });
}

function run$1(client) {
  var __x = runRaw$1(client);
  return __x.then(function (res) {
              return Promise.resolve(res.rows.map(convertRow$1));
            });
}

var Empty = {
  statement: statement$1,
  convertParameters: convertParameters$1,
  convertRow: convertRow$1,
  runRaw: runRaw$1,
  run: run$1
};

var statement$2 = "-- @one\nselect oid from pg_type";

function convertParameters$2(param) {
  
}

function convertRow$2(r) {
  return {
          oid: Caml_option.nullable_to_opt(r[0])
        };
}

function runRaw$2(client) {
  return client.query({
              rowMode: "array",
              text: statement$2
            });
}

function run$2(client) {
  var __x = runRaw$2(client);
  return __x.then(function (res) {
              return Promise.resolve(res.rows.map(convertRow$2));
            });
}

var One = {
  statement: statement$2,
  convertParameters: convertParameters$2,
  convertRow: convertRow$2,
  runRaw: runRaw$2,
  run: run$2
};

var statement$3 = "-- @two\nselect oid, typname from pg_type";

function convertParameters$3(param) {
  
}

function convertRow$3(param) {
  return {
          oid: Caml_option.nullable_to_opt(param[0]),
          typname: Caml_option.nullable_to_opt(param[1])
        };
}

function runRaw$3(client) {
  return client.query({
              rowMode: "array",
              text: statement$3
            });
}

function run$3(client) {
  var __x = runRaw$3(client);
  return __x.then(function (res) {
              return Promise.resolve(res.rows.map(convertRow$3));
            });
}

var Two = {
  statement: statement$3,
  convertParameters: convertParameters$3,
  convertRow: convertRow$3,
  runRaw: runRaw$3,
  run: run$3
};

var statement$4 = "-- @oneParam\nselect oid, typname from pg_type where oid = $1";

function convertParameters$4(r) {
  return [r.oid];
}

function convertRow$4(param) {
  return {
          oid: Caml_option.nullable_to_opt(param[0]),
          typname: Caml_option.nullable_to_opt(param[1])
        };
}

function runRaw$4(client, parameters) {
  return client.query({
              values: [parameters.oid],
              rowMode: "array",
              text: statement$4
            });
}

function run$4(client, parameters) {
  var __x = runRaw$4(client, parameters);
  return __x.then(function (res) {
              return Promise.resolve(res.rows.map(convertRow$4));
            });
}

var OneParam = {
  statement: statement$4,
  convertParameters: convertParameters$4,
  convertRow: convertRow$4,
  runRaw: runRaw$4,
  run: run$4
};

var statement$5 = "-- @twoParams\nselect oid, typname from pg_type where oid = $1 and typname = $2";

function convertParameters$5(r) {
  return [
          r.oid,
          r.name
        ];
}

function convertRow$5(param) {
  return {
          oid: Caml_option.nullable_to_opt(param[0]),
          typname: Caml_option.nullable_to_opt(param[1])
        };
}

function runRaw$5(client, parameters) {
  return client.query({
              values: convertParameters$5(parameters),
              rowMode: "array",
              text: statement$5
            });
}

function run$5(client, parameters) {
  var __x = runRaw$5(client, parameters);
  return __x.then(function (res) {
              return Promise.resolve(res.rows.map(convertRow$5));
            });
}

var TwoParams = {
  statement: statement$5,
  convertParameters: convertParameters$5,
  convertRow: convertRow$5,
  runRaw: runRaw$5,
  run: run$5
};

var statement$6 = "-- @nonUniqueColumnNames\nselect oid, typname name, 'name' name, typcategory from pg_type";

function convertParameters$6(param) {
  
}

function convertRow$6(param) {
  return {
          oid: Caml_option.nullable_to_opt(param[0]),
          name: Caml_option.nullable_to_opt(param[1]),
          typcategory: Caml_option.nullable_to_opt(param[3])
        };
}

function runRaw$6(client) {
  return client.query({
              rowMode: "array",
              text: statement$6
            });
}

function run$6(client) {
  var __x = runRaw$6(client);
  return __x.then(function (res) {
              return Promise.resolve(res.rows.map(convertRow$6));
            });
}

var NonUniqueColumnNames = {
  statement: statement$6,
  convertParameters: convertParameters$6,
  convertRow: convertRow$6,
  runRaw: runRaw$6,
  run: run$6
};

exports.NoRows = NoRows;
exports.Empty = Empty;
exports.One = One;
exports.Two = Two;
exports.OneParam = OneParam;
exports.TwoParams = TwoParams;
exports.NonUniqueColumnNames = NonUniqueColumnNames;
/* No side effect */
