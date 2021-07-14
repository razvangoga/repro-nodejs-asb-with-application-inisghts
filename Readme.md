# Scenario

Sandbox repro for a NodeJS service working with Azure Service Bus and Application Insights.

When sending a message to ASB, although the message is sent correctly, the related Application Insights dependency log is shown as failed.

![image](https://user-images.githubusercontent.com/1067494/125626945-b21a375d-eddd-4f1b-9673-11bdd20e9b67.png)
![image](https://user-images.githubusercontent.com/1067494/125627185-8ab8c22e-a0cd-4bef-a78a-008a67004fa1.png)

# Requirements

- one Azure Service Bus instance with one topic wherre to send the messages
- one Application Insights instance

# How to run

- enter ASB connection string and topic name, and Application Insights instrumentation key in the **.env** file
- run **_npm start_**
