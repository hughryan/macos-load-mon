## MacOS Load Monitor
##### A simple web application that monitors load average on your machine.

#### Assignment
* Collect the machine load (using “uptime” for example)
* Display in the application the key statistics as well as a history of load over the past 10 minutes in 10s intervals. We’d suggest a graphical representation using D3.js, but feel free to use another tool or representation if you prefer. Make it easy for the end-user to picture the situation!
* Make sure a user can keep the web page open and monitor the load on their machine.
* Whenever the load for the past 2 minutes exceeds 1 on average, add a message saying that “High load generated an alert - load = {value}, triggered at {time}”
* Whenever the load average drops again below 1 on average for the past 2 minutes, Add another message explaining when the alert recovered.
* Make sure all messages showing when alerting thresholds are crossed remain visible on the page for historical reasons.
* Write a test for the alerting logic
* Explain how you’d improve on this application design

#### Assumptions
- I only need to support one operating system - macOS is ok.
- The only statistic we are collecting is 1 minute load average every 10 seconds.
- The UI must be updated in realtime while it is open.
- The test needed for the alerting logic will be a unit test rather than a functional test.
- This application is intended to be run on a single system, with the user of that system accessing the UI through a web browser.
- I can use any open source libraries.

#### Questions
- Does the 10-minute history graph need to display activity from before the UI was loaded in a web browser?
  In other words, do I need to store the data collected by the application on the backend, or do we only care about realtime monitoring?
  Will this data need to be stored longer than 10 minutes?
- Likewise, does the alert log need to display alerts that occurred while the UI was not loaded in a web browser?
  In other words, do I need to store the alert log on the backend?
  Will this data need to be stored longer than 10 minutes?

#### New Questions
- Should the high load alert continue to be generated every 10 seconds while the 2 min average load exceeds 1?
- Should the high load alert message display the 2 min average load value that triggered it or the current load value?
- If the backend application exits, should it retain the load and alert history when restarted?
- What "key statistics" should be displayed besides the graph of load over the past 10 minutes in 10s intervals and the alert history?
- Should the alert history display messages older than 10 minutes?
