var twitter = require('ntwitter'),
  config = require('../config'),
  sub = require('../util/subscriptionListener'),
  socialMessage;// = require('../model/socialMessage');
var urlRegex = /(https?:\/\/[^\s]+)/g;

var twit = new twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

var theStream = null;
var theTrack = null;

var listener = null;

var search = function(searchOptions){
    twit.search('nodejs OR #node', function(err, data) {
        if (err) {
            console.log('Twitter search failed!');
        }
        else {
            console.log('Search results:');
            console.dir(data);
        }
    });
}

var updateStatus = function(message){
    twit
        .verifyCredentials(function (err, data) {
            console.log(data);
        })
        .updateStatus(message, function (err, data) {
            console.log(data);
        }
    );
}
module.exports.stream = function(service, track, mongoose) {
    console.log("************** Registering Twitter Streamer ***********");
    var settingsRepo = require('../model/settings')(mongoose);
    var sm = require('../model/socialMessage')(mongoose) ;
    socialMessage = sm;
    if(!track){
        settingsRepo.getByKeyWithDefault('twitterSearchTerm', config.twitter.defaultSearchTerm, function(obj) {
            theTrack = "mufc";//obj.value;
            console.log("Found twitter filters:");
            console.log(theTrack);
            streamTwitter();
        });
    }   else{
        theTrack = track;
        streamTwitter();
    }

    function streamTwitter() {
        console.log("Tracking twitter streams with the following track:");
        console.log(theTrack);
        try{
        twit.stream('statuses/filter', {
            track: theTrack
        }, function (stream) {
            theStream = stream;
            stream.on('data', function (data) {
                console.log(data);
                var rt = data.retweeted_status;
                if (rt) {
                    data = data.retweeted_status;
                }
                handleData(data, service);
            });
        });
        }catch(err){
           console.error(err);
            console.log("Retrying to to stream");
            //streamTwitter();
        }
    }
/*
    listener = new sub(config.configTopic, config.configSubName + '-twitter', function(msg) {
        console.log("[twitter] handling config change");
        settingsRepo.getByKey('twitterSearchTerm', function(err, obj) {
          var test = theTrack;
          if(Array.isArray(test)) {
            test = test.join(',');
          }
          if(test != obj.value) {
            console.log('we need to restart twitter searching to ', obj.value.split(','))
            theStream.destroy();
            theTrack = obj.value.split(',');
            streamTwitter();
          }
        });
      },
    true);*/

}

function handleData(data, service) {
  if (!data.text) {
    console.log('found a data with no text', data);
    return;
  }
  var msg = {
    id: data.id_str,
    type: "tweet",
    content: data.text.replace(urlRegex, ""),
    size: data.retweet_count + 1,
    colour: "red",
    //details: { 
    authorId: data.user.id,
    authorName: data.user.screen_name,
    authorProfileUrl: data.user.profile_image_url,
    dateTime: data.created_at
    //}
  };
  //console.log(msg);
  socialMessage.add(msg, function(err, obj) {
    if (err)
      console.log("Error saving to mongo", err);
    //else
    //  console.log("Tweet Saved");
  });
  sendMessage("twitter", service, msg);

  if (data.entities.media) {
    var img = data.entities.media[0];
    imgMsg = {
      id: img.id,
      type: "image",
      content: img.media_url,
      size: data.retweet_count,
      colour: "red",
      authorId: data.user.id,
      authorName: data.user.screen_name,
      authorProfileUrl: data.user.profile_image_url,
      dateTime: data.created_at
      //details: {}
    };

    socialMessage.add(imgMsg, function(err, obj) {
      if (err)
        console.log("Error saving to mongo", err);
      // else
      //   console.log("Image Saved");
    });

    sendMessage("image", service, imgMsg);
  }

}

function sendMessage(type, service, msg, messageTopic) {
    if(!messageTopic)
        messageTopic = config.messageTopic;
  service.sendTopicMessage(messageTopic, {
    body: "Message From " + type,
    customProperties: msg
  }, function(error) {
    if (error) {
      //console.log("Failed to send to queue " + msg);
      //console.log("Error sending Message to topic:", error);
    }
  });
}