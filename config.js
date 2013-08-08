module.exports = {
	azureNamespace: "",
	azureAccessKey: "",
	messageTopic: "messagetopic",
	configTopic: "configtopic",
	wcSubName: 'wc-sub',
	configSubName: 'config-sub',
	alertSubName: 'alertSub',
	maxWords: 20,
    consumer_key: '',           // <--- FILL ME IN
    consumer_secret: '',        // <--- FILL ME IN
    access_token_key: '',       // <--- FILL ME IN
    access_token_secret: '',
	instagramKey: '',
	instagramSecret: '',
	mongoPath: '',
	sendgridUser: '',
	sendgridKey: '',
	twillioSid: '',
	twillioToken: '',
	newRelicKey: "",
	forsquareKeys: {
		'secrets': {
			'clientId': '',
			'clientSecret': '',
			'redirectUrl': 'http://localhost:3000/callback'

		}
	},
    twitter:{
        defaultSearchTerm : "lovegameszambia",
        consumer_key: '',           // <--- FILL ME IN
        consumer_secret: '',        // <--- FILL ME IN
        access_token_key: '',       // <--- FILL ME IN
        access_token_secret: '',
        messageTopic: "Twitter.Stream.Tweet"
    }

};