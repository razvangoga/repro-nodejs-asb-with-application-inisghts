# Scenario

Sandbox repro for a NodeJS service working with Azure Service Bus and Application Insights.

When sending a message toi ASB, although the message is sent correctly, the related Application Insights dependency log is shown as failed.

# How to run

- enter ASB connection string and topic name, and Application Insights instrumentation key in the **.env** file
- run **_npm start_**