const {ServiceBusClient} = require('@azure/service-bus')

const topicName = "";

class MessageBusClient {
    constructor(connectionString) {

    }

    /**
     *
     * @param message
     * @param userProperties
     * @param correlationId
     * @returns {Promise<void>}
     * @constructor
     */
    async Send(message, userProperties, correlationId) {



    }
}

module.exports = {
    MessageBusClient
}
