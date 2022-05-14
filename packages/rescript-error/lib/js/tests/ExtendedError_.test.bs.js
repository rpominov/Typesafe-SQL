// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var ExtendedError = require("../ExtendedError.bs.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");

test("Not_found->toJsError", (function () {
        expect(ExtendedError.toJsError({
                    RE_EXN_ID: "Not_found"
                  })).toMatchSnapshot();
        try {
          throw {
                RE_EXN_ID: "Not_found",
                Error: new Error()
              };
        }
        catch (raw_exn){
          var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
          expect(ExtendedError.toJsError(exn)).toMatchSnapshot();
          return ;
        }
      }));

test("Invalid_argument->toJsError", (function () {
        expect(ExtendedError.toJsError({
                    RE_EXN_ID: "Invalid_argument",
                    _1: "test"
                  })).toMatchSnapshot();
        try {
          throw {
                RE_EXN_ID: "Invalid_argument",
                _1: "test",
                Error: new Error()
              };
        }
        catch (raw_exn){
          var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
          expect(ExtendedError.toJsError(exn)).toMatchSnapshot();
          return ;
        }
      }));

test("toJsError + stack (not raised)", (function () {
        expect(ExtendedError.stack(ExtendedError.toJsError({
                              RE_EXN_ID: "Not_found"
                            })).split("\n")[1].includes("ExtendedError.bs.js")).toBe(true);
        
      }));

test("toJsError + stack", (function () {
        try {
          throw {
                RE_EXN_ID: "Not_found",
                Error: new Error()
              };
        }
        catch (raw_exn){
          var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
          expect(ExtendedError.stack(ExtendedError.toJsError(exn)).split("\n")[1].includes("ExtendedError_.test.bs.js")).toBe(true);
          return ;
        }
      }));

/*  Not a pure module */
