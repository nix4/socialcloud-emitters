module.exports = {
	azureNamespace: "",
	azureAccessKey: "",
	messageTopic: "Twitter.Stream.Tweet",
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
	mongoPath: 'mongodb://:@localhost:27017/inteldons-dev',
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
        consumer_key: 'pyvzfJZWmV7AF7SfBsBr6w',           // <--- FILL ME IN
        consumer_secret: 'd5VuojzGvWvw8AcGmiMR7GzfWBWY5GEabWpE54ibs',        // <--- FILL ME IN
        access_token_key: '128904664-E5qvpRLDvGG7YqyFnmq5mV7ukzYdwKxpgxSC1X28',       // <--- FILL ME IN
        access_token_secret: 'OIR6TG9YTgLYAcEuNJj5upbxVQXAI6UcAmdCqJRyA',
        messageTopic: "Twitter.Stream.Tweet",
        defaultTrack: "lovegameszambia"
    }

};