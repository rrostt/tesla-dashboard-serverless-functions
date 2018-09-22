# Serverless data handling for car-home-integration

A set of serverless functions for a dashboard showing car location, ETA to home, as well as charging state information and climate state information.

It is made for the dashboard showing on an iPad mini on the wall of the hallway. It allows people at home to see if I've left work yet, and how bad traffic is. It also allows me to turn the AC on in the morning if needed, on the way to get coffee.

It does the following things

- periodically polls the tesla api for state changes and pushes the state onto a SQS (queue)
- saves data on the queue to dynamodb
- offers API endpoints for getting
   - last state
   - location history (lon/lat)
   - ETA
   - turning the climate in the car on or off


## Tesla API

Tesla API docs: https://timdorr.docs.apiary.io/#reference/vehicle-commands/stop-hvac-system
