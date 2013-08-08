require('newrelic');

var ServiceFactory = require('./service-manager'),
	config = require('./config'),
	insta = require('./emitters/instaEmitter'),
	twitter = require('./emitters/twitterEmitter'),
	foursquare = require('./emitters/foursquareEmitter'),
    wc = require('./emitters/wcEmitter'),
    as = require('./subscriptions/alert-sub');

var ServiceManager =  new ServiceFactory();
var serviceBusService = ServiceManager.createServiceBusService("redis-pub-sub");

serviceBusService.createTopicIfNotExists(config.messageTopic,function(error){
    if(!error){
        twitter.stream(serviceBusService, config.twitterTrack);
        insta.start(serviceBusService);
        foursquare.start(serviceBusService);
        wc.init(serviceBusService);
        as.init();
    }
});

