module.exports = function(serviceBus, type, mongoose, appTopicStreams){
    console.log("Setting up emitters");
    require('newrelic');
    var _ = require("underscore");
    var ServiceFactory = require('./service-manager'),
        config = require('./config'),
        //insta = require('./emitters/instaEmitter'),
        twitter = require('./emitters/twitterEmitter');
        //foursquare = require('./emitters/foursquareEmitter'),
        //wc = require('./emitters/wcEmitter'),
        //as = require('./subscriptions/alert-sub');
    var self = this;
    if(appTopicStreams){
         appTopicStreams.forEach(function(topicStream){
            self.addStreamingParams(topicStream);
         });
    }
    var svctype = (type)? type: "redis-pub-sub";
    var ServiceManager =  new ServiceFactory();
    var serviceBusService = (serviceBus !== undefined)
        ? serviceBus
        : ServiceManager.createServiceBusService(svctype);
    this.streamingParams = {};
    this.addStreamingParams = function(streamList){
        streamList.forEach(function(stream){
            self.streamingParams[stream.topic] = stream.track;
        });
    }

    this.run = function(){
        if(serviceBusService){
            var track = _.flatten(_.values(self.streamingParams));
            console.log("Running emitters for topic: " + config.messageTopic);
            serviceBusService.createTopicIfNotExists(config.messageTopic,function(error){
                if(!error){
                    console.log("Going ahead with Twitter setup");
                    if(!track)
                        track = config.twitter.track;
                    twitter.stream(serviceBusService, track, mongoose);
                    /*insta.start(serviceBusService);
                    foursquare.start(serviceBusService);*/
                    //wc.init(serviceBusService);
                    //as.init();
                } else{
                    console.log("Got an error n creating topic for service:");
                    console.log(serviceBusService);
                    console.og("Error details:");
                    console.log(error);
                }
            });
        }else{
            console.log("Could not run service because specified service bus '" + type + "' could not be created.");
        }
    }

};