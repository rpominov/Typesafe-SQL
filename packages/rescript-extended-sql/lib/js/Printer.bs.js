// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';


function print(nextParamIndexOpt, ast) {
  var nextParamIndex = nextParamIndexOpt !== undefined ? nextParamIndexOpt : ({
        contents: 1
      });
  var genParamIndex = function (param) {
    var index = nextParamIndex.contents;
    nextParamIndex.contents = index + 1 | 0;
    return index;
  };
  var _nodeIndex = 0;
  var _sqlAcc = [""];
  var _paramsAcc = [];
  while(true) {
    var paramsAcc = _paramsAcc;
    var sqlAcc = _sqlAcc;
    var nodeIndex = _nodeIndex;
    if (nodeIndex >= ast.length) {
      return [
              sqlAcc,
              paramsAcc
            ];
    }
    var match = ast[nodeIndex];
    var code = match.val;
    switch (code.TAG | 0) {
      case /* SQL_Chunk */0 :
          var code$1 = code._0;
          _sqlAcc = sqlAcc.map((function(code$1){
              return function (x) {
                return x + code$1;
              }
              }(code$1)));
          _nodeIndex = nodeIndex + 1 | 0;
          continue ;
      case /* InlineComment */1 :
      case /* BlockComment */2 :
          _nodeIndex = nodeIndex + 1 | 0;
          continue ;
      case /* Parameter */3 :
          var paramIndex = genParamIndex(undefined);
          _paramsAcc = paramsAcc.concat([{
                  name: code._0,
                  link: {
                    TAG: /* Plain */0,
                    _0: paramIndex
                  }
                }]);
          _sqlAcc = sqlAcc.map((function(paramIndex){
              return function (x) {
                return x + "$" + paramIndex.toString();
              }
              }(paramIndex)));
          _nodeIndex = nodeIndex + 1 | 0;
          continue ;
      case /* RawParameter */4 :
          var codeOptions = code._1;
          if (codeOptions.length === 0) {
            throw {
                  RE_EXN_ID: "Assert_failure",
                  _1: [
                    "Printer.res",
                    29,
                    12
                  ],
                  Error: new Error()
                };
          }
          _paramsAcc = paramsAcc.concat([{
                  name: code._0,
                  link: {
                    TAG: /* Raw */1,
                    _0: codeOptions
                  }
                }]);
          _sqlAcc = sqlAcc.flatMap((function(codeOptions){
              return function (x) {
                return codeOptions.map(function (y) {
                            return x + y;
                          });
              }
              }(codeOptions)));
          _nodeIndex = nodeIndex + 1 | 0;
          continue ;
      case /* BatchParameter */5 :
          var subAst = code._2;
          var separator = code._1;
          var match$1 = print(nextParamIndex, subAst);
          var subSql = match$1[0];
          var match$2 = print(nextParamIndex, subAst);
          var subSql2 = match$2[0];
          _paramsAcc = paramsAcc.concat([{
                  name: code._0,
                  link: {
                    TAG: /* Batch */2,
                    _0: separator,
                    _1: match$1[1]
                  }
                }]);
          _sqlAcc = sqlAcc.flatMap((function(subSql){
                return function (x) {
                  return subSql.map(function (y) {
                              return x + y;
                            });
                }
                }(subSql))).flatMap((function(separator,subSql2){
              return function (x) {
                return subSql2.map(function (y) {
                            return x + separator + y;
                          });
              }
              }(separator,subSql2)));
          _nodeIndex = nodeIndex + 1 | 0;
          continue ;
      
    }
  };
}

exports.print = print;
/* No side effect */
