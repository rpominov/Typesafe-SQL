// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';


function convertParameters(param) {
  return [];
}

function convertRow(param) {
  return {};
}

var NoRows = {
  statement: "-- @noRows\ncreate table test (id serial)",
  convertParameters: convertParameters,
  convertRow: convertRow
};

function convertParameters$1(param) {
  return [];
}

function convertRow$1(param) {
  return {};
}

var Empty = {
  statement: "-- @empty\nselect from pg_type",
  convertParameters: convertParameters$1,
  convertRow: convertRow$1
};

function convertParameters$2(param) {
  return [];
}

function convertRow$2(r) {
  return {
          oid: r[0]
        };
}

var One = {
  statement: "-- @one\nselect oid from pg_type",
  convertParameters: convertParameters$2,
  convertRow: convertRow$2
};

function convertParameters$3(param) {
  return [];
}

function convertRow$3(param) {
  return {
          oid: param[0],
          typname: param[1]
        };
}

var Two = {
  statement: "-- @two\nselect oid, typname from pg_type",
  convertParameters: convertParameters$3,
  convertRow: convertRow$3
};

function convertParameters$4(r) {
  return [r.oid];
}

function convertRow$4(param) {
  return {
          oid: param[0],
          typname: param[1]
        };
}

var OneParam = {
  statement: "-- @oneParam\nselect oid, typname from pg_type where oid = $1",
  convertParameters: convertParameters$4,
  convertRow: convertRow$4
};

function convertParameters$5(r) {
  return [
          r.oid,
          r.name
        ];
}

function convertRow$5(param) {
  return {
          oid: param[0],
          typname: param[1]
        };
}

var TwoParams = {
  statement: "-- @twoParams\nselect oid, typname from pg_type where oid = $1 and typname = $2",
  convertParameters: convertParameters$5,
  convertRow: convertRow$5
};

function convertParameters$6(param) {
  return [];
}

function convertRow$6(param) {
  return {
          oid: param[0],
          name: param[1],
          typcategory: param[3]
        };
}

var NonUniqueColumnNames = {
  statement: "-- @nonUniqueColumnNames\nselect oid, typname name, 'name' name, typcategory from pg_type",
  convertParameters: convertParameters$6,
  convertRow: convertRow$6
};

exports.NoRows = NoRows;
exports.Empty = Empty;
exports.One = One;
exports.Two = Two;
exports.OneParam = OneParam;
exports.TwoParams = TwoParams;
exports.NonUniqueColumnNames = NonUniqueColumnNames;
/* No side effect */
