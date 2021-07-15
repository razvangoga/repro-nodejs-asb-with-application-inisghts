const appInsights = require('applicationinsights');
const {ServiceBusClient} = require("@azure/service-bus");
const {delay} = require("@azure/service-bus");

(async () => {
    appInsights.setup(process.env.AppinsightsInstrumentationKey)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(false)
    .setAutoCollectConsole(true)
    .setSendLiveMetrics(true)
    .setUseDiskRetryCaching(true)
    .setInternalLogging(true, true)

    appInsights.defaultClient.config.samplingPercentage = 100 //no sampling
    appInsights.start()

    appInsights.defaultClient.addTelemetryProcessor(envelope => {
        console.debug(envelope)
        // envelope.tags[appInsights.defaultClient.context.keys.cloudRole] = `Navigator (v${process.env.AppOptions__ServiceVersion})`
        // envelope.tags[appInsights.defaultClient.context.keys.cloudRoleInstance] = `Navigator ${process.env.AppOptions__Sets}-${process.env.AppOptions__Region} (v${process.env.AppOptions__ServiceVersion})`
    })

    const serviceBusClient = new ServiceBusClient(process.env.AsbConnString)
    const sender = serviceBusClient.createSender(process.env.AsbTopicName)

    let i = 0;
    while (true) {
        i++;
        console.info(`sending message ${i}`)
        let message = {
            id : i,
            timestamp : (new Date()).toISOString()
        }

        let userProperties = {
            id: i
        }

        const newBusMessages = [{
            body: message,
            subject: process.env.AsbTopicName,
            applicationProperties: userProperties,
            correlationId: i
        }]

        await sender.sendMessages(newBusMessages)

        console.info(`message ${i} sent`)
        await delay(2 * 1000)
    }
})()