//var config=
//var clone=require('../lib/clone.js')


var util = require("./util");
var shallow = util.shallowCopy;

var Aj={};

//basic apis
Aj.config = require('./config');

Aj.util = shallow(util, {}, [
  "createUID",
  "regulateArray",
  "clone",
  "arraySwap"
]);

Aj.sync = util.sync;

Aj.init = function(initFunc){
  var scope = Aj.config.scope.create();
  initFunc(scope);
}

Aj.delay=function(callback, timeout){
  setTimeout(function(){
    callback.apply();
    Aj.sync();
  }, timeout ? timeout : 0);
}

//entry point
require("./scope");

//internal extension
require("./dom-bind");
require("./watch");

var form = require("./form");

shallow(form, Aj);

$(function(){
  if(Aj.config.autoSyncAfterJqueryAjax){
    $( document ).ajaxComplete(function() {
      Aj.sync();
    });
  }
});

module.exports = Aj;