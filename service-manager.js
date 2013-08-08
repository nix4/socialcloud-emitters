module.exports = function(){
    this.createServiceBusService = function(type){
        var svcBus;
        if(type === "azure"){
            svcBus = require("./serviceImpl/azure-bus");
        }else if(type === "redis-sub-pub")
            svcBus = require("./serviceImpl/redis-bus");
        else{
            console.log("Service type: " + type + " is not supported.");
        }
        return svcBus;
    }

}