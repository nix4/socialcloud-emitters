module.exports = (function(){
    var azure = require('azure'),
        config = require('../config');

    process.env.AZURE_SERVICEBUS_NAMESPACE= config.azureNamespace;
    process.env.AZURE_SERVICEBUS_ACCESS_KEY= config.azureAccessKey;

    return azure.createServiceBusService();
})();