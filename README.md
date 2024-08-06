# Oura API Webhook

## This project is archived

This was a short-lived project that proved to be less efficient than calling the Oura API directly.

In short, the Oura Developer Architecture allows developers to create applications which users can 
authenticate and allow access to the data collected by the Oura Ring.

The Oura API documentation outlines a "webhook subscription" mechanism which allows one to create
subscriptions to data which is sent via callbacks to a customer URL.

The reason that this project is abandoned is because the webhook subscription mechanism requires
that a user be authenticated through an Oura app (as described above), and then the webhook
subscriptions will be used to send user data to the callback URLs.

This architecture requires that the developer configure OAuth in their application to obtain consent
for users through their application in order to begin receiving data from the webhook subscriptions.

I decided that it is much simpler to use the Personal Access Token feature offered by the Oura Developer
API to pull data on a cron schedule using the PAT, instead of going through the process of setting up
OAuth and having updates pushed to this application.

If I were writing an application for use by more users than just myself, I'd invest the time to 
develop the proper OAuth configuration to obtain consent from users.

I may do that in the future.

[Oura API documentation for webhooks](https://cloud.ouraring.com/v2/docs#tag/Webhook-Subscription-Routes)
