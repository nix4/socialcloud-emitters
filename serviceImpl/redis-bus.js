module.exports = (function(){
    var nodeUtils = require("util"),
    abstractBus = require("../service-interface");

    var RedisBus = function(){
        abstractBus.call(this);
    }

    nodeUtils.inherits(RedisBus, abstractBus);

    RedisBus.prototype.createTopicIfNotExists = function(msgTopic, callback){
         callback();
    }

    RedisBus.prototype.sendTopicMessage = function(msgTopic, msgHash, callback){
        callback();
    }

    return new RedisBus();
})();