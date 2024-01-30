#  [![CircleCI](https://dl.circleci.com/status-badge/img/circleci/KRBw929zUHeXUhVrEy5c1m/6fHTUdAoztGeDzjeC32pyq/tree/main.svg?style=shield&circle-token=098a9af459b27dc012ffc9018b74ae829b6b161c)](https://dl.circleci.com/status-badge/redirect/circleci/KRBw929zUHeXUhVrEy5c1m/6fHTUdAoztGeDzjeC32pyq/tree/main)

# SDET 2024 - Technical Task
## Description
This task involves testing two different components: 
- a website using [NightwatchJS](https://nightwatchjs.org/) 
- an API using mock-user-auth,jest and supertest. 


1. ### Website Testing for [My Store-automationpractice ](http://automationpractice.multiformis.com/index.php)
- Contact Us Page Testing:

The tests covered form submission covering various combinations of input, including valid and invalid submissions
and were Implemented using page object model desgin pattern without hardcoding selectors.

- 'dress' search resutls testing:

The tests covered Performing search for "dress" and Verifying the search results.


### Deliverables:

-  HTML report for the results. [here](https://output.circle-artifacts.com/output/job/18b34c94-5965-4572-b473-80ef02ef6784/artifacts/0/UI_automation_testing/tests_output/nightwatch-html-report/index.html)
-  Bugs Report
-  document for the test cases.


2. ### API Testing for  [mock-user-auth ](https://www.npmjs.com/package/mock-user-auth)
The tests covered all API routes provided by the mock-user-auth npm module.
Validating routes with various inputs, including valid and invalid bodies, and valid/invalid authorizations.

Testing was done using [jest](https://jestjs.io/) as a test runner

### Deliverables:

- HTML for test results. [here](API_testing/tests_output/test-report.html)
-  Bugs Report


## Setup Instructions

1. Clone the repository 
1. Install necessary dependencies for NightwatchJS, jest, mock-user-auth, and supertest.


## Run 

1. Run UI test
```
npm run test:nightwatch
```


2. Run the server and the API test

```
npm run dev < /dev/null & npm run test:jest 
```

## CI/CD

the repository in connected to [circleci](https://circleci.com/)

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/KRBw929zUHeXUhVrEy5c1m/6fHTUdAoztGeDzjeC32pyq/tree/main.svg?style=shield&circle-token=098a9af459b27dc012ffc9018b74ae829b6b161c)](https://dl.circleci.com/status-badge/redirect/circleci/KRBw929zUHeXUhVrEy5c1m/6fHTUdAoztGeDzjeC32pyq/tree/main)
