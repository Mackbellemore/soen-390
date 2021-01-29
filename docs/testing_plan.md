# SOEN-390 Testing Plan

## Testing the Server

### -- Goal --

Our goal for testing our server side code was to achieve the 50% coverage on our controller classes. We also wanted to ensure that the tests were ran in the pipeline and the coverage requirements were met before being able to merge a pull request. Example tests can be found under `server/tests/unit`

### -- Libraries Used --

 - [Mocha](https://mochajs.org/) (test framework)
 - [Sinon](https://sinonjs.org/) (Mocking library)
 - [Chai](https://www.chaijs.com/) (Assertion Library)
 - [Istanbul](https://istanbul.js.org/) (Coverage Library)

#### Why we used these libraries:

To test our controllers which are written in Typescript, we selected [Mocha](https://mochajs.org/) as our test framework. Mocha is open-source, extremely popular and offers extensive documentation and community support which made setting up our test environment easy. It also makes asynchronous testing simple which is a necessity for our application. We then selected [Sinon](https://sinonjs.org/) and [Chai](https://www.chaijs.com/) for all our mocking and assertion needs respectively. Again these are both open-source massively popular frameworks that are used in industry for stubs and assertions. Lastly we went with [Istanbul](https://istanbul.js.org/) which is a code coverage library that integrates with our testing framework, Mocha. It is highly configurable and can be used to output coverage reports or to block deployments which do not meet coverage requirements.

Configuration file is found here `/server/.nycrc`

### -- Unit Tests --

Our main concern was to cover every controller with unit tests, meaning than any external calls leaving a controller file were stubbed/mocked. This ensures our classes are tested in complete isolation.

### -- Pipeline --

Lastly we implemented a CI pipeline using Github Actions, which protects our develop (main) branch by running the tests in the pipeline to ensure that coverage is met and that no unwanted bugs are introduced in these files. We targeted coverage on our controller classes and set the branch, line, function and statement coverage to 50% for a pull request to be merged.


