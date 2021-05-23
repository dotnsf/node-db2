# node-db2

## Overview

Sample application for **Db2**(Db2 on Cloud v4) with node.js.


## Pre-requisites

- Install Node.js

  - https://nodejs.org/

- IBM Cloud account

  - https://cloud.ibm.com/

  - You can use free **lite plan**.

- **Db2 on Cloud** service instance in IBM Cloud

  - https://www.ibm.com/jp-ja/cloud/db2-on-cloud

  - You can use **free plan**.


## Setup

- Get following credentials from Db2 instance service credentials:

  - username

  - password

  - hostname

- Get following credential from Db2 instance URL:

  - deployment id(decoded)

  - You can find deployment id from service's URL, starts with "crn". If service's URL is following one, then (decoded)deployemtn id would be .. **crn:3v1:bluemix:public:dashdb-for-transactions:us-south:a/xxxxxxxxxxxx:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx::**

    - https://cloud.ibm.com/services/dashdb-for-transactions/crn%3Av1%3Abluemix%3Apublic%3Adashdb-for-transactions%3Aus-south%3Aa%2Fxxxxxxxxxxxx%3Axxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx%3A%3A?paneId=manage

- Edit and save settings.js with above information.


## How to run

- Git clone or Download this code:

  - `$ git clone https://github.com/dotnsf/node-db2`

  - `$ cd node-db2`

- Install dependant libraries:

  - `$ npm install`

- Run application:

  - `$ node app`

- Browse application with web browser:

  - http://localhost:8080/ping



## References

https://cloud.ibm.com/apidocs/db2-on-cloud/db2-on-cloud-v4


## Licensing

This code islicensed under MIT.


## Copyright

2021 K.Kimura @ Juge.Me all rights reserved.
