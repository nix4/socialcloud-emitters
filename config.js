module.exports = {
	azureNamespace: "",
	azureAccessKey: "",
	messageTopic: "messagetopic",
	configTopic: "configtopic",
	wcSubName: 'wc-sub',
	configSubName: 'config-sub',
	alertSubName: 'alertSub',
	maxWords: 20,
	consumer_key: '',
	consumer_secret: '',
	access_token_key: '',
	access_token_secret: '',
	instagramKey: '',
	instagramSecret: '',
	mongoPath: '',
	sendgridUser: '',
	sendgridKey: '',
	twillioSid: '',
	twillioToken: '',
	twillioFromNumber: '',
	pusherAppId: '',
	pusherKey: '',
	pusherSecret: '',
	amsPushUrl: '',
	amsApplicationKey: '',
	newRelicKey: "",
	forsquareKeys: {
		'secrets': {
			'clientId': '',
			'clientSecret': '',
			'redirectUrl': 'http://localhost:3000/callback'

		}
	},
    twitter:{
        defaultSearchTerm : "",
        consumer_key: '',           // <--- FILL ME IN
        consumer_secret: '',        // <--- FILL ME IN
        access_token_key: '',       // <--- FILL ME IN
        access_token_secret: '',
        messageTopic: "Twitter.Stream.Tweet",
        defaultTrack: ""
    }

};