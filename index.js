
var xyz = [];
module.exports = function(serviceBus, type, mongoose, appTopicStreams){
    console.log("Setting up emitters");
    //require('newrelic');
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
             console.log(topicStream);
            addStreamingParams(topicStream);
         });
    }

    var svctype = (type)? type: "redis-pub-sub";
    var ServiceManager =  new ServiceFactory();
    var serviceBusService = (serviceBus !== undefined)
        ? serviceBus
        : ServiceManager.createServiceBusService(svctype);


    function addStreamingParams(streamList){
        console.log(xyz);
        streamList.forEach(function(stream){
            xyz.push(stream);//.topic] = stream.tracks;
        });
    }

    this.run = function(){
        if(serviceBusService){
            var track = [];
            xyz.forEach(function(stream){
                track = _.union(track, stream.tracks);//.topic] = stream.tracks;
            });

            console.log("Running emitters for topic: " + config.messageTopic);

            serviceBusService.createTopicIfNotExists(config.messageTopic,function(error){
                if(!error){
                    console.log("Going ahead with Twitter setup");
                    if(!track || _.size(track) < 1)
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