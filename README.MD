# MacOS Load Monitor
A simple web application built using Node.js and React that monitors load average on your mac.

## Environment
#### Node.js
Make sure you are running the latest *Node.js LTS v8.x*. The best way to install Node is via [NVM](https://github.com/creationix/nvm), since it allows you to run multiple versions of Node alongside each other, and doesn't require root permissions.

To [install NVM](https://github.com/creationix/nvm#installation) use the install script:
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

Then install the latest LTS of Node.js:
```
nvm install --lts
```

#### Yarn
This project uses the Yarn package manager. Follow the [installation instructions](https://yarnpkg.com/en/docs/install#mac-stable). I would suggest installing it using Homebrew:
```
brew install yarn --without-node
```

## Install
Install the project dependencies using Yarn. From the root directory of the project do a yarn install:
```
yarn install
```

## Run
#### Production
To build and run the application in production mode use the start command from the root directory of the project:
```
yarn start
```

#### Development
To build and run the application in development mode use the dev command from the root directory of the project:
```
yarn dev
```

#### UI
Once the application is running, you can access the UI from a web browser at: `http://localhost:3000`

## Induce Load
As this application monitors system load and displays alerts if the threshold is crossed, it is more interesting if we have a way of inducing load on our system. In a separate terminal, run the following script to load all your logical processors by 100%. To stop at any time, simply use `Ctrl-C`.
```
yarn induceLoad
```

## Test
You can lint and run the unit tests with:
```
yarn test
```

## Future Improvement
This design could be improved in a couple ways.

First, it does not store anything to disk, the data is lost when the application exits. This can be improved by utilizing a timeseries database such as [Prometheus](https://prometheus.io/).

Second, it is designed to monitor a single computer, and serve a limited number of UI connections. If this were to scale to monitor many systems, and serve a large number of UI connections, it would need to be split apart into microservices:

#### Reporting
A background process would run on N machines which would handle the capturing of the load data and calling out to the metrics service to store it.

#### Metrics
The metrics service would consist of an API gateway and a timeseries database. The service would handle storing and querying metrics through a REST API.

#### Alerting
The alerting service would handle routing alerts to various services, such as PagerDuty.

#### Monitoring
The monitoring service would subscribe to the metrics service and manage streaming data to client applications.

#### Client
Client applications via web or mobile can connect to the monitoring service to view realtime stats, or alerting to receive notifications, or configure alert thresholds.

## Assignment
* Collect the machine load (using “uptime” for example)
* Display in the application the key statistics as well as a history of load over the past 10 minutes in 10s intervals. We’d suggest a graphical representation using D3.js, but feel free to use another tool or representation if you prefer. Make it easy for the end-user to picture the situation!
* Make sure a user can keep the web page open and monitor the load on their machine.
* Whenever the load for the past 2 minutes exceeds 1 on average, add a message saying that “High load generated an alert - load = {value}, triggered at {time}”
* Whenever the load average drops again below 1 on average for the past 2 minutes, Add another message explaining when the alert recovered.
* Make sure all messages showing when alerting thresholds are crossed remain visible on the page for historical reasons.
* Write a test for the alerting logic
* Explain how you’d improve on this application design
