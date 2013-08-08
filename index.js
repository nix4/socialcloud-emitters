module.exports = function(serviceBus, type){
    require('newrelic');
    var ServiceFactory = require('./service-manager'),
        config = require('./config'),
        insta = require('./emitters/instaEmitter'),
        twitter = require('./emitters/twitterEmitter'),
        foursquare = require('./emitters/foursquareEmitter'),
        wc = require('./emitters/wcEmitter'),
        as = require('./subscriptions/alert-sub');

    var svctype = (type)? type: "redis-pub-sub";
    var ServiceManager =  new ServiceFactory();
    var serviceBusService = (serviceBus !== undefined)
        ? serviceBus
        : ServiceManager.createServiceBusService(svctype);

    this.run = function(){
        if(serviceBusService){
            serviceBusService.createTopicIfNotExists(config.messageTopic,function(error){
                if(!error){
                    twitter.stream(serviceBusService, config.twitterTrack);
                    insta.start(serviceBusService);
                    foursquare.start(serviceBusService);
                    wc.init(serviceBusService);
                    as.init();
                }
            });
        }else{
            console.log("Could not run service because specified service bus '" + type + "' could not be created.");
        }
    }

};